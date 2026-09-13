# Changelog

All notable changes to Theme Lab are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and versions follow [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-09-12

### Added
- **Inspect element**: click to copy a report with the DOM path, pruned HTML, computed values, every matching rule with specificity and origin, the winning declaration per property, and referenced variables. Shift-click for several elements; Esc to stop.
- **Screenshot matrix**: scheme × view × sidebars × scroll target, paging through sections taller than the window, plus fourteen chrome captures per scheme (Settings tabs, command palette, quick switcher, file and editor menus, tooltip, hover states, hover preview, search, right sidebar, graph, notice). Full-window PNG, 1200×800 listing crop and 1920-wide hero per shot; labelled contact sheets per combination, an overview and a chrome sheet. Presets: Full review, Quick check, Editor pass, Chrome only, Artwork. Captures that need a disabled core plugin are skipped and reported.
- **Showcase note** covering every Markdown feature a theme has to style, with a chrome checklist.
- **Theme report**: lint for the properties the community review rejects and duplicate declarations, WCAG contrast for both schemes side by side, every theme variable with its dark and light value, variables declared in one scheme only, and unreferenced Obsidian classes on screen.
- **Panel**: view switcher, scheme and sidebar toggles, live inspector, Scratch CSS with append-to-theme, variable watch with swatches, and the run list.
- **Scratch A/B** matrix option and **Compare latest matrix run with the previous one**, both producing pixel-diff sheets.
- Commands to capture one screenshot and toggle the colour scheme.

[1.0.0]: https://github.com/Real-Fruit-Snacks/obsidian-theme-lab/releases/tag/1.0.0
