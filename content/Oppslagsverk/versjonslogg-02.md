---
type: oppslagsverk
why: keep
date: 2024-03-10
lastmod: 2024-03-11
tags: 
aliases:
  - versjonslogg 0.2
title: Versjonslogg 0.2
publish: true
slug: versjonslogg-02
---

# Versjonslogg 0.2

Jeg fortsetter å [[folg-nysgjerrigheten|følge nysgjerrigheten]], og varter opp med en ny [[versjonslogg]]. Her dokumenterer jeg endringene jeg gjør på simenskriver.no, og ikke minst hva jeg lærer meg underveis.

## Endringer siden sist

### Nytt innhold

Både lagd og lasta opp nye skjermopptak for å illustrere [[den-ene-funksjonen|den ene funksjonen]]. Fra et teknisk ståsted førte det faktisk til at jeg gikk fra å ha en gif på 40mb til en videofil på 425 kb. Det betyr at fila blei nesten 100 ganger mindre enn opprinnelig 🤯 Det hadde jeg virkelig ikke trodd altså. Samtidig som kvaliteten er høyere, og avspilleren ser ganske så snasen ut, spør du meg.

![[images/video-avspiller.png]]

I tillegg har jeg lagt ut en kladd hvor jeg snakker om [[kodeverktoy|verktøyene til en dårlig utvikler]] (nemlig meg sjøl). Begynt å skrive om det å [[senke-terskelen-for-publisering|senke terskelen for å publisere]], og samla noen kjappe tanker rundt [[rabatt|mitt syn på rabattkoder]].

### Gjort det lettere å utforske

Jeg veit jo at jeg har nærmere 100 notater på simenskriver.no, men du veit kanskje ikke det? Og det er du nok ikke aleine om. For sida er jo ment til å "bjuda på en oppdagelsestur" foråsirresånn, som en linkesafari på Wikipedia. Hittil derimot har det vært få ruter som trekker deg inn. 

![[images/landingsside-før.png]]

Derfor har jeg lista opp de kategoriene jeg skriver oftest om, inkludert et par eksempler fra hver, som kan være gode steder å starte.

![[images/landingsside-etter.png]]

> [!tip] Tilbakemelding ønskes
> Hvordan navigerer du deg på rundt på simenskriver-sida?
> 
> 1. Trykker du utelukkende fra én link til en annen?
> 2. Bruker du den [[grafen|den interaktive grafen]]?
> 3. Bruker du søkefeltet, også for å finne notater du ikke visste om fra før?
>
>Om du sender inn et svar til `strombraaten@gmail.com` eller [på discord](https://discord.gg/f2ZrnPVbYC) skal du få en nøye utvalgt gif som takk.

## Usynlig arbeid

### Fiksa linker

- [[barekraftig-webutvikling|Bærekraftig webutvikling]]
- [[klisterhjerne|Klisterhjerne]]
- [[neste-nye|Den neste nye tingen]]
	- Lasta opp bilder som hadde blitt borte vekk
- [[stegene-av-et-notat|De ulike stegene av et notat]]
- [[mer-tid|Hadde jeg hatt mer tid skulle jeg skrivi en kortere artikkel]]
- [[blogging-som-konsept|Det er noe feil med blogging som konsept]]
- [[digital-minimalisme|Digital minimalisme]]
- [[digital-hage|Digitalt hagearbeid]]
- [[zettelkasten|zettelkasten]]
- [[ett-formal|Ett formål om gangen]]
- [[skrive-mer-om|hva vil du at jeg skal skrive mer om]]
- [[Hva i huleste er CODE og PARA|Hva i huleste er CODE og PARA]]

### Ødelagt linker

Til tross for så mye fiksing så er det overraskende få notater som er tilgjengelige nå, eller som *faktisk* fungerer. Det er på grunn av *slugs*. Og at jeg misforstod hvordan det funka med [[github-publisher|Github Publisher]]-pluginen til [[obsidian]] 🤦‍♂️

## Slugs

Slugs er den siste delen av enhver link, eller URL. Som Abby Covert sier i [en herlig artikkel, kalt "Hyperlink hygiene"](https://abbycovert.com/writing/hyperlink-hygiene/):

> It is the part of the URL that is meant to represent the *place* that content *lives*

Hun eksemplifiserer det med bildet under:

![[images/Domain-Directory-Slug.png]]

I praksis vil det være "stoisisme"-ordet i `https://snl.no/stoisisme`, eller "mer-tid" i `https://simenskriver.no/mer-tid`. Jeg tok nemlig et realt skippertak en kveld i forrige uke, og definerte nye slugs på *alt* jeg har skrivi. Nå derimot ser jeg at det er mange, *mange* av notatene mine som bare leder til en blindvei (en såkalt 404-side), eller at de ikke dukker opp i det hele tatt. Ser ut som det skyldes at slugen og filnavnet må være det samme, sånn som jeg har satt opp ting nå. Så det skal jeg få fiksa opp i.

## Fokuset framover

### Liste over publiserte notater

For å vise at det faktisk er mye som oppdateres på en ukentlig basis vurderer jeg å legge inn en dynamisk liste på forsida. Når jeg sier dynamisk mener jeg bare at jeg ikke må skrive det inn manuelt hver gang jeg gjør en endring, men at systemet lister det opp der så fort det dukker opp en ny fil.

Her er det to ulike måter jeg vurderer – enten å kun vise de siste 5-10 notatene som er oppdatert, eller liste opp absolutt alle notatene som finnes (rundt 100 stk). Sistnevnte vil gjøre det lettere å oppdage ting du ikke visste at fantes, men vil i gjengjeld gjøre sida mye lengre. Som ikke trenger å være noe negativt.

### Hvordan linkene ser ut

Utover det har jeg prøvd å endre utseendet på linkene i det siste. Det er mye prøving-og-feiling for å finne det rette "elementet". Siden jeg jobber videre med noen andres kode så må jeg sette meg inn i hva som er hva, og det er ikke alltid like logisk. På bildet under kan du f. eks se at "logoen", eller skrifta som sier "Simen skriver" øverst til venstre, tilsynelatende forsvant da jeg prøvde å endre de interne, gule linkene. Jeg aner ikke hvorfor, men det vil jeg dykke dypere i.

![[images/simenskriver-linker-test.png]]

Jeg liker skikkelig godt [hvordan linkene til Maggie Delano ser ut](https://www.maggiedelano.com/garden/), så jeg prøver å gjøre noe lignende.

![[images/inspirasjon-linker.png]]

Fant ut at det var utrolig kjekt å bruke [Codepen for å "lagre" sånne småting](https://codepen.io/strombraaten/pen/jORqyde) som jeg vil prøve å implementere seinere. I sammenheng med [CSS Pro](https://csspro.com/) så går det kjapt som bare det å gå fra "Oi! Det var kult!" til å lagre det på Codepen.

Sakte, men sikkert begynner jeg faktisk å få litt dreisen på kodinga nå. Jeg er iallefall mindre dårlig nå enn det jeg var for et par uker tilbake!
