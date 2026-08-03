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
 * Every check runs against every entry in ROUTES. Structure and keyboard
 * behaviour are template-specific, and the homepage is usually the least
 * representative template on the site.
 */

/** WCAG 2.1 Level A + AA. Excludes axe's "best-practice" tag, which is not WCAG. */
const WCAG_AA_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

/**
 * Add the project's real templates here — a content page, a single post, an
 * archive, anything with a form. These three are the ones that exist on every
 * site, not the ones most likely to be broken.
 */
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

/**
 * Reveal animations hide content from axe.
 *
 * Reveal utilities (`.fade-in-up` and friends) rest at `opacity: 0` and only
 * settle once Motion's `inView` adds `.is-visible` — and its cleanup strips the
 * class again when the element scrolls out, so nothing below the fold is ever
 * settled during a scan. axe treats transparent text as invisible and skips it,
 * so a page whose content sits inside reveals scans clean regardless of its
 * actual contrast. That is the whole reason the `motion-reduce` scan finds more
 * than the default one: reduced motion disables the reveal, leaving the text
 * opaque and therefore actually evaluated.
 *
 * Forced with `!important` rather than by adding `.is-visible`: that class is
 * under `inView`'s control and can be removed again mid-scan, a stylesheet
 * cannot.
 *
 * A hook that rests *faint* rather than fully transparent (a per-word text fill
 * at low opacity, say) causes the opposite problem: axe does evaluate it and
 * reports a contrast failure against a resting state the user never sees. The
 * same override fixes both directions, so selectors stay in this list even on
 * projects where the hook is not used.
 *
 * Extend this list when a project adds a reveal hook of its own — the
 * "no text is left transparent" test below fails when one is missed.
 */
const REVEAL_SELECTORS = [
  '[class*="fade-in"]', // .fade-in, .fade-in-up, .fade-in-left/right, *-blur
  '[class*="slide-in"]',
  '[class*="fill-word"]', // per-word text fill; not on every project, harmless where absent
  '.reveal',
  '[data-reveal]',
];

const REVEAL_SETTLED_CSS = `
${REVEAL_SELECTORS.join(',\n')} {
  opacity: 1 !important;
  translate: none !important;
  transform: none !important;
  filter: none !important;
  transition: none !important;
  animation: none !important;
}
`;

/**
 * Accepted-consent state, seeded before the first navigation.
 *
 * A consent banner is the first tab stop on a live site and frequently traps
 * focus, so every keyboard test below would fail for a reason that has nothing
 * to do with the thing it is testing. Seeding beats dismissing per test: the
 * banner never renders, so it cannot race the assertions.
 *
 * Fill these in per project — the key and vendor differ. Commented examples are
 * the shapes, not defaults. The "no consent dialog" test fails loudly when the
 * seed does not work, so a wrong key does not turn back into a silent skip.
 */
const CONSENT_COOKIES: { name: string; value: string }[] = [
  // { name: 'cookie_notice_accepted', value: 'true' },                    // Cookie Notice
  // { name: 'CookieConsent', value: '{stamp:%27x%27%2Cnecessary:true}' }, // Cookiebot
  // { name: 'OptanonAlertBoxClosed', value: '2024-01-01T00:00:00.000Z' }, // OneTrust
];

const CONSENT_LOCAL_STORAGE: Record<string, string> = {
  // cookieconsent_status: 'allow',
};

/**
 * Consent containers, used only to fail with a useful message when the seed
 * above misses. Matching a wrapper is enough — it does not need to be precise.
 */
const CONSENT_SELECTORS = [
  '#cookie-notice',
  '#CybotCookiebotDialog',
  '#onetrust-banner-sdk',
  '.cc-window',
  '.cmplz-cookiebanner',
  '[class*="cookie-banner"]',
  '[class*="cookie-notice"]',
  '[id*="cookie-consent"]',
  '[aria-label*="cookie" i]',
  '[aria-label*="consent" i]',
].join(', ');

