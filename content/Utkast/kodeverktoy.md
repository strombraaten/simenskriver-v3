---
type: utkast
why: think
date: 2024-02-24
lastmod: 2024-02-24
tags:
  - kode
  - apper
title: Verktøyene til en dårlig utvikler
publish: true
slug: kodeverktoy
---

Å lære seg å kode er som å venne seg til en ny kultur. Som når noen fra Frankrike kysser deg på begge kinnene når du kun var innstilt på en enkel klem. 

Du må venne deg til jakten av å finne ut av hva som er feil. Eller i det minste hvordan du kan fikse det. For det er ikke alltid du kommer til å forstå hva som plutselig fungerte.

Dette er en oversikt over verktøy jeg gjerne skulle hatt da jeg begynte å leike meg med koding for et par år tilbake.

> [!important] Ahoi! Nå går du inn i ukjent farvann.
> 
> Her er det tanker som ikke er knadd helt ferdig, men det tåler du vel.

Tenkte jeg skulle fortelle om hvordan jeg har forma min "developer experience" fram til nå, og hva som har hjelpa meg på veien med å bli en dårlig utvikler. For det er en tittel jeg føler meg trygg på å smykke meg med nå. Jeg kan ytterst lite, men nok til å fomle meg fram i blinde og få noe til å fungere uten å vite hva jeg har gjort.

## Editoren – Der arbeidet skjer

Du kan i grunn skrive koden din hvor som helst, uansett om det er på en papirlapp eller i et notatprogram, men dersom du vil få litt hjelp på veien, med å f. eks forstå grammatikken av språket du skriver, hjelper det med dedikert et kodeprogram (også kjent som en *editor*).

### Alternativer

Det er mange alternativer når det kommer til kodeprogram, men de jeg vil trekke fram er det som har dukka opp når jeg har sett på det å lage nettsider. Altså hvordan nettsider ser ut og fungerer. Et sånt program kalles for en IDE – Integrated Development Environment, men det trenger du egentlig ikke å tenke på. Så lenge du veit hva det kalles, dersom du vil dykke dypere.

Personlig bruker jeg [Sublime](https://www.sublimetext.com/). Rett og slett fordi det er kjapt, mulig å tilpasse til mine egne preferanser, og det er lite som forstyrrer deg fra å gjøre det du kom for å gjøre. Det er minimalt med støy i grensesnittet foråsirresånn.

Koster ca en 1000-lapp, men de gir deg faktisk muligheten til å bruke programmet helt gratis, også betaler du bare når du selv vil. Da må du riktignok leve med skammen av å klikke bort en pop-up i ny og ne som oppfordrer deg til å betale for det dersom du har hatt nytte av det. En venn av meg gjorde det her i mer enn 10 år, så du er ikke aleine om du velger å gå den veien.

Underveis har jeg også vurdert VSCode, Nova, Zed, og Cursor, men jeg kom hele tida tilbake til Sublime etterhvert så da prøver jeg heller å slå meg til ro med det. I stedet for å hele tida jakte etter [[neste-nye|den neste nye tingen]]. Om du har kommet i gang med github så har du faktisk [en innebygd editor der over koden din der](https://erl.ing/blogg/github-dev/) (takk til Erling Håmsø for tips).

## Terminalen – der arbeidet *egentlig* skjer

[Warp](https://www.warp.dev/) har jeg nevnt før, blant annet fordi man kan lagre kommandoer til seinere ==TK==, men jeg syns egentlig Erlend ==TK== beskreiv det godt da han sa at "Det er litt Terminal for folk som ikke liker Terminal". Han refererte vel egentlig til Apple sin faktiske terminal-app, men det er vel så beskrivende for terminalen i seg selv.

Før eller seinere må du uansett innom terminalen. Jeg har tidligere kalt den for "Et vindu hvor det føles som om du snakker til selve DNAet av datamaskinen din, uten at du har peiling på hvordan du snakker til et DNA", og det står jeg ved. Derfor er det ekstra nyttig med AI-hjelp, og muligheten til å lagre kommandoer du har funnet fram til tidligere.

## Github - hvor arbeidet lagres

### Github desktop

![[pasted-image-20240224180641.png]]

https://desktop.github.com/

Jeg har også hørt gode ting om [Tower](https://www.git-tower.com/mac).

## Nettleseren – der arbeidet ditt vises

### Øk forståelsen for hva du har gjort

Eller hva du kan gjøre. Med cssPro, eller cssScan.

## Sparring med kunstig intelligens

Når desperasjonen er nær, og frustrasjonen er her, så er gode råd dyre. AI-hjelp derimot er svinbillig! Anbefalingene du får er definitivt ikke 100 % riktige til enhver tid, men det vil du heller ikke få dersom du snakker med en vanlig person. Du kommer derimot mye lengre på vei dersom du går inn i en AI-chat med innstillinga om at du skal jobbe ut et problem i samtaleform. Den vil ikke alltid gi deg det rette svaret på første forsøk, men dersom du fortsetter samtalen (siden den husker hva som har blitt sagt tidligere), og gir den mer relevant info å bearbeide, så vil du få forslag som du kan prøve deg fram med.

Nedenfor kan du se et eksempel hvor jeg spørte AI-chatten i [[raycast|raycast]] om hjelp med å implementere tinylytics på hjemmesida mi. *Tinylytics* gjør det samme som google analytics, bare på en veldig liten skala, med personvern i fokus, og med muligheten for mer menneskelig kontakt.

![[images/Simens-skjermbilder-24-02-2024-kl16.37.jpg]]

## Outline

- Læring
	- Memo
	- Superhi
		- https://www.superhi.com/courses/plan-design-and-code-your-first-website
- Warp
	- God AI-integrering
- Git
	- Om du skal publisere noe, eller få koden til å fungere, eller bare lagre det, så kommer github fort inn i bildet. Github er versjonskontroll
	- Github desktop
		- Merge conflicts
	- Nova
	- GitTower
- AI-hjelp
	- Code co-pilot
		- link TK
- cssPro
	- Det er på ingen måte billig, koster 1800 kr for et år, eller 150 kr i måneden
	- Men det er så laaaangt mer brukervennlig versjon av inspect-panelet i nettleseren, som gjorde det mye morsommere å gjøre direkte endringer på css på ulike sider (inkludert min egen såklart) rett i nettleseren https://csspro.com
		- TK bilde av inspect-panelet

Er nok mest egna for designere og frontend-folk, og ikke de mest hardbarka utviklerne uti der
