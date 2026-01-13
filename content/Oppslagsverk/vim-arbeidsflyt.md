---
date: 2024-03-26
lastmod: 2024-03-26
tags:
  - teknologi
  - læring
title: Arbeidsflyt med Vim
publish: true
slug: vim-arbeidsflyt
---

## Hva er det jeg har lært så langt?

### Kom i gang

https://vimschool.netlify.app/introduction/vimtutor/

#### Vim-spill

> You play a blinking cursor appearing one day in a semi text based world of Textland inhabited by little people but ruled by bugs. You soon discover that your arrival was foretold by an old prophecy and that you're expected to restore order to the world (in case you didn't make it to level 2 yet...).
>
> You start the game with only the ability to move up, down, left, and right. As you progress, you talk to people and collect items and keyboard buttons. Each keyboard button adds to the set of commands you can give the cursor, until you master VIM.

## Hvordan går jeg fram

Er mest interessert i å bruke det for vanlig skriving, men for å ikke kødde for mye med hjernen min hadde jeg lyst til å avgrense vimbruken i starten til et eget program. Bare for å ha en leikeplass til å starte med.

Sånn sett har jeg skjønt at lazyvim i neovim skal være en smud måte å komme i gang på. Enten det eller [Helix](https://helix-editor.com/), som Mathias nevnte lengre oppi her.Jeg skriver jo mest i Obsidian, så på sikt tenker jeg å skru på vim-mode der. Har også leita meg fram til at [vimRC-pluginen](https://obsidian.md/plugins?id=obsidian-vimrc-support) kan være kjekk da, sammen med _[relative line numbers](https://publish.obsidian.md/hub/02+-+Community+Expansions/02.05+All+Community+Expansions/Plugins/obsidian-relative-line-numbers)_ for å navigere ut x antall linjer opp og ned.

## Linker jeg har lært fra

- [Why you should use Vim for everyday writing](https://www.youtube.com/watch?v=pYyqoLruqrc)
- [How to use lazy.nvim for a simple and amazing Neovim config](https://www.youtube.com/watch?v=6mxWayq-s9I&t=1199s)
- [The Ultimate Beginner’s Guide To Learn And Master Vim](https://www.youtube.com/watch?v=80mWp6H4zEw)

### Yanke

- `y` = yank

> Hvis du trykker "yy" så kopierer du hele linjen du er på. Om du har en selection så kan du trykke "y" for å kopiere det du har valgt

> Å yanke er å kopiere noe inn i en register. Registers kan man tenke på som en clipboard. Vim har ikke bare en clipboard, men har mange registers, man kan ha så mange registers man vil. Som default så matcher ikke registeren som er mappet til system clipboard med den man yanker til som default. For nybegynnere er det enklere at det er 1 til 1 der

## Plugins

1. Sneak
2. Treesitter
3. Telescope
4. Writeable search
5. Fzf
	1. Fuzzy finder
6. Signature
	1. Kilde: [C.A. Excline](https://medium.com/@x.line/10-recommended-vim-plugins-c6f370ddeb00)
	   ![[images/vim-marks.gif]]