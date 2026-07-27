import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * WCAG 2.1 AA coverage.
 *
 * Two halves:
 *  - axe-core scans, which catch the machine-detectable ~40% of WCAG failures
 *    (contrast, names, roles, form labels, landmark structure).
 *  - hand-written checks for the things axe cannot see: keyboard order,
 *    visible focus, and whether the skip link actually skips anything.
 *
 * Add project routes to ROUTES as templates land.
 */

/** WCAG 2.1 Level A + AA. Excludes axe's "best-practice" tag, which is not WCAG. */
const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

const ROUTES = [
  { name: 'homepage', path: '/' },
  { name: 'search results', path: '/?s=a' },
  { name: '404', path: '/this-page-does-not-exist-9876' },
];

/** Max nav-discovered pages to scan, to keep the suite quick. */
const CRAWL_LIMIT = 5;

/**
 * Primary navigation. Deliberately NOT tied to the boilerplate `.nav-primary`
 * class — themes customise the header markup and a class-based selector silently
 * matches nothing, skipping the nav tests instead of failing them. `.first()` at
 * the call sites picks the document's first nav, which is the main menu.
 */
const NAV_SELECTOR =
  '.nav-primary, nav[aria-label*="Main"], nav[aria-label*="Primary"], header nav, nav';

function formatViolations(violations: Awaited<ReturnType<AxeBuilder['analyze']>>['violations']) {
  return violations
    .map((violation) => {
      const targets = violation.nodes
        .map((node) => `      - ${node.target.join(' ')}`)
        .join('\n');

      return [
        `  [${violation.impact}] ${violation.id}: ${violation.help}`,
        `    ${violation.helpUrl}`,
        targets,
      ].join('\n');
    })
    .join('\n\n');
}

async function scan(page: Page) {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_AA_TAGS).analyze();
  return violations;
}

async function expectNoViolations(page: Page) {
  const violations = await scan(page);

  // Assert on rule ids rather than the raw violation objects: comparing the full
  // objects prints a multi-screen diff that buries the formatted report below.
  const summary = violations.map((violation) => `${violation.id} (${violation.nodes.length})`);

  expect(
    summary,
    violations.length ? `\n\n${formatViolations(violations)}\n` : '',
  ).toEqual([]);
}

test.describe('axe scans', () => {
  for (const { name, path } of ROUTES) {
    test(`${name} has no WCAG 2.1 AA violations`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      await expectNoViolations(page);
    });
  }

  test('pages linked from the primary nav have no WCAG 2.1 AA violations', async ({ page }) => {
    // Each page costs a navigation, a networkidle wait and a full axe run, so
    // CRAWL_LIMIT pages will not fit in the 30s default from playwright.config.ts.
    test.setTimeout(30_000 + CRAWL_LIMIT * 20_000);

    await page.goto('/');

    // Fail rather than skip when no nav is found: a silent skip reads as a pass
    // while covering nothing at all.
    const nav = page.locator(NAV_SELECTOR).first();
    await expect(nav, 'no navigation landmark found on the homepage').toBeAttached();

    const hrefs = await nav.locator('a[href]').evaluateAll((anchors) =>
      anchors
        .map((anchor) => (anchor as HTMLAnchorElement).href)
        .filter((href) => href.startsWith(window.location.origin))
        .filter((href) => href.replace(/\/$/, '') !== window.location.origin),
    );

    const unique = [...new Set(hrefs)].slice(0, CRAWL_LIMIT);
    test.skip(!unique.length, 'Primary navigation has no internal links');

    // Collect across every page and assert once: asserting inside the loop aborts
    // on the first offending page, silently leaving the rest of the crawl unscanned.
    const failures: string[] = [];

    for (const href of unique) {
      const path = new URL(href).pathname;

      await test.step(path, async () => {
        await page.goto(href);
        await page.waitForLoadState('networkidle');

        const violations = await scan(page);
        if (violations.length) failures.push(`${path}\n${formatViolations(violations)}`);
      });
    }

    expect(
      failures.map((entry) => entry.split('\n')[0]),
      failures.length ? `\n\nScanned ${unique.length} pages:\n\n${failures.join('\n\n')}\n` : '',
    ).toEqual([]);
  });
});