test.beforeEach(async ({ context, baseURL }) => {
  if (CONSENT_COOKIES.length && baseURL) {
    await context.addCookies(CONSENT_COOKIES.map((cookie) => ({ ...cookie, url: baseURL })));
  }

  // An init script runs before the document's own scripts, so the value is in
  // place by the time the banner's bundle checks whether to render.
  if (Object.keys(CONSENT_LOCAL_STORAGE).length) {
    await context.addInitScript((entries: Record<string, string>) => {
      for (const [key, value] of Object.entries(entries)) {
        try {
          window.localStorage.setItem(key, value);
        } catch {
          // Storage can be unavailable before the origin is committed; the
          // cookie seed is the fallback.
        }
      }
    }, CONSENT_LOCAL_STORAGE);
  }
});

/**
 * Put reveals in their settled state so axe evaluates the text inside them.
 * Called from `scan()` rather than the test bodies: a stylesheet only lives as
 * long as the document, so every navigation needs it again and a per-test call
 * is one `page.goto()` away from being forgotten.
 */
async function settleReveals(page: Page) {
  await page.addStyleTag({ content: REVEAL_SETTLED_CSS });
}

/**
 * Get the page into a state worth asserting against.
 *
 * Deliberately not `networkidle`, which Playwright's own docs discourage: an
 * analytics beacon, chat widget or heartbeat poll means it either never settles
 * (and the test dies at the timeout) or settles at a different point on every
 * run. Wait for the specific things the assertions depend on instead.
 */
async function preparePage(page: Page) {
  // `goto` already resolves on `load`; this also covers pages reached by a click.
  await page.waitForLoadState('load');

  await page.evaluate(async () => {
    const budget = (promise: Promise<unknown>, ms: number) =>
      Promise.race([promise, new Promise((resolve) => setTimeout(resolve, ms))]);

    // A lazy <img> below the fold never loads during a viewport-height scan, and
    // one that has not loaded has no naturalWidth — image-alt and the contrast
    // checks against background images both behave differently for it.
    const images = Array.from(document.querySelectorAll('img'));

    for (const image of images) {
      image.loading = 'eager';
      image.setAttribute('fetchpriority', 'high');
    }

    // decode() forces the fetch that `loading="lazy"` deferred. Bounded, because
    // a slow or broken remote image is not an accessibility failure and should
    // not burn the test's whole timeout.
    await budget(
      Promise.all(
        images.map((image) => (image.complete ? Promise.resolve() : image.decode().catch(() => {}))),
      ),
      5_000,
    );

    // Contrast and text-size assertions read post-webfont rendering.
    await budget(document.fonts.ready, 3_000);
  });
}

async function visit(page: Page, path: string) {
  await page.goto(path);
  await preparePage(page);
}

/**
 * `visit` for the collect-then-assert loops, returning the error instead of
 * throwing it. A route that will not load is recorded as a finding and the loop
 * carries on: letting `goto` throw aborts the test at the first dead route and
 * hides the results for every route after it.
 */
async function tryVisit(page: Page, path: string): Promise<string | null> {
  try {
    await visit(page, path);
    return null;
  } catch (error) {
    return `did not load — ${(error as Error).message.split('\n')[0]}`;
  }
}

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
  await settleReveals(page);
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

