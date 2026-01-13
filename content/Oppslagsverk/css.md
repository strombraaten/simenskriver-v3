---
type: oppslagsverk
why: keep
date: 2023-05-21
lastmod: 2024-03-07
tags:
  - læring
title: CSS
publish: true
slug: css
---

## Egenskaper

Når du legger til en egenskap, som f. Eks `color`, med en verdi, som i `color: green;` så lager du en såkalt `declaration`, og det er altså [[notes/CSS|CSS]], og ikke [[notes/HTML|HTML]]. Et eksempel på det kan være f. eks:

```
<h1 style="color: green;">Fargerike blomster</h1>
```

Når du har valgt egenskapen du vil ha må du huske å avslutte med en kolon (`color:`), for å legge opp til verdien som skal brukes. Etter verdien må du legge til en semikolon (`color: green;`) for å avslutte deklarasjonen.

### Muligheter

Det er mange egenskaper der ute, eller `CSS properties`, som de heter. Om du vil endre på bakgrunnen til et element kan du f. eks bruke `background-color`. Legg merke til at det brukes bindestrek mellom to ord.

Det kan da se sånn ut:

```
<h1 style="background-color: darkGreen;">Grønn bakgrunn</h1>
```

Så lenge du avslutter med en semikolon, etter du har gitt en verdi til en spesifikk egenskap, så kan du også legge til flere, om du vil det. Som for eksempel:

```
<h1 style="color: hot-pink; background-color: darkGreen;">Rosa skrift på grønn bakgrunn</h1>
```

Du kan legge til egenskaper på alle(?) slags elementer. Ikke bare overskrifter som jeg har brukt i det tilfellet her. Dersom du har skikkelig lyst på grønn tekst kan du f. Eks skriver:

```
<p style="color: green;">Denne teksten vil da være grønn</p>
```

Om du både vil at teksten skal være grønn, men at den også skal stå i kursiv så kan du skrive det i samme setning:
```
<p style=«color: green; font-style: italics;»>Denne teksten er både grønn og kursiv</p>
```

## Hvordan du slipper å gjøre samme endring mange ganger

I et [[html|html]]-dokument har du en tag som heter `<head>`. Mellom den introduserende og avsluttende head-tagen kan du legge en `<style>`-tag:

```
<head>
<style>
</style>
</head>
```
På den måten dekker du bordet for de elementene som du vil påvirke. Det er som å si at «Jeg har tenkt til å endre utseendet på følgende elementer», også må du bare definere innafor de to.. tagene (?) hva som faktisk skal påvirkes. For eksempel vanlige tekstavsnitt vil da se sånn her ut:

```
<head>
<style>
p {
font-family: cursive;
}
</style>
</head>
```

Da gjelder de samme reglene som med egenskaper og verdier, som vi var innom tidligere, hvor du må si hva du vil endre på – `font-family:` og påpeke hva endringen skal være – `font-family: cursive;`.
På den måten lager du en såkalt `css rule`, som betyr at den påvirker alle de områdene hvor du benytter deg av et tekstelement som er definert som en paragraf – `<p>`.

Du kan såklart legge til flere deklarasjoner, som det heter, så lenge de ligger på hver sin linje, som for eksempel:

```
<head>
<style>
h2 {
background-color: blue;
color: white;
font-weight: bold;
font-family: Arial;
}
```

I tilfellet over kan vi si at `h2` er en `selector`, fordi vi må si i fra hva stilendringene skal påvirke. Stilendringene kalles deklarasjoner, mens elementet de påvirker kalles for `selectors`, hvis jeg har forstått riktig..

## Jobb smartere

Du kan altså bake inn all stilendringene dine i en [[html|html]]-fil, men da blir det fort rotete. Det er derfor man pleier å skille de fra hverandre, og heller referere til en fil som oftest heter `styles.css`, som du linker til i [[html|html]]-fila.

## Grunnleggende

Først må vi tenke på plasseringa. [[css|css]] hører hjemme mellom `<head>`-tags i en [[html|html]]-fil. 

```
<html>
<head>
<style>
p {
background-color: teal;
}
</style>
<head>
<body>
</body>
</html>
```

Der kan du fint plassere alt av bakgrunnsfarger, størrelser, og valg av skrifttyper også videre, men for å gjøre det ryddigere bruker vi heller en referanse til en egen fil hvor du skiller ut all [[css|css]]en. Som oftest kalles den fila `style.css`.

> [!IDEA] «Jobb smartere»-øyeblikk

Det du gjør da er at du lager en spesifikk fil kun for stylinga av sida, som kalles et `style sheet`. CSS er nemlig forkorta fra «Cascading Style Sheet». Hvor «Cascading»-biten av begrepet handler om at alle stilvalgene dine, (eller «deklarasjonene», som de så fint kalles) kommer én etter én.

I praksis vil [[html|HTML]]-fila di da se sånn ut:

```
<html>
<head>
<link rel=«stylesheet» href=«style.css»>
</head>
<body>
<h1>Hello world</h1>
<p>Se på meg du! Lager style sheets uten problemer<p>
</body>
</html>
```

