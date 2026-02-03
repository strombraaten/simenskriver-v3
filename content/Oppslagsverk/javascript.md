---
type: oppslagsverk
date: 2023-08-29
lastmod: 2024-03-07
tags:
  - læring
title: Javascript
publish: true
slug: javascript
---

## Intro

En ting som nevnes i kurset på Mimo er at linjer med kode er bare instruksjoner som dataen skal følge. Så når vi kjører koden spør vi bare dataen om å følge alle instruksjonene vi har gitt den. Derfor er det også viktig å tenke på rekkefølgen som instruksjonene (koden) skrives i.

Det vil si at vi også må definere variablene før verdien skal vises fram.

### Hva er `Console.log`?

For å få dataen til å vise fram en verdi så gir vi instruksjonen `console.log ("Heisann verden!");`. Du kan altså skrive hva du vil der, helt uten å knytte den til annen info i koden din.

Samtidig kan du også bruke den til å vise verdien av variabler – `console.log(KILIMANJARO_HEIGHT);` og da vil du få **verdien** av variabelen (`5895 meters`) ikke navnet til selve variabelen (`KILIMANJARO_HEIGHT`).

> [!question] Men hvorfor vil man vise verdien i konsollen?

Den informasjonen vises i et område som kalles konsollen, som bare er et område som viser output.

### Hvorfor bruke javascript i det hele tatt?

Såvidt jeg har forstått brukes det ofte for å gjøre noe mer dynamisk. Da trenger man riktignok å huske informasjon for å kunne vise eller lagre det, og det er derfor det finnes `variabler`. Da jeg tok et Javascript-kurs gjennom Mimo så sammenligna de det med å flytte på esker. For på samme måte som med en pappeske så har variabler innhold av noe slag, og navn som sier hva som er på innsida.

`let` og `const` er det som brukes for å lage variabler. Som i:

```
let
const
```

### Navngivning av en variabel

Når du navngir en variabel så må det være ett sammenhengende ord, ikke noe mellomrom. Dersom du derimot vil bruke to ord sammensatt til ett så kan du skille dem ved å bruke stor bokstav i det andre ordet – `epostAdresse`. Artig nok kalles det der `camel case`, fordi det blir en slags pukkel midt i det sammensatte ordet. Bør nevnes at om du setter sammen navnet av to, tre, fire ord eller flere så skal alle ordene utenom det første ha stor forbokstav, eller pukkel, om du vil.

For å forstå hva som er inni en variabel så er det viktig å navngi variabelen på en beskrivende måte. Det vil si at du heller kaller variabelen `epostAdresse` i stedet for `e`.

### Hva kan en variabel være?

En variabel kan også inneholde nummer, som kan være spesielt nyttig hvis du har flere variabler som ligner på hverandre i innhold – `adresse1`, `adresse2` osv.

### Hvordan bruker du en variabel?

For å gi variabelen en verdi av noe slag så bruker vi erlik-tegnet `=`, for å indikere hva variabelen inneholder – `const city = "Chicago";`. Bare husk å runde av med en semikolon for å kunne si deg ferdig.

Verdien som lagres kalles for en `string`. De må alltid stå mellom to anførselstegn, som i eksempelet over – `"Chicago"`. Mellom anførselstegnene kan du slå deg løs med både bokstaver, tall og symboler, til og med mellomrom!

`let sideprosjekt = "lære Javascript";`

#### Forskjellen mellom `const` og `let`

Når vi skal lage, eller deklarere en variabel, så bruker vi altså `const` og `let`. `const` er forkorta fra "constant" (konstant), og brukes for variabler som har verdier som ikke skal endre seg. Som f. eks: `const denmarkCapital = "Copenhagen";` 

Om du faktisk prøver å endre på verdien til en konstant variabel så får du altså en feilmelding ("*TypeError: Assignment to constant variable*").

```
const height = "180";
height = "175";
```

Derimot om du bruker `let` så kan du endre på verdien (uten å få feilmelding):

```
let height = "180";
height = "175";
```

Legg merke til at du skal bruke `let`-ordet først, når du skal definere variabelen til å starte med. Når du skal **endre** verdien derimot så skriver du kun navnet etterfulgt av erlik-tegnet (=) og den nye verdien – `height = "175";`, uten `let`-ordet.

#### Detaljert bruk av `let`-variabler

Du kan endre verdien på variabelen så mange ganger du vil. Og hvis du har behov for det kan du til og med si `height = BIRTHDAY;` for å gi height-variabelen den samme verdien som BIRTHDAY-variabelen.

