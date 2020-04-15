# Editor
## Usage
1. Run `npm install .` to install mudules
2. Run `npm run build` to build with webpack
3. Run `npm run simpleserver` to setup editor in browser at [http://localhost:8888](http://localhost:8888), or use something like *Apache* to setup a host.
## Caution
- Intellisense will **not** work without server (directly opening `dist/index.html` in browser is not enough). Intellisense relies on web workers, which require a web server.
- Keyboard Shortcuts are currently designed for macOS, featuring command(⌘, windows), option(⌥, alt) and shift(⇧).
- On Windows / Linux, the **command(⌘)** is replaced by **Ctrl**. For example, using `Ctrl + [` to jump to bracket.
## Feature
### Well-designed Keyboard Shortcuts

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
| Jump to definition | `⌘ + D`      | `D` for 'definition' |
| Peek definition    | `⇧ + ⌘ + D` | `⇧` for peeking |
| Peek references    | `⌥ + ⌘ + D` | `⌥` for the opposite — 'references' |
