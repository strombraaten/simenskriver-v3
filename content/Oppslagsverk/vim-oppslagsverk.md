---
date: 2024-03-26
lastmod: 2024-03-26
tags:
  - teknologi
aliases:
  - et oppslagsverk for Vim
title: Et oppslagsverk for Vim
publish: true
slug: vim-oppslagsverk
---

> [!tip] Anbefaler å lese [[vim|en introduksjon til Vim]] før du kaster deg ut i oppslagsverket.

## Bevegelse

Det er mange måter du kan bevege deg på, eller flytte deg rundt i et tekstdokument med Vim.

### Piltastene

Først starter du med piltastene. De er plassert på bokstavene h-j-k-l. Grunnen til det er nok at de da befinner seg på det som kalles "homerow", som er der fingrene dine plasseres naturlig på tastaturet (rundt `f` og `j`-knappen).

| Kommando | Forklaring  |
| -------- | ----------- |
| `h`      | Pil venstre |
| `j`      | Pil ned     |
| `k`      | Pil opp     |
| `l`      | Pil høyre   |

### Navigering i en linje

![[images/vim-demo-we.gif]]

| Kommando | Forklaring                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------------- |
| `0`      | Begynnelsen av linja                                                                                           |
| `$`      | Slutten av linja                                                                                               |
| `w`      | Flytter deg framover til starten av det neste ordet                                                            |
| `e`      | Slutten av ordet du står i, deretter hopper du videre til slutten av det neste ordet                           |
| `b`      | Flytter deg bakover til starten av ordet du står i, deretter hopper du videre til starten av det forrige ordet |

Det vil si at ved å trykke på `e` f. eks flytter du musepekeren til enden av ordet du befinner deg i (inkludert det siste tegnet).

### Navigering utover kun én linje

| Kommando   | Forklaring                   |
| ---------- | ---------------------------- |
| `(` og `)` | Flytter deg mellom setninger |
| `{` og `}` | Flytter deg mellom avsnitt   |

## Operatorer og bevegelser

### Sletting

Sletting er en såkalt *operator*

| Kommando | Forklaring                                                                                            |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `x`      | Sletter på samme måte som backspace. Den sletter bokstaven/tegnet til venstre fra der musepekeren er. |
| `d`      | Brukes også til sletting, men gjør ingenting med mindre den kombineres med en bevegelse.              |
| `dd`     | Sletter hele linja du er på                                                                           |
| `dw`     | Sletter til *starten* av det neste ordet i, unntatt det første tegnet                                 |
| `de`     | Sletter til *slutten* av ordet du befinner deg i, inkludert det siste tegnet                          |
| `d$`     | Sletter til slutten av linja, inkludert det siste tegnet                                              |
| `d0`     | Sletter alt til starten av linja, fra der musepekeren befinner seg                                    |
| `dj`     | Sletter alt på linja du befinner deg på, i tillegg til linja *nedenfor* (siden `j` = pil ned).        |
| `dk`     | Sletter alt på linja du befinner deg på, i tillegg til linja *ovenfor* (siden `k` = pil opp).         |

For å slette en hel linje kan du trykke `dd` (delete x 2 ganger)

Verdt å vite: Linja i sin helhet slettes, helt uavhengig av hvor musepekeren din befinner seg på linja.

Ved å skrive `d0` sletter du alt til venstre for musepekeren, altså til *starten* av linja.

> ==For å slette en hel== 🐭linje kan du trykke `dd`

Ved å skrive `d$` vil du slette alt til høyre for musepekeren, altså til *slutten* av linja.:

> For å slette en hel 🐭==linje kan du trykke== `dd`

Om du vil slette flere linjer samtidig kan du spesifisere antallet først. Om du vil slette to linjer i samme slengen f. eks skriver du `2dd` – Antall + Slett hele linjer.

### Angre

| Kommando     | Forklaring                                        |
| ------------ | ------------------------------------------------- |
| `u`          | Angre siste handling                              |
| `U` (stor u) | Angre alle handlingene på linja du befinner deg i |
| `ctrl + r`   | Angre på angringa / Gjør endringen igjen          |
| `g+` & `g-`  | Angre                                             |

### Erstatt

- `r` brukes for å erstatte en bokstav eller tegn (r = replace)
- `d` brukes for å slette ting kjappere. For `x` lar deg kun slette ett tegn om gangen, mens `d` kan kombineres med ulike typer bevegelser som gjør det mulig å slette flere ord og linjer samtidig

## Tellere

Ved å bruke tall før en bevegelse kan du si hvor mange ord du vil hoppe over. Om vi bruker den samme setningen som et eksempel:

> Ved å bruke tall før en 🐭bevegelse kan du si hvor mange ord det er fram til dit du vil være

Hvis musepekeren står før ordet "bevegelse", som jeg har prøvd å illusterere med emoji-musa, og du skriver `6w` betyr det at du hopper fram til ordet "mange". Fordi du hopper over 1) bevegelse, 2) kan,  3) du, 4) si, 5) hvor, 5) mange.

> Ved å bruke tall før en 🐭(1) bevegelse (2) kan (3) du (4) si (5) hvor (6) mange ord det er fram til dit du vil være