Med det sagt så spiller rekkefølgen en viktig rolle her. For hvis du har endra verdien av variabelen din så er det den siste endringen som vil gjelde. Systemet "glemmer" på en måte den forrige verdien. Her har du et bittelitt mer avansert eksempel som viser viktigheten av rekkefølgen:
```
const number1 = 3;
const number2 = 4;
let number3 = 10;
number3 = number1 + number2;
```

Siden det står `let number3 = 10` så skulle du jo da tro at verdien av `number3`-variabelen var 10, men siden vi endrer verdien ved å skrive `number3 = number1 + number2` så blir det heller resultatet av verdiene deres. Og siden de er definert som nummer, og ikke en streng (med anførselstegn) så blir svaret 3 + 4 = 7.

#### Hvordan skille mellom `const` og `let`-variabler?

Én måte du kan gjøre det tydelig i koden din hva som er en `const`-variabel, og hva som er en `let`-variabel er ved å bruke store bokstaver på `const`-variablene:
```
const BIRTHDAY = 20/03/1657
```

Dersom du har en `const`-variabel med mer enn ett ord så kan du ikke lenger bruke "camelcase"-grepet, ved å ha en stor forbokstav på ord nummer 2/3/4 også videre. Da kan du heller bruke det som kalles "snake_case", hvor du skiller ordene med en understrek:

```
const KILIMANJARO_HEIGHT = "5895 meters";
```

Det anbefales å bruke `const` som default, når du lager variabler, men nøyaktig hvorfor er jeg neimen ikke sikker på.

> [!question] Hvorfor anbefales det å bruke `const` som default?

## Expression

Når du legger sammen "string values" så kalles det en "expression" fordi det lager en enkelt "string value".

> [!question] Men jeg veit ikke hva det egentlig vil si å lage en enkelt "string value" 🤔

For å se resultatet av en *expression* så kan du bruke `console.log()`-instruksen for å vise verdien:
```
const numberOfFollowers = "55";
console.log ("Followers:"+numberOfFollowers);
```

Aha! Grunnen til at du vil bruke *expressions* er for å kombinere en variabel og en verdi, f. eks hvis du har det tilfellet her:

```
const label = "Name:" + "Joe";
```

Så vil verdien du sitter igjen med være "Name:Joe", og på den måten har du kombinert både en variabel og en verdi til én samla verdi (eller "string value").

En ting som er verdt å nevne her er at når du legger sammen verdier gjennom på den måten så blir det uten mellomrom, så det må du huske å legge inn i verdien din – `Joe `, i stedet for bare `Joe`.

*Expressions* vil sånn sett være veldig nyttig når du skal vise informasjon som kan endre seg, etterfulgt av noe mer statisk, for eksempel:

```
const numberOfLikes = "40 ";
console.log(numberOfLikes + "likes");
```

Resultatet av det da blir `40 likes`.

En alternativ måte å legge til mellomrom på kan være å legge til et mellomrom mellom to anførselstegn – `" "`, som du kan se i eksempelet under:

```
const wonder = "Wonder";
const woman = "Woman";
console.log(wonder + " " + woman);
```

## Values

