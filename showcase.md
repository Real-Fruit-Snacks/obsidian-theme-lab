---
tags: [theme-lab, showcase]
title: Theme Lab Showcase
issue: 12
drawn: 2026-09-12
published: true
aliases: [Showcase]
---
A first paragraph directly under the properties. It should sit comfortably below the metadata block and read at body size, with **bold**, *italic*, ***bold italic***, ~~strikethrough~~, ==highlight==, `inline code`, a [[Theme Lab Showcase|resolved link]], an [[Not A Real Note|unresolved link]], an [external link](https://obsidian.md), a footnote[^1], inline math $E = mc^2$, and two tags: #showcase #theme-lab

A second, longer paragraph to check line height, measure and wrapping. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. A word with a trailing ==highlight==, then punctuation. Keyboard: <kbd>Ctrl</kbd> + <kbd>P</kbd>. Sub<sub>script</sub> and super<sup>script</sup>. An HTML <mark>mark</mark>. A `code span with a #tag-like string` and a `very-long-inline-code-span-that-should-not-break-the-line-badly`.

# Heading one

## Heading two

### Heading three

#### Heading four

##### Heading five

###### Heading six

## A heading long enough to wrap onto a second line in a note with Readable line length turned on

## Lists

- Bullet one
- Bullet two with **bold** and a [[Theme Lab Showcase|link]]
	- Nested bullet
		- Third level
			- Fourth level
- Bullet with a `code span`

1. Numbered one
2. Numbered two
	1. Nested numbered
	2. Nested numbered two
3. Numbered three
	- Mixed bullet under a number

- [ ] Task open
- [x] Task done
- [ ] Task with a #tag and a [[Theme Lab Showcase|link]]
	- [ ] Nested task
	- [x] Nested task done
- [/] Task in progress (custom state)
- [-] Task cancelled (custom state)
- [?] Task question (custom state)

## Callouts

> [!note] Note
> The stock note callout. Every type below should be visibly different.

> [!abstract] Abstract
> Also `summary` and `tldr`.

> [!info] Info
> Plain information.

> [!todo] Todo
> Something to do.

> [!tip] Tip
> Also `hint` and `important`.

> [!success] Success
> Also `check` and `done`.

> [!question] Question
> Also `help` and `faq`.

> [!warning] Warning
> Also `caution` and `attention`.

> [!failure] Failure
> Also `fail` and `missing`.

> [!danger] Danger
> Also `error`.

> [!bug] Bug
> A bug.

> [!example] Example
> An example.

> [!quote] Quote
> Also `cite`. "Nothing good happens after 2 a.m., but nothing bad does either."

> [!tip]- Collapsed by default
> You should not see this until the callout is opened.

> [!note]+ Expanded by default
> This one starts open.

> [!warning] A callout with a long title that should wrap or truncate gracefully in a narrow pane without breaking the icon alignment
> Body text.

> [!tip] Nested callouts
> Outer body.
> > [!question] Inner
> > Inner body.
> > - a list inside a callout
> > - [ ] a task inside a callout
> > ```bash
> > echo "code inside a callout"
> > ```

> [!custom] A custom type
> Types the theme does not know should fall back sensibly.

> A plain blockquote, not a callout.
> Second line of the blockquote.

## Code

```bash
sudo lsof -i :5230
kill -9 $(lsof -t -i :5230)   # a comment
export VERY_LONG_VARIABLE_NAME="a long string value that should scroll horizontally rather than wrap unless the theme chooses to wrap code"
```

```js
// keywords, strings, numbers, functions, comments
const answer = 42;
function greet(name = "world") {
  return `Hello, ${name}!\