test.describe('consent', () => {
  /**
   * Guards the seed above. If it stops working the keyboard tests do not report
   * "the banner is in the way" — they report a broken skip link and a nav whose
   * links are not tab stops, which sends you looking in the wrong place.
   */
  test('no consent dialog is intercepting the keyboard', async ({ page }) => {
    test.setTimeout(30_000 + ROUTES.length * 10_000);

    const unreachable: string[] = [];
    const found: string[] = [];

    for (const { name, path } of ROUTES) {
      await test.step(name, async () => {
        const failed = await tryVisit(page, path);
        if (failed) {
          unreachable.push(`${name}: ${failed}`);
          return;
        }

        const visible = await page.evaluate((selector) => {
          return Array.from(document.querySelectorAll(selector))
            .filter((node) => {
              const style = getComputedStyle(node);
              if (style.display === 'none' || style.visibility !== 'visible') return false;
              if (parseFloat(style.opacity) === 0) return false;
              const rect = node.getBoundingClientRect();
              return rect.width > 1 && rect.height > 1;
            })
            .map((node) => `<${node.tagName.toLowerCase()}>${node.id ? `#${node.id}` : ''}`);
        }, CONSENT_SELECTORS);

        found.push(...visible.map((entry) => `${name}: ${entry}`));
      });
    }

    expect(
      [...unreachable, ...found],
      [
        unreachable.length ? `Routes that did not load:\n${unreachable.join('\n')}` : '',
        found.length
          ? 'A consent dialog rendered despite the seeded consent state, so every ' +
            'keyboard assertion below is really testing the banner. Add this ' +
            `project's cookie or localStorage key to CONSENT_COOKIES / ` +
            `CONSENT_LOCAL_STORAGE:\n${found.join('\n')}`
          : '',
      ]
        .filter(Boolean)
        .join('\n\n'),
    ).toEqual([]);
  });
});

test.describe('axe scans', () => {
  for (const { name, path } of ROUTES) {
    test(`${name} has no WCAG 2.1 AA violations`, async ({ page }) => {
      await visit(page, path);
      await expectNoViolations(page);
    });
  }

  /**
   * Guards REVEAL_SETTLED_CSS. A reveal hook the selector list does not cover
   * leaves its text transparent, axe skips transparent text without comment, and
   * the scans above go green while covering less and less of the page. This turns
   * that silent gap into a failure.
   *
   * Runs over every route: a hook used by one block appears only on the template
   * that block is placed on, so checking the homepage alone proves nothing about
   * the rest of the site.
   *
   * Closed overlays — hover dropdowns, collapsed mobile menus, cursor followers —
   * also sit at `opacity: 0`, and they are not what this test is looking for. They
   * are told apart by `pointer-events: none`: a reveal that has not fired yet is
   * still interactive, which is precisely why it reads as live content to
   * everything except axe's visibility check.
   */
  test('no text is left transparent and therefore unscanned', async ({ page }) => {
    test.setTimeout(30_000 + ROUTES.length * 10_000);

    const unreachable: string[] = [];
    const transparent: string[] = [];

    for (const { name, path } of ROUTES) {
      await test.step(name, async () => {
        const failed = await tryVisit(page, path);
        if (failed) {
          unreachable.push(`${name}: ${failed}`);
          return;
        }

        await settleReveals(page);

        const found = await page.evaluate(() => {
          const describe = (node: Element) => {
            const classes = typeof node.className === 'string' ? node.className.trim() : '';
            return `<${node.tagName.toLowerCase()}>${classes ? `.${classes.split(/\s+/).join('.')}` : ''}`;
          };

          return Array.from(document.querySelectorAll('body *'))
            .filter((node) => {
              // Only elements that render their own text: a transparent wrapper is
              // already reported through whichever descendant holds the text.
              const ownText = Array.from(node.childNodes)
                .filter((child) => child.nodeType === Node.TEXT_NODE)
                .map((child) => child.textContent?.trim() ?? '')
                .join('');

              if (!ownText) return false;
              if (node.closest('[aria-hidden="true"], [hidden], [inert]')) return false;

              // Opacity multiplies down the ancestor chain, so a parent at 0 hides
              // text the element itself computes as fully opaque.
              let faded = false;

              for (let el: Element | null = node; el; el = el.parentElement) {
                const style = getComputedStyle(el);
                if (style.display === 'none' || style.visibility !== 'visible') return false;
                if (style.pointerEvents === 'none') return false;
                if (parseFloat(style.opacity) === 0) faded = true;
              }

              return faded;
            })
            .map(describe);
        });

        transparent.push(...[...new Set(found)].map((entry) => `${name}: ${entry}`));
      });
    }

    expect(
      [...unreachable, ...transparent],
      [
        unreachable.length ? `Routes that did not load:\n${unreachable.join('\n')}` : '',
        transparent.length
          ? `${transparent.length} elements render text that axe will skip as invisible, ` +
            `so the scans above are not covering them. If these are reveal animations, ` +
            `add their hook to REVEAL_SELECTORS:\n${transparent.join('\n')}`
          : '',
      ]
        .filter(Boolean)
        .join('\n\n'),
    ).toEqual([]);
  });

  test('pages linked from the primary nav have no WCAG 2.1 AA violations', async ({ page }) => {
    // Each page costs a navigation, an image/font wait and a full axe run, so
    // CRAWL_LIMIT pages will not fit in the 30s default from playwright.config.ts.
    test.setTimeout(30_000 + CRAWL_LIMIT * 20_000);

    await visit(page, '/');

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

    // Asserted, not skipped: a nav with no internal links is either a broken menu
    // or a wrong NAV_SELECTOR, and skipping reports both as a pass.
    expect(
      unique.length,
      'primary navigation exposed no internal links to crawl — check NAV_SELECTOR ' +
        'and that the menu is populated on this environment',
    ).toBeGreaterThan(0);

    // Collect across every page and assert once: asserting inside the loop aborts
    // on the first offending page, silently leaving the rest of the crawl unscanned.
    const failures: string[] = [];

    for (const href of unique) {
      const path = new URL(href).pathname;

      await test.step(path, async () => {
        const failed = await tryVisit(page, href);
        if (failed) {
          failures.push(`${path}\n  ${failed}`);
          return;
        }

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
  for (const { name, path } of ROUTES) {
    test.describe(name, () => {
      test('html element declares a language', async ({ page }) => {
        await visit(page, path);
        const lang = await page.locator('html').getAttribute('lang');
        expect(lang, 'html[lang] is required by WCAG 3.1.1').toBeTruthy();
      });

      test('page exposes banner, main and contentinfo landmarks', async ({ page }) => {
        await visit(page, path);

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
        await visit(page, path);
        await expect(page.locator('h1')).toHaveCount(1);
      });

      test('heading levels do not skip', async ({ page }) => {
        await visit(page, path);

        const levels = await page
          .locator('h1, h2, h3, h4, h5, h6')
          .evaluateAll((headings) =>
            headings
              .filter(
                (heading) =>
                  heading.getClientRects().length > 0 &&
                  getComputedStyle(heading).visibility !== 'hidden',
              )
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
        await visit(page, path);

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
  }
});

test.describe('keyboard navigation', () => {
  for (const { name, path } of ROUTES) {
    test.describe(name, () => {
      test('skip link is the first tab stop and is hidden until focused', async ({ page }) => {
        await visit(page, path);

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
        await visit(page, path);

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
        await visit(page, path);

        const nav = page.locator(NAV_SELECTOR).first();
        await expect(nav, 'no navigation landmark found').toBeAttached();

        // Only rendered links: collapsed submenu items are not tabbable, so counting
        // every anchor in the menu tree would fail on any nav with dropdowns.
        //
        // NOT offsetParent — that is null for an element whose own position is
        // fixed, so a fixed CTA or menu panel would drop out of the count silently.
        // (Descendants of a fixed element are unaffected: their offsetParent is the
        // fixed element itself.)
        const count = await nav
          .locator('a[href]')
          .evaluateAll(
            (anchors) =>
              anchors.filter(
                (anchor) =>
                  anchor.getClientRects().length > 0 &&
                  getComputedStyle(anchor).visibility !== 'hidden',
              ).length,
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
        await visit(page, path);

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
              .filter(
                (node) =>
                  node.getClientRects().length > 0 && getComputedStyle(node).visibility !== 'hidden',
              )
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
  }
});

test.describe('reduced motion', () => {
  test('homepage has no WCAG violations with reduced motion preferred', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await visit(page, '/');
    await expectNoViolations(page);
  });
});