test.describe('document structure', () => {
  test('html element declares a language', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(lang, 'html[lang] is required by WCAG 3.1.1').toBeTruthy();
  });

  test('page exposes banner, main and contentinfo landmarks', async ({ page }) => {
    await page.goto('/');

    // <header>/<footer> only expose the banner/contentinfo landmarks when they are
    // NOT nested in sectioning content, so resolve them the way an AT would rather
    // than matching a theme class such as `.banner`.
    const landmarks = await page.evaluate(() => {
      const SECTIONING = 'article, aside, main, nav, section';

      const topLevel = (tag: string) =>
        Array.from(document.querySelectorAll(tag)).filter((node) => !node.parentElement?.closest(SECTIONING));

      return {
        banner: topLevel('header').length + document.querySelectorAll('[role="banner"]').length,
        main: document.querySelectorAll('main, [role="main"]').length,
        contentinfo:
          topLevel('footer').length + document.querySelectorAll('[role="contentinfo"]').length,
      };
    });

    expect(landmarks.banner, 'expected exactly one banner landmark (<header> or [role="banner"])').toBe(1);
    expect(landmarks.main, 'expected exactly one main landmark').toBe(1);
    expect(
      landmarks.contentinfo,
      'expected exactly one contentinfo landmark (<footer> or [role="contentinfo"])',
    ).toBe(1);
  });

  test('page has exactly one h1', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('heading levels do not skip', async ({ page }) => {
    await page.goto('/');

    const levels = await page
      .locator('h1, h2, h3, h4, h5, h6')
      .evaluateAll((headings) =>
        headings
          .filter((heading) => (heading as HTMLElement).offsetParent !== null)
          .map((heading) => ({
            level: Number(heading.tagName[1]),
            text: heading.textContent?.trim().slice(0, 60) ?? '',
          })),
      );

    const skips = levels
      .map((heading, index) => ({ heading, previous: levels[index - 1] }))
      .filter(({ heading, previous }) => previous && heading.level - previous.level > 1)
      .map(
        ({ heading, previous }) =>
          `h${previous.level} "${previous.text}" -> h${heading.level} "${heading.text}"`,
      );

    expect(skips, skips.join('\n')).toEqual([]);
  });

  test('images have an alt attribute', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Decorative images legitimately use alt="", so we only require the attribute
    // to be present — an absent alt leaves screen readers reading the filename.
    const missing = await page.locator('img').evaluateAll((images) =>
      images
        .filter((image) => !image.hasAttribute('alt'))
        .map((image) => (image as HTMLImageElement).currentSrc || image.outerHTML.slice(0, 120)),
    );

    expect(missing, missing.join('\n')).toEqual([]);
  });
});