Det du gjør da er å si til koden din «Hei du! Husk at du skal ha med deg et stylesheet, du finner det her borte». Da bruker vi `<link>`-tagen for å peke i riktig retning, samtidig som vi definerer relasjon den fila har, nemlig at den er en stylesheet – `…rel=«stylesheet»..`

## Klasser

Det her er tett knytta til det jeg nevnte tidligere om hvordan du slipper å gjøre samme endring mange ganger. Den eneste forskjellen er at du kan være mer selektiv.

Hvis du lager en punktliste f. Eks (en «ordered list» altså, som forkortes til  `<ol>`) så kunne du sagt at hvert punkt som defineres med `<li>` skal ha gul bakgrunn. Da kunne du definert det på denne måten:

```
<head>
<style>
ol {
background-color: yellow;
}
</style>
</head>
<body>
<ol>Handleliste>
<li>Wraps</li>
<li>Mango</li>
<li>Koriander</li>
<li>Chili</li>
<li>Lime</li>
</ol>
</body>
```

Hvis du ville hatt mer kontroll over den, og heller fargelagt annenhvert punkt, så kunne du skrivd det sånn her:

```
<head>
<style>
.yellow-element {
background-color: yellow;
}
</style>
</head>
<body>
<ol>Handleliste>
<li class=«yellow-element»>Wraps</li>
<li>Mango</li>
<li class=«yellow-element»>Koriander</li>
<li>Chili</li>
<li class=«yellow-element»>Lime</li>
</ol>
</body>
```

Ikke det mest sexy eksempelet akkurat, men poenget er bare at du har mer kontroll, og kan style spesifikke elementer, i stedet for å dra alle over en kam. Feilmeldinger kunne nok vært et bedre eksempel. Da kunne jeg formidla på en eller annen kodemåte at «Hvis man trykker på en ikke-eksisterende link skal du få en rød feilmelding som sier at det har skjedd noe feil. Om du derimot har meldt deg på nyhetsbrevet f. Eks så skal jeg bekrefte at alt er i sin skjønneste orden, og informere om at det gikk bra.»

Måten du lager en klasse på er at du starter med et punktum og følger opp med hva den «klassen» skal hete – `.yellow-element`, etterfulgt av en egenskap og en verdi:

```
.yellow-element {
color: yellow;
}
```

En klasse kalles også en «selector», siden vi aktivt peker ut hvilke elementer som skal påvirkes av et stilvalg.

> [!warning] Spørsmål
> Hva er forskjellen mellom en tag selector, ID selector, og en class selector? For jeg har sett at det er noen som defineres ved å skrive 
> `body {}` og andre som `.yellow-element` og andre igjen som `#capital-letter`

### ID selector

For å gjøre endringer på veldige spesifikke ting så kan du bruke en ID selector. I CSS-fila di da definerer du hva slags stilendring det skal være, og hva den regelen skal hete. I dette tilfellet kunne jeg tenke meg å gjøre tekstfargen blå der hvor bandet "Eiffel 65" står nevnt (i HTML-fila). Da skriver jeg det her:

```
.text {
color: blue;
}
```

I HTML-fila mi må jeg da spesifisere at den setningen skal hente stilendringene fra regelen som heter `.text`:

```
<!doctype html>
<html>
<head>
<link rel="stylesheet" href="style.css">
</head>
<body>
<p class="text">Eiffel 65</p>
</body>
</html>
```

Og voilá! Så har du blå tekst.

---

![[images/IMG_6302.png|notes/images/IMG_6302.png]]
![[images/IMG_6301.png|notes/images/IMG_6301.png]]
![[images/IMG_6299.png|notes/images/IMG_6299.png]]
![[images/IMG_6298.png|notes/images/IMG_6298.png]]
![[images/IMG_6297.png|notes/images/IMG_6297.png]]

> [!Question] Tag vs attribute
> Hva er forskjellen mellom en `style tag`og en `style attribute`? Og når er det du vil bruke den ene framfor den andre?

> [!note] Når bruker du en `h1` tag selector` framfor en `.h1`class selector?
> 
> Når du vil velge alle `h1`-elementene på en side bruker du en tag selector. En «class selector» brukes heller for å definere en spesifikk type stilendring du skal bruke i ny og ne.

## Border

I designverden snakker vi ofte om «stroke» eller «outline». I kodeverden derimot så kalles det «border». Måten du gjør en ramme synlig på er å skrive `solid`, gjerne etterfulgt av antall pixler for å definere hvor tjukk den skal være.

Du kan også gjøre flere stilendringer på en ramme i samma slengen, uten å ha behovet for å separere dem på noen måte, som i dette eksempelet:

`border: solid 3px aquamarine;`

## Forskjellen mellom margin og padding

- Marginer er the space outside an elements border which defines how far it is from another element
- Padding derimot er «the space between the content and the border of an element»
- Padding kan defineres på en forkorta måte hvor du ramser opp ønsket padding på alle fire sidene (topp, høyre, bunn, venstre), i den spesifikke retningen, siden det går med klokka og starter på toppen rundt en firkant. 
	- Når du skriver det forkorta på den måten trenger du ikke definere pixler som måleenhet, men kan heller skrive:

```
h3 {
padding: 4 16 4 16;
}
```

Samme tilnærminga fungerer også med margins:

```
button {
margin: 4 16 4 2;
}
```
