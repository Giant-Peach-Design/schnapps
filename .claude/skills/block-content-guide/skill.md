---
name: block-content-guide
description: Update the block content guide after creating or modifying an ACF block. Tracks recommended content lengths, image sizes, and editorial guidelines per block for sharing with clients. Use after scaffolding a new block or changing block fields.
---

# Block Content Guide Generator

Update a client-friendly content guide that documents the ideal content for each ACF block.

## When to run

After creating a new ACF block or modifying the fields/view of an existing one.

## Step 1 — Check Figma

Before writing any content guidance, ask the user if there's a Figma URL or screenshot for this block. If provided:

1. Use the Figma link/screenshot to extract real design constraints:
   - **Measure text areas** — count visible characters in the design to set recommended lengths, rather than using generic defaults.
   - **Extract image dimensions** — note the rendered size at each breakpoint to derive minimum upload sizes and aspect ratios.
   - **Count repeater items** — note how many items are shown in the design (e.g. 3 cards, 4 logos) to set min/max recommendations.
   - **Note layout constraints** — e.g. single-line headings, truncated text, fixed-height cards that affect content length.

2. Prefer Figma-derived values over the generic defaults listed below. Only fall back to defaults when no design reference is available.

If the user says there's no Figma available, proceed using the code and sensible defaults.

## Step 2 — Document the block

For the block that was just created or modified, gather the following by reading its class file in `web/app/themes/schnapps/app/Blocks/` and its Blade view in `resources/views/blocks/`:

### Text fields
For every text, textarea, and WYSIWYG field:
- **Recommended character count** — derive from the design context (e.g. a short tagline vs a paragraph). Use sensible defaults if the design isn't available:
  - Headings / titles: 40–60 characters
  - Subheadings: 60–80 characters
  - Short descriptions / excerpts: 80–150 characters
  - Body / WYSIWYG content: 150–300 characters (1–2 short paragraphs)
- **Allowed formatting** — e.g. bold, links, lists (relevant for WYSIWYG fields)
- **Tips** — e.g. "Keep punchy and action-oriented", "Avoid jargon"

### Image fields
For every image field:
- **Minimum recommended upload size** — derive from the largest `@gpImage` breakpoint size in the Blade view, doubled for retina. If no `@gpImage` call exists yet, note "TBC — awaiting template implementation".
- **Aspect ratio** — derive from the width/height values in the `@gpImage` sizes array.
- **Alt text reminder** — always include a note to provide descriptive alt text.

### Repeaters / flexible content
- **Recommended min and max items** — based on what the design accommodates.
- Document sub-fields using the same text/image rules above.

### Buttons / links
- **Label length** — 15–30 characters recommended.
- **Note:** URL and target are handled by the CMS, no client guidance needed.

### Other fields
- Select, radio, true/false, etc. — list the available choices and a brief explanation of what each does visually.

## Output format

Write the guide to `CONTENT-GUIDE.md` in the project root. If the file already exists, update only the section for the block that changed — do not regenerate the entire file.

Use this structure:

```markdown
# Content Guide

A reference for content editors — recommended lengths, image sizes, and tips for each block.

---

## Block Name

Brief description of the block's purpose and where it's typically used.

### Fields

#### Field Label (`field_name`)
- **Type:** Text / Textarea / WYSIWYG / Image / etc.
- **Recommended length:** 40–60 characters
- **Tips:** Keep it concise and action-oriented.

#### Image Field (`field_name`)
- **Type:** Image
- **Minimum upload size:** 1452 × 1124 px
- **Aspect ratio:** ~4:3
- **Tips:** Always provide descriptive alt text. Avoid text-heavy images.

#### Repeater (`field_name`)
- **Recommended items:** 3–6
- Sub-fields:
  - `sub_field` (Type): Guidance here

---
```

## Rules

- Use **plain, non-technical language** — this document is for content editors and clients, not developers.
- Field labels should be the human-readable ACF label, with the field name in parentheses for reference.
- If you can't determine a precise recommendation (e.g. image sizes aren't in the template yet), write "TBC" with a brief note explaining why.
- Keep the tone friendly and helpful.
- Sort blocks alphabetically within the file.
- When updating an existing block section, replace it entirely with the new version to avoid stale info.
