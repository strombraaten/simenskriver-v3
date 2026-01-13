---
type: oppslagsverk
why: keep
date: 2024-03-11
lastmod: 2024-03-11
tags:
  - behind-the-scenes
title: Versjonslogg
publish: true
slug: versjonslogg
---
## Arkiv

- 2024-03-12 - [[versjonslogg-02|Versjonslogg 0.2]]
	- Definerte *slugs* på alle notater, endra på navigasjonen på forsida, og lagde noen nye skjermopptak
- 2024-03-03 - [[versjonslogg-01|Versjonslogg 0.1 - statistikk]]
	- Implementerte tinylytics, som et mer personvernvennlig alternativ til Google Analytics, for å forstå bruken av sida i større grad.

## Usortert

### Fargestiler for hjemmesida

Det her blir for nerdene mine uti der altså, for detta blir nok intenst stammespråk for folk flest. [Figma lanserte nylig noe som heter variabler](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma), som lar deg forholdsvis enkelt definere stiler som skal gjelde til ulike formål – for eksempel hvordan light mode og dark mode kan se ut på en hjemmeside, [som f. eks Simenskriver.no](https://www.simenskriver.no/):

![[images/figma-variabler-simenskriver.gif]]

Du svitsjer det enkelt og greit i Layer-panelet når du har valgt én spesifikk frame. Der vil du se navnet på en samling med variabler. Hvis du trykker utenfor framen vil du finne `local variables` i høyremargen, og det er der du legger til stilene dine.

For øyeblikket prøver jeg å forstå [design tokens](https://thedesignsystem.guide/design-tokens) bedre, og hvordan man kan jobbe med det. Variabler er vel bare figma sin versjon av det å jobbe med design tokens, bare at det er litt begrensa enn så lenge. Det som skjer i gifen over er at når jeg trykker på light mode så vises `background`-fargen som er definert i Light-kolonna, på bildet under. Det samme gjelder `text-primary` også. Ække mer hokuspokus enn som så.

![[images/variabler-figma.jpeg]]

### En ting jeg likte

[Supa palette](https://www.supa-palette.com/) er en veldig enkel måte å lage fargepaletter på. Med en inkludert kontrastsjekk underveis. I tillegg til at du kan få inspirasjon fra etablerte designsystemer som Tailwind, Material UI og mange flere. Det er en [figma-plugin](https://www.figma.com/community/plugin/1103648664059257410/Supa-Palette) og, så jeg anbefaler å prøve den, selv om det bare blir en 7-dagers prøveperiode før du må punge ut.

---

![[hva-holder-jeg-på-med|Hva holder jeg på med?]]