---
title: "Shared Tokens Between a Web and a Print Design System"
description: One tokens.toml feeds a CSS system and a Typst system. How the copy moves, what is shared, and what print has to change.
tags:
    - study
    - design-system
    - typst
    - css
---

## Shared Tokens Between a Web and a Print Design System

[Proxima](https://github.com/DevParapalli/proxima) is a dark-first CSS system for screens.
[Centauri](https://github.com/DevParapalli/centauri) is a light-first Typst system for documents
and slide decks. They share one file, `tokens.toml`, and nothing else. Proxima owns the file.
Centauri carries a copy.

### What is shared

Only values that are identical in both systems live in `tokens.toml`. Everything else belongs to
the system that renders it.

| Shared (`tokens.toml`)                                         | Owned by each system                       |
| -------------------------------------------------------------- | ------------------------------------------ |
| Six neutrals per mode: `void`, `panel`, `panel_2`, three inks  | Typefaces and weights                      |
| Four state colours per mode, each with text, base, fill, line  | Body size and heading steps per factor phi |
| Four accents per mode: accent, deep, ink, glow, five chart series | Radii, spacing, motion                  |
| Chart neutral                                                  | Glass, blur, page furniture                |
| The type-scale rule, `phi`                                     | Alpha handling                             |

The type scale is a rule, not a list of sizes. `size(hN) = body * phi ^ ((6 - N) / k)`, so h6 is
always body size. Proxima runs it at 14.5px with k = 2. Centauri runs it at 10pt with k = 3 for
documents and 18pt with k = 2 for decks. The same formula gives a 48px h1 on screen and a 22pt h1
on paper.

Fonts are not shared. Proxima is set in Outfit, with Instrument Serif for quotations and IBM Plex
Mono for machine text. Centauri is set in Atkinson Hyperlegible Next and Mono, with Newsreader for
quotations and drop caps. A hex value survives the move from screen to paper. A typeface choice
does not.

### How the copy moves

Proxima regenerates its CSS from the file. `scripts/tokens.py` rewrites only the text between
`/* tokens:begin` and `/* tokens:end */` in `css/proxima.css`, so hand-written CSS around the
block is never touched. It emits `:root` for dark, `html.theme-light` for light, and one block
per non-default accent in each mode. `--check` exits 1 when the stylesheet is behind the file.

Centauri vendors the file. `scripts/sync-tokens.py` fetches `tokens.toml` from a Proxima git ref
or a local path, parses it, refuses it if any top-level table is missing, and writes it to
`src/tokens.toml` under a header that names its origin. `--check` exits 1 when the copy differs
from the source. The copy is vendored rather than fetched at compile time because Typst packages
MUST be self-contained; a Typst compile has no network.

```sh
# proxima
uv run scripts/tokens.py            # rewrite css/proxima.css
uv run scripts/tokens.py --check    # exit 1 if stale

# centauri
uv run scripts/sync-tokens.py --ref v0.2.0
uv run scripts/sync-tokens.py --from ../proxima/tokens.toml
uv run scripts/sync-tokens.py --ref v0.2.0 --check
```

Both scripts are PEP 723 single files with no dependencies, run with `uv run`.

### Releases

The two systems release in lockstep and Proxima leads. A Proxima tag `vX.Y.Z` fixes
`tokens.toml`. The Centauri release with the same version vendors it with `--ref vX.Y.Z`, so the
Centauri package records which Proxima it was cut from.

That is the documented process. As of 0.2.0 the Proxima repository carries no release tags, and
the vendored header in Centauri names a local path, not a ref. Both `--check` commands pass today
against the working trees. The process holds; the tag does not exist yet.

### What print has to change

The shared values are screen values. Centauri applies four corrections at theme build time,
all in `src/tokens.typ`.

Alpha is flattened. Proxima draws state fills and hairlines as `rgba()` over whatever is behind
them. A PDF fill SHOULD be opaque, so Centauri mixes each alpha onto its ground once, in sRGB, and
stores the result.

State text is pulled to 4.5:1. Each state's text colour is checked against its flattened fill with
the WCAG 2 contrast formula, implemented in Typst. If it falls short, the text is mixed toward
the page ink in 10% steps until it passes, at most ten steps.

Link colour is chosen, not set. For each accent the link is the first of accent, accent-deep and
ink that reaches 4.5:1 on both the page and the cover ground. If a theme override leaves no
candidate, compilation stops. `tests/run.sh` includes a document that MUST fail with that error.

Deck grounds come from a tonal ramp. Section slides sit on the accent's 600 step in dark
projection and 800 in light. The ramp, 50 to 950, is built in OKLCH from the accent so a
divider never flashes white between dark content slides. Text on a ramp step is whichever of the
two inks has the higher contrast against it.

### What this does not do

The check scripts run by hand. Neither repository runs them in CI, so a stale CSS block or an
old vendored copy is caught at the next release, not at the next push.

Nothing in `tokens.toml` is validated for contrast on the Proxima side. The 4.5:1 floor is
enforced in Centauri, where a failure stops a compile. In Proxima a bad pair ships.

The file does not describe components. A `card` in Centauri and a `.card` in Proxima share
colours and a radius ratio and nothing else. Keeping them visually matched is a review task, not a
build step.
