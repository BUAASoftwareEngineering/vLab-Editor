# Editor
## Usage
1. Run `npm install .` to install mudules
2. Run `npm run build` to build with webpack
3. Run `npm run simpleserver` to setup editor in browser at [http://localhost:8888](http://localhost:8888)
## Caution
- Intellisense will **not** work without `npm run simpleserver` (directly opening `dist/index.html` in browser is not enough). The reason is unknown.
- Keyboard Shortcuts currently designed for macOS, featuring command(⌘, windows), option(⌥, alt) and shift(⇧). The behavior in Windows/Linux has **not** been tested.
## Feature
### New Keyboard Shortcuts

| Action Description        | Keyboard Shortcuts | Comments |
| ------------------------- | ------------------ | ------------------ |
| Fold block                | `⌘ + -`            | `-` for folding |
| Expand block              | `⌘ + =`            | `+ (=)` for expanding |
| Fold recursively   | `⌥ + ⌘ + -`        | `⌥` for recursion |
| Expand recursively | `⌥ + ⌘ + =`        |         |
| Fold all | `⇧ + ⌘ + -`            | `⇧` for globally |
| Expand all          | `⇧ + ⌘ + =`            |             |
| Jump to (matching) bracket | `⌘ + [` | `[` for 'open', 'incomplete' brackets |
| Select to brackets | `⌘ + ]` | `]` for 'closed', 'complete' brackets |