Du har ulike *values*, eller verdier, innen Javascript:
1. `Udefinert`: Representerer en uinitialisert eller ikke-eksisterende verdi.
2. `Null`: Representerer fraværet av en hvilken som helst objektverdi.
3. `Boolean`: Representerer en logisk entitet av enten ﻿true eller ﻿false.
4. `Number`: Representerer numeriske verdier. Inkluderer heltall og desimaltall.
5. `String`: Representerer tekstdata som er innrammet med enten enkeltfnutter (﻿') eller dobbeltfnutter (﻿").
6. `Symbol`: Representerer unike og uforanderlige verdier som kan brukes som objektegenskaper.
7. `Object`: Representerer en samling av nøkkel-verdi-par eller egenskaper.
8. `Array`: Representere en ordnet liste av verdier lagret innenfor firkantede klammer (﻿[]).
9. `Function`: Representerer en gjenbrukbar kodeblokk som utfører en spesifikk oppgave.
10. `Date`: Representerer et spesifikt tidspunkt.
11. `RegExp`: Representerer et regulært uttrykk brukt for mønstergjenkjenning.
12. `Error`: Representerer en feilobjekt som kan kastes eller fanges.

true

### Nummer

Nummer trenger ikke å ha anførselstegn rundt seg. Det betyr at du kan skrive `const numberOfLikes = 5;`.

Du kan faktisk ta det her lenger og regne ut greier, ved å skrive:
```
const percent = 0.5*100;
console.log(percent);
```

Da vil du resultatet bli `50` i "Console output".

Dersom du skriver tallene på samme måte som en hvilket som helst annen verdi, altså mellom to anførselstegn, så vil du ikke kunne regne ut på samme måte.

```
const temperature = "3" + "1";
console.log(temperature);
```

Resultatet her blir ikke da 4, men heller 31, siden tallene kun listes opp i rekkefølge, de regnes ikke ut på grunn av anførselstegnene.

### Lagre verdier i en variabel

Dersom jeg ville regna ut hvor mange artikler jeg har skrivi på i det siste, både de jeg har publisert, og utkastene mine så kunne jeg skrivd:

```
const drafts = 4;
const published = 16;
const total = drafts + published;
console.log("Articles written: " + total);
```

Resultatet av det blir da `Articles written: 20`.
Det er kult.

### True or false?

*True/false* er spesielle verdier innenfor Javascript.
True/False er altså ikke en streng fordi du bruker den uten anførselstegn. Det vil si at `"true"` er en streng, nettopp på grunn av anførselstegnene, mens `true` er en spesiell verdi.

#### True

*True* brukes når du skal sjekke om noe er av eller på for eksempel:
```
console.log("Subscribed?");
console.log(true);
```

Resultatet da blir `Lights on? true`.

Du kan også lagre *true* i en variabel, på samme måte som en streng eller et nummer, men jeg veit neimen ikke hvorfor du vil gjøre det ennå 🤔

```
const correct = true;
console.log(correct);
```

Resultatet da blir `true`.

#### False

Som du sikkert forventa deg nå så fungerer denne altså på samme måte som true, men har motsatt virkning.

#### Advanced true/false

Dersom du bruker et utropstegn foran `true`så resulterer det i det motsatte. Utropstegnet fungerer da som en såkalt "negation operator" som gjør verdien til den motsatte – `console.log(!true);` blir altså `false` 🤯

Det samme gjelder såklart også for `!false` som da blir det motsatte, nemlig `true`.

> [!question] I hvilke tilfeller er det nyttig å bruke `!true` og `!false`?

En ting som er interessant er at du også kan bruke en *negation operator* på en variabel – `!openSlot`.

```
const openSlot = true;
const isAvailable = !openSlot;
```

### Sammenligning

#### Det samme som

Du kan også sammenligne om to tall er identiske ved å sammenligne dem med tre erlik-tegn – `===`, som da kalles noe så fancy som en *equality operator*. Når du sammenligner noe så vil svaret alltid være enten `true` eller `false`.

Om du lager et dataspill f. eks så kan du bruke en *equality operator* for å sjekke om antall liv som en spiller har igjen er nøyaktig 3:

```
console.log(remaingLives===3);
```

#### Ikke det samme som

Du har også en motsatt greie som heter *inequality operator*, den består av et utropstegn og to erlik-tegn – `console.log(1!==10;`.

Det som er litt fancy er at du kan faktisk lagre svaret av en sammenligning i en variabel:

```
const comparisonResult = 1 !== 2;
console.log(result);
```

Resultatet da blir `true`. Og det gjelder såklart både *inequality* og *equality operators*.

### Utregning ved hjelp av sammenligning

På den måten kan du faktisk sammenligne variabler med hverandre:

```
const one = 1;
const two = 2;
console.log(one === two);
console.log(one !== two);
```

Resultatet av det der blir da `false`på den første og `true` på den andre.

Et eksempel til kan være:

```
const emails = 1000 ;
const inboxFull = emails === 1000;
```

Resultatet av det da vil være `true`, og at innboksen er full fordi den har 1000 eposter i seg.

Det kan også være en måte å sjekke hvilket nivå man er på i et spill:

```
const level = 5;
const highestLevel = 50;
console.log(level === highestLevel);
```

Resultatet da blir `false` siden spilleren er på level 5.

### Utregning

Du kan også lagre svaret til en utregning inni en ny variabel, som i tilfellet under, hvor du har en variabel som viser en `score`, og en annen som viser eventuell `bonus`. De to kan du plusse sammen, og lagre svaret som en verdi i en ny variabel som heter `total`.

```
const score = 1084;
const bonus = 500;

const total = score + bonus;
console.log(total);
```

Resultatet som vises i *console output* blir da `1584`.