test.describe('keyboard navigation', () => {
  test('skip link is the first tab stop and is hidden until focused', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.locator('a[href="#main"]').first();
    await expect(skipLink).toBeAttached();

    // Tailwind's `sr-only` collapses the link to a 1x1 clipped box rather than
    // hiding it, so compare rendered size instead of visibility.
    const collapsed = await skipLink.boundingBox();
    expect(collapsed, 'skip link should render a box').not.toBeNull();
    expect(
      Math.max(collapsed!.width, collapsed!.height),
      'skip link should be visually hidden (sr-only) when unfocused',
    ).toBeLessThanOrEqual(2);

    await page.keyboard.press('Tab');

    await expect(skipLink).toBeFocused();

    const revealed = await skipLink.boundingBox();
    expect(
      revealed!.width,
      'skip link should become visible on focus (focus:not-sr-only)',
    ).toBeGreaterThan(collapsed!.width);
  });

  test('skip link moves the tab sequence into main', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/#main$/);

    // The next tab stop must be past the header, otherwise the link only changed
    // the hash and skipped nothing. Asserting "inside main" instead would fail on
    // pages whose <main> holds no focusable elements, where tabbing correctly
    // continues into the footer.
    await page.keyboard.press('Tab');

    const landing = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active || active === document.body) return null;
      return {
        inHeader: !!active.closest('header.banner, [role="banner"]'),
        description: `<${active.tagName.toLowerCase()}> ${active.textContent?.trim().slice(0, 40) ?? ''}`,
      };
    });

    expect(landing, 'focus should remain in the document after the skip link').not.toBeNull();
    expect(
      landing!.inHeader,
      `skip link did not move focus past the header — landed on ${landing!.description}`,
    ).toBe(false);
  });

  test('primary nav links are reachable by keyboard', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator(NAV_SELECTOR).first();
    await expect(nav, 'no navigation landmark found on the homepage').toBeAttached();

    // Only visible links: collapsed submenu items are not tabbable, so counting
    // every anchor in the menu tree would fail on any nav with dropdowns.
    const count = await nav
      .locator('a[href]')
      .evaluateAll(
        (anchors) => anchors.filter((anchor) => (anchor as HTMLElement).offsetParent !== null).length,
      );

    expect(count, 'navigation landmark contains no visible links').toBeGreaterThan(0);

    const reached = new Set<string>();

    // Tab through the head of the document and record which nav links we land on.
    for (let i = 0; i < count + 10; i++) {
      await page.keyboard.press('Tab');

      const href = await page.evaluate((selector) => {
        const active = document.activeElement;
        const navRoot = document.querySelector(selector);
        return active && navRoot?.contains(active) ? active.getAttribute('href') : null;
      }, NAV_SELECTOR);

      if (href) reached.add(href);
      if (reached.size === count) break;
    }

    expect(reached.size, 'every primary nav link should be a tab stop').toBe(count);
  });

  test('interactive elements have a visible focus indicator', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const SELECTOR = 'a[href], button, input:not([type="hidden"]), select, textarea';
    const MAX_ELEMENTS = 25;

    // Pass 1 — resting styles. Nothing is focused during this pass, and each
    // candidate is tagged so pass 2 can match tab stops back to their baseline.
    const baseline = await page.evaluate(
      ({ selector, max }) => {
        const signature = (node: Element) => {
          const s = getComputedStyle(node);
          return [
            s.outlineStyle,
            s.outlineWidth,
            s.outlineColor,
            s.boxShadow,
            s.borderColor,
            s.backgroundColor,
            s.color,
            s.textDecorationLine,
          ].join('|');
        };

        return Array.from(document.querySelectorAll(selector))
          .filter((node) => (node as HTMLElement).offsetParent !== null)
          .slice(0, max)
          .map((node, index) => {
            node.setAttribute('data-a11y-focus-idx', String(index));
            const label =
              node.textContent?.trim().slice(0, 40) || node.getAttribute('aria-label') || '';

            return {
              index,
              description: `<${node.tagName.toLowerCase()}> ${label}`.trim(),
              signature: signature(node),
            };
          });
      },
      { selector: SELECTOR, max: MAX_ELEMENTS },
    );

    test.skip(!baseline.length, 'No visible interactive elements found');

    // Pass 2 — drive focus with real Tab presses. Both the UA default focus ring
    // and this theme's `hover-focus` variant (resources/css/theme.css) key off
    // :focus-visible, which does NOT match a programmatic element.focus(); using
    // .focus() here would report every link and button as having no indicator.
    const checked = new Set<number>();
    const withoutIndicator: string[] = [];

    for (let i = 0; i < baseline.length + 15; i++) {
      await page.keyboard.press('Tab');

      const stop = await page.evaluate(() => {
        const active = document.activeElement;
        if (!active || active === document.body) return null;

        const index = active.getAttribute('data-a11y-focus-idx');
        if (index === null) return null;

        const s = getComputedStyle(active);
        return {
          index: Number(index),
          signature: [
            s.outlineStyle,
            s.outlineWidth,
            s.outlineColor,
            s.boxShadow,
            s.borderColor,
            s.backgroundColor,
            s.color,
            s.textDecorationLine,
          ].join('|'),
          hasOutline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0,
        };
      });

      if (!stop || checked.has(stop.index)) continue;
      checked.add(stop.index);

      const resting = baseline.find((candidate) => candidate.index === stop.index);
      if (!resting) continue;

      if (!stop.hasOutline && stop.signature === resting.signature) {
        withoutIndicator.push(resting.description);
      }

      if (checked.size === baseline.length) break;
    }

    // Elements never reached by Tab are not asserted on: if it cannot receive
    // keyboard focus, 2.4.7 does not apply to it.
    expect(
      withoutIndicator,
      `No visible focus indicator (WCAG 2.4.7) on ${withoutIndicator.length} of ` +
        `${checked.size} keyboard-reachable elements:\n${withoutIndicator.join('\n')}`,
    ).toEqual([]);
  });
});

test.describe('reduced motion', () => {
  test('homepage has no WCAG violations with reduced motion preferred', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expectNoViolations(page);
  });
});
