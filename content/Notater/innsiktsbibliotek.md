---
type: notat
stage: done
why: share
date: 2023-11-05
lastmod: 2024-04-03
tags:
  - nyhetsbrev
  - design
aliases:
  - innsiktsbibliotek som eksperiment
title: Innsiktsbibliotek
publish: true
slug: innsiktsbibliotek
---
Heisann! I dag står det *innsiktsbibliotek* på menyen. Og det er nok et begrep som er fremmed for flere av dere, så jeg skal straks komme tilbake til *hva* det er.

Først vil jeg bare avsløre hva som er rosinen i pølsa her foråsirresånn – for du kan faktisk [laste ned din egen kopi av et demo-innsiktsbibliotek](https://github.com/varianter/demo-innsiktsbibliotek) jeg har lagd. 

Det er nemlig et eksperiment for å lære om hvordan det kan fungere når du jobber sammen med andre, og skal dele innsikten dere i mellom. Derfor har jeg og en Variant-kollega publisert det på Github, åpent for alle som vil prøve. Hvem veit, kanskje det ikke fungerer i det hele tatt? Men det veit vi ikke før vi prøver.

## Hva er et innsiktsbibliotek

Et innsiktsbibliotek handler om å samle det du veit, det du lærer, og det som kan være relevant, for produktet/tjenesten du lager.

Den siste biten der er viktig, for hvis det ikke er relevant for det dere skal lage så skaper det heller forvirring enn å være til hjelp. Biblioteket blir sånn sett din "*single source of truth*" når det kommer til innsiktsarbeid.

Det kan være noe du lærte i et intervju (med f. eks noen som bruker løsningen du jobber med), en brukertest, en samtale med en ekspert av noe slag, statistikk, eller relevante konklusjoner fra både møter, men også diskusjoner med kollegaer. 

Det meste *kan* lagres i et innsiktsbibliotek, men det burde ha en relevanse for arbeidet som skal gjøres framover. At det kan være relevant å trekke fram det samme arbeidet seinere for å jobbe videre med noe annet. For det er ikke bare snakk om å lagre konklusjonene, men også "råmaterialet". Om du jobber med kollektiv transport f. eks så er det mye innsikt som vil være vel så nyttig 2-3 år fram i tid. Som de overordnede reisevanene til ulike brukergrupper. Eller hvordan det er for blinde folk å navigere gjennom appen din med VoiceOver på en trafikkert gate, eller hvordan de planlegger reisene sine i forkant. 

Spesielt i intervjuer og brukertester lærer vi ofte ting og tang som er kjempespennende, men som ikke er relevant for de spørsmålene vi trengte svar på i den perioden. Det blir heller "sekundærinformasjon", som ofte er det første som fjernes i en oppsummerende rapport, hvis du ser behovet for å korte ned mengden (for å senke terskelen for å lese gjennom hele). Den sekundærinformasjonen kan derimot være kjempenyttig noen måneder seinere. Du veit det bare ikke ennå.

## Tilbake til demo-biblioteket

Om du lager din egen kopi av demo-innsiktsbiblioteket vil du se noe sånt som bildet under:

![[images/Simens-skjermbilder-05-11-2023-kl07.59.png]]

Om du kikker nærmere på navnene på notatene på venstre side vil du se at jeg har fokusert på rammene rundt innsiktsbiblioteket for øyeblikket. Altså hva som må være på plass for at det skal kunne brukes for nøyaktig detta formålet. I tillegg til grunnleggende opplæring av å bruke Obsidian for nybegynnere. Hittil har det da gått på bekostning av å lage fiktiv innsikt, eller "demo-data", som f. eks "*Saksbehandlere har et stort behov for å sortere etter status på oppgavene sine*"

Det her er altså kun en start, selv om jeg skjønner at det kan være forvirrende. For i et mer reelt tilfelle burde jeg heller løfta fram ting som:
- Eksempler på hva vi har lært, som spesifikke funn som jeg nevnte over
- En oversikt over ulike rapporter
- Hvilke innsiktsarbeid som jobbes med for øyeblikket
- En landingsside som introduserer hvordan innsiktsbiblioteket kan brukes, og hvem som er ansvarlig for å "drifte det"

I løpet av tida som kommer skal jeg prøve å lage mer fiktiv innsikt, og strukturere det annerledes, sånn at det vil være mer realistisk for en faktisk arbeidssituasjon.

### Kunstig intelligens i sitt rette element

Det å lage fiktive samtaler, tester, funn og rapporter er forøvrig en ypperlig situasjon å bruke kunstig intelligens i. For da slipper jeg jo å finne på en samtale mellom to personer. Jeg har lagd ett eksempel hittil, hvor jeg illustrerte hvordan [Atomic UX Research-modellen](https://blog.prototypr.io/what-is-atomic-research-e5d9fbc1285c) fungerer. Da lagde jeg et AI-generert intervju mellom en UX-designer og en saksbehandler. Det gjør det jo superenkelt for meg å plukke ut fakta fra samtalen, definere innsikt basert på hva vi lærte, og skrive noen hypotetiske forslag/anbefalinger til hva man kunne gjort videre.

![[images/Simens-skjermbilder-05-11-2023-kl08.01.png]]

Her kan du se instruksene jeg gav til [Raycast AI](https://www.raycast.com/ai) (mitt valg av kunstig intelligens-chat):

```
Du er en UX-designer som holder på å lage et saksbehandlersystem. Det du skal skrive er samtalen som utspiller seg mellom deg som intervjuer, og en saksbehandler som skal bruke systemet du lager. Formuler det som et intervju, i en muntlig situasjon, men teksten skal ikke være lengre enn 750 tegn. Ikke si at du er en ux-designer, bare hopp rett til saken.
```

## Hvilke kriterier er viktig for et innsiktsbibliotek?

Gående framover så er det noen ting jeg gjerne vil finne ut av. Nemlig hvilke kriterier som er viktig for et innsiktsbibliotek. Hva er det vi må tilrettelegge for? Hva må man kunne gjøre, og skal det tilrettelegges for folk med ulike roller?

Som et utgangspunkt har jeg sparra med noen kollegaer om hvilke prinsipper vi burde ha i bakhodet for å få dette eksperimentet til å funke.

### Prinsippene for å lykkes

- Definere hva det skal være, og hva det ikke skal være
- Gjøre det så enkelt som mulig
	- Dette er kanskje den viktigste, og gjelder både for de som skal bruke det, men også med tanke på hvordan det settes sammen. For øyeblikket er det inkludert noen utvidelser/plugins som vi kanskje kan få bruk for, men som potensielt øker kompleksiteten, og gjør det vanskeligere å forstå. Da blir det viktig å vurdere hva som er viktigst.
- Kunne dele opp innhold etter temaer
- Muligheten for å lage "dashboard"-visninger til interessenter som ikke nødvendigvis skal jobbe med innholdet, men som vil holde seg informert
- Å kunne jobbe med det samme materiale, men i ulike visninger
- Sporbarhet
	- Spesielt dersom du trekker en setning ut fra konteksten sin så er det viktig å kunne spore det tilbake til kilden

### Skille mellom innsikt og dokumentasjon

En ting jeg ikke blir helt klok på er hvor grensa går mellom innsikt som bør lagres, og generell dokumentasjon. Formulert på en annen måte – hva er det som *ikke* burde være i et innsiktsbibliotek?

Det kan nok variere ut fra hvordan man velger å definere et innsiktsbibliotek, men som et utgangspunkt kan vi forholde vårs til det jeg sa tidligere:

> Et innsiktsbibliotek handler om å samle det du veit, det du lærer, og det som kan være relevant, for produktet/tjenesten du lager.
 
Skal du ta notater fra en brukertest der? Eller bare lagre konklusjonene dine? Skal det være en "decision log" for å kunne vise en historikk over hvilke avgjørelser som påvirka prosessen av å lage noe? Eller ikke? 
  
Er det relevant å ha møtenotater der, siden det ofte kan føre til avgjørelser som er viktig å vite om til seinere?

Jeg har mange spørsmål, men vil gjerne definere svarene sammen.

## Hvem det er relevant for

I utgangspunktet har jeg tenkt at det er relevant for designere som meg sjøl, men jeg er dønn sikker på at jeg tar feil her, så gjerne nevn noen roller eller situasjoner hvor du ser relevansen for noe lignende. 

Jeg veit at det kan være relevant for både utviklere og folk oppi ledelsen som har mer beslutningsmakt (stakeholders/interessenter av noe slag), som et grunnlag for å ta bedre avgjørelser, men jeg er usikker på hvordan de ville brukt det.

## Hvordan kan du delta

Det enkleste er bare å komme med dine innspill. Enten ved å svare direkte på denne eposten, eller ved å diskutere det mer åpent med meg og de ni andre som er med i [Discord-gruppa mi](https://discord.gg/f2ZrnPVbYC).

Om du vil utforske i større grad så kan du [se innsiktsbiblioteket på Github](https://github.com/varianter/demo-innsiktsbibliotek). Ja, til og med du.

Der kan du lage din egen kopi av innholdet, innstillingene, og oppsettet, som jeg har gjort klart. På den måten kan du også være med å forme det framover, ved å bidra med å gjøre endringer, endre på innhold. Hjelpe med å lage fiktiv innsikt, og generelt lage rammene for hva som trengs for å lage en god demo av et innsiktsbibliotek.

Både for at det skal være lettere å kunne introdusere en lavterskels-løsning ute hos kundene vi jobber med, men også for å lære mer om hvordan vi kan organisere innsikten vi jobber med.

### Hvordan laster du ned din egen kopi?

For å senke terskelen har jeg lagd et par steg-for-steg-filmer til deg. 

#### Hvordan du kommer i gang

<lite-youtube videoid="aO0mAaitUZ4" playlabel="Play: Hvordan du kommer i gang med innsiktsbiblioteket i Obsidian"></lite-youtube>

#### Hvordan du deler endringene med andre

<lite-youtube videoid="DMUQbV-RSRI" playlabel="Play: Hvordan du gjør endringer i innsiktsbiblioteket"></lite-youtube>

### Bonus

Om du laster ned din egen kopi så husk å skriv deg opp i gjesteboka! 👋

![[images/Simens-skjermbilder-05-11-2023-kl21.54.png]]
