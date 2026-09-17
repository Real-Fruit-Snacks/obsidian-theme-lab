# Changelog

All notable changes to Theme Lab are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/).

## [1.1.0] - 2026-09-17

### Added
- **Accessibility section in the theme report.** Checks the stylesheet can answer on its own: `a11y/reduced-motion` (keyframe animations, moving or slow transitions, with no `prefers-reduced-motion` block — short colour fades are not counted), `a11y/focus-ring` (`outline: none` with no `:focus-visible` replacement), `a11y/small-text` (under about 11px), `a11y/fixed-body-size` (body text pinned to pixels, so the reader's font-size setting does nothing), `a11y/user-select` (note text that cannot be selected) and `a11y/text-shadow` (a glow on body text lowers effective contrast).
- Three more contrast rows: the focus ring, error text and success text. The focus ring is judged at 3:1, the bar for non-text contrast, not 4.5:1.
- `a11y_issues` in the report's front matter, and a line in the summary callout.

## [1.0.2] - 2026-09-13

### Changed
- Scratch CSS is applied through a constructed stylesheet (`document.adoptedStyleSheets`) instead of a `<style>` element.
- Inspect overlay is positioned through CSS variables rather than inline styles.
- Canvases are created with `createEl`, timers use `window.setTimeout`, DOM type checks use `instanceOf`, and the theme name is read through the plugin's `app` rather than the global.
- Command renamed to **Open panel**; manifest description no longer contains a colon.

### Fixed
- README and site opener no longer say "from inside Obsidian" twice.

## [1.0.1] - 2026-09-13

### Changed
- Manifest description reworded for the community plugin review (no product name).
- Inspect-mode crosshair cursor no longer uses `!important`.

## [1.0.0] - 2026-09-12

### Added
- **Inspect element**: click to copy a report with the DOM path, pruned HTML, computed values, every matching rule with specificity and origin, the winning declaration per property, and referenced variables. Shift-click for several elements; Esc to stop.
- **Screenshot matrix**: scheme × view × sidebars × scroll target, paging through sections taller than the window, plus fourteen chrome captures per scheme (Settings tabs, command palette, quick switcher, file and editor menus, tooltip, hover states, hover preview, search, right sidebar, graph, notice). Full-window PNG, 1200×800 listing crop and 1920-wide hero per shot; labelled contact sheets per combination, an overview and a chrome sheet. Presets: Full review, Quick check, Editor pass, Chrome only, Artwork. Captures that need a disabled core plugin are skipped and reported.
- **Showcase note** covering every Markdown feature a theme has to style, with a chrome checklist.
- **Theme report**: lint for the properties the community review rejects and duplicate declarations, WCAG contrast for both schemes side by side, every theme variable with its dark and light value, variables declared in one scheme only, and unreferenced Obsidian classes on screen.
- **Panel**: view switcher, scheme and sidebar toggles, live inspector, Scratch CSS with append-to-theme, variable watch with swatches, and the run list.
- **Scratch A/B** matrix option and **Compare latest matrix run with the previous one**, both producing pixel-diff sheets.
- Commands to capture one screenshot and toggle the colour scheme.

[1.1.0]: https://github.com/Real-Fruit-Snacks/obsidian-theme-lab/releases/tag/1.1.0
[1.0.2]: https://github.com/Real-Fruit-Snacks/obsidian-theme-lab/releases/tag/1.0.2
[1.0.1]: https://github.com/Real-Fruit-Snacks/obsidian-theme-lab/releases/tag/1.0.1
[1.0.0]: https://github.com/Real-Fruit-Snacks/obsidian-theme-lab/releases/tag/1.0.0