### Bruksområder

Tellere kan du bruke på mange ulike måter.

| Bevegelser | I kombinasjon med en teller                                                                     |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `w`        | `2w`Antall ord du hopper til *begynnelsen av* (inkluderer ikke tegnsetting på slutten av ordet) |
| `W`        | Samme som `w`, men det inkluderer altså tegnsetting (eller mellomrom) på slutten av ordet       |
| `e`        | Antall ord du hopper til *slutten av* (ikke inkludert tegnsettingen på slutten av ordet)        |
| `E`        | Samme som `e`, men det inkluderer altså tegnsetting (eller mellomrom) på slutten av ordet       |
| `b`        | Antall ord du hopper *bakover* (ikke inkludert tegnsettingen på slutten av ordet)               |
| `B`        | Samme som `b`, men det inkluderer altså tegnsetting (eller mellomrom) på slutten av ordet       |
| `$`        | Antall linjer du beveger deg nedover                                                            |

> [!question]- Gjør `x` og `d` nøyaktig det samme?
> Nei, `x` sletter ett tegn om gangen, mens `d` kan du kombinere på ulike måter for å slette flere ord, linjer, avsnitt osv. samtidig.

Telleren kommer alltid først for å indikere antall.
Du kan også kombinere en teller, operator, og en bevegelse, som f. eks `2dw`.

> Denne linjen 🐭TSHJ SVP har flere RXWI ord enn nødvendig

Når musepekeren er t til venstre for ordet/ordene du vil fjerne, kan du skrive `2dw`. Bokstaven `d` bruker du for å si at noe skal slettes, kombinert med `w` betyr det at du skal slette hele ord, og ikke bare én og én bokstav. Når du i tillegg inkluderer et tall på starten indikerer det hvor mange ord som skal slettes.

> [!question]- Hva er forskjellen mellom å skrive `2dw` og `d2w`?
> Ingen forskjell faktisk. Truls Henrik forklarte det på en fin måte:
> > *På samme måte som at det å først gå til venstre og så høyre er det samme som å gå til høyre og så venstre, så kan du velge å slette to ord, eller å slette ett ord to ganger, resultatet blir nøyaktig det samme*
> 

### Avansert bruk av piltastene

Piltastene kan også kombineres med en såkalt *teller*, hvor du spesifiserer hvor langt du vil bevege deg i ett hopp. 

| Kommando | Forklaring                                                 |
| -------- | ---------------------------------------------------------- |
| `3k`     | Flytter deg 3 linjer opp (k = oppover-pil)                 |
| `3j`     | Flytter deg 3 linjer nedover (j = oppover-pil)             |
| `3h`     | Flytter deg 3 bokstaver/tegn til venstre (h = venstre-pil) |
| `3l`     | Flytter deg 3 bokstaver/tegn til høyre (l = høyre-pil)     |

## Usorterte notater

- Trykk `esc`-knappen for å gå tilbake til normalmodus. Hva er det man da egentlig gjør i normalmodus? Sammenligna med.. de andre modusene?
- Når du skal fjerne noen bokstaver på en linje så er det viktig å vite at det er bokstaven til venstre for musepekeren din som blir sletta
- `A` = lar deg legge til tekst på slutten av en setning. Da har det ikke noe å si hvor på linja du har musepekeren siden den vil alltid hoppe til slutten av setningen (A for Add)
- Viktig å legge merke til at det er en forskjell på liten og stor `a`. Om du er i normalmodus og skriver en stor A vil musepekeren hoppe til slutten av setningen, og du bytter til insert-modus. Om du derimot skriver liten `a` så hopper du til slutten av det ordet du står i
- Nei, det med liten `a` stemte ikke. Det er det samme som å trykke på `i`, bare at du velger å plassere musepekeren til høyre i stedet for venstre for den bokstaven du står ved på linja.
- For å avslutte Vim er det to muligheter: 1) `:q!` for å forkaste endringene du har gjort, eller `:wq` for å lagre endringene og lukke endringene du har gjort
- `dw` = Slett ordet du står i. Skal sies at her må du ha musepekeren plassert på starten av et ord for å slette ordet i sin helhet. Om du har musepekeren midt i ordet "banan" f. eks, at den står ved siden av A´en så vil du kun slette "nan" ikke "ba"-biten
- Faktisk så er det noen regler som går igjen. For du kan skille mellom operatorer og bevegelser
	- Om du bruker `diw` (delete in word) derimot så sletter du hele ordet uansett hvor musepekeren din er
- Faktisk så er det noen regler som går igjen. For du kan skille mellom operatorer og bevegelser
- `c` + commando for change. feks`ci"` for å endre innhold inni “her”, eller`cw` for å endre ordet. `ciw` (change in word) sletter et ord og går i insert mode der ordet var
- `y` er "yank", som er det samme som å kopiere. `p` er "paste", altså å lime inn.
	- Det blir det samme som `cmd + c` og `cmd + v`
	- **`y`** to yank (copy) the content
	- **`p`** to put (paste) the content
- **`v`** (lowercase) to start selecting individual characters
- **`V`** (uppercase) to select the entire line
- **`Ctrl+v`** to select by block
