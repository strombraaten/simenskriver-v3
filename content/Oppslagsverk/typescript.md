---
type: oppslagsverk
why: keep
date: 2023-09-09
lastmod: 2024-03-07
tags:
  - læring
  - teknologi
title: Typescript
publish: true
slug: typescript
---

Okei, her er det bare å ta et dypt pust og sette i gang.

## Hva veit jeg så langt?

### Sammenhengen til Javascript

Du kan ikke snakke om Typescript uten å nevne [[javascript]]. Typescript er nemlig en "strengere" variant av [[javascript]]. Med "strengere" så mener jeg at det er tydeligere regler på hva som er greit, og hva som ikke er greit, mens med [[javascript]] er det mer flytende og dynamisk. Det kan by på problemer dersom du skal sette deg inn i en stor mengde kode som du ikke har skrevet sjøl, og verdiene av en variabel endres utover i koden, uten noe særlig godt grunnlag f. eks.

Skal sies at det sikkert finnes bedre eksempler enn akkurat det der, men det er det eneste jeg kjenner til for øyeblikket.

Siden det henger såpass tett sammen med [[javascript]] (JS) så betyr det at alt du lærer deg om JS vil også hjelpe deg med å forstå Typescript. Det vil si at hvis du sliter med et problem med Typescript, men klarer ikke å finne svaret på det, så er det godt mulig at du kan finne svaret gjennom å søke på lignende problemer med Javascript.

### Særegenheter og finurligheter

Alle kodespråk har sine finurligheter, og det vil være lettere å forstå bakgrunnen for de finurlighetene når du kjenner til historien til kodespråket. I [[javascript]] sitt tilfelle blei det opprinnelig brukt i veldig små mengder på en nettside, og siden det var så små mengder så blei det utført ganske sakte av nettleserne på den tida. Ettersom språket blei mer og mer populært derimot så blei det brukt i større grad, som krevde en effektivisering av hvordan koden blei tolka (*dynamic compilation*), og hva man kunne gjøre med det (som å legge til APIer). Siden [[javascript]] som et språk blei designa med på tanke på mindre formål, og har nå vokst til å være et språk som brukes til å skrive applikasjoner med enorme mengder kode, så er det mange finurligheter som du kan snuble over.

## Funker det her a?

En av fordelene med Typescript er at du får beskjed om noe funker eller ikke, mens du skriver koden din. Så du trenger ikke å lure på om det kommer til å fungere eller ikke, fram til du faktisk kjører koden. Du får heller beskjed mens du skriver det. Såvidt jeg har skjønt.

Her er det riktignok en forskjell mellom *static checking* og *static **type** checking*. 

*Static checking* klarer jeg ikke beskrive sjøl, men det beskrives sånn her:

>Detecting errors in code without running it is referred to as _static checking_.

*Static type checking* derimot gir deg en melding basert på verdiene (og variablene?) du har definert.

```
const obj = { width: 10, height: 15 };
const area = obj.width * obj.heigth;
```

Den koden vil lede til denne feilmeldinga:

> [!warning] Property 'heigth' does not exist on type '{ width: number; height: number; }'. Did you mean 'height'?

Feilmeldinga dukker altså opp fordi selve *typen* av variabelen som heter `obj` er stavet feil – `heigth` i stedet for `height`.

## Spilleregler

Siden Typescript er basert på [[javascript]] så betyr det at de deler samme [[syntaks|]], eller de samme spillereglene foråsirresånn. Det som er grei oppførsel i [[javascript]] er mer eller mindre greit i Typescript og ut fra måten du skriver koden din. Forskjellen derimot er at Typescript legger til noen regler om hvordan ulike typer variabler kan brukes. Som i eksempelet over, hvor det er en type verdi som er stavet feil.

---

## Ressurser for å lære mer

- [Dokumentasjonen til Typescript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
