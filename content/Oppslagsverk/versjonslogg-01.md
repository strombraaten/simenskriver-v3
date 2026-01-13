---
date: 2024-03-03
lastmod: 2024-03-07
tags:
  - nyhetsbrev
  - versjonslogg
title: Versjonslogg 0.1
publish: true
slug: versjonslogg01
---

## Endringer siden sist

### Lagt til statistikk

Siden sist har jeg lagt til såkalt *analytics* på sida mi. Det betyr bare at jeg får se hvordan du og andre "bruker" sida mi. Faktisk så kan du se akkurat [den statistikken jeg kan se](https://tinylytics.app/public/CKdyz_jrTvmQLVm2ZY7e), siden den er åpen for alle. I utgangspunktet er oversikten privat, men det føltes mer riktig å være åpen om hva jeg får se.

Tanken er nemlig å samle inn så lite informasjon som mulig, men nok til at jeg kan lære av det. Her kan du se et utdrag:

![[images/tinylytics-dashboard.png]]

25 besøkende på én uke er jo ikke mange akkurat, men siden jeg skriver så muntlig anser jeg det nesten som 25 separate samtaler jeg har hatt. Og når du vinkler det sånn så blir det plutselig kjempemange, på kun en uke.

### Hva jeg vil oppnå med statistikken

Håpet mitt er at jeg skal kunne se hvordan folk navigerer seg på sida. Om det kun er linkene på forsida som blir brukt, eller om folk faktisk klikker seg videre. For det gir meg en indikasjon på hvor tilgjengelig innholdet er, eller ikke.

Det skal være mulig å se, ut i fra hva jeg har sett, og blitt fortalt, men det virker som at den biten fremdeles er under utvikling:

> Referrer and source data, is still in development and at the moment we surface the raw data only.

I tillegg hadde det vært veldig nyttig dersom jeg kunne bruke det for å oppdage hvor jeg har såkalte "døde linker". Altså hvor det er en side som peker deg i retningen av en blindvei.

### Tanken bak valget

Grunnen til at jeg valgte [Tinylytics](https://tinylytics.app/home) er at det rett og slett passer med mine verdier. Det er lagd av én type – [Vincent Ritter, som han heter](https://vincentritter.com/projects/tinylytics). Ved å bruke tjenesten støtter jeg altså sideprosjektet hans. Det betyr også at dersom jeg spør om noe (som jeg gjør) så får jeg også et personlig svar direkte fra han som lager det. Han er altså genuint interessert i å forstå bruksområdet ditt for å lage en bedre tjeneste. I grunn veldig likt som [nyhetsbrevleverandøren jeg bruker](https://buttondown.email/), hvor Justin fra Buttondown svarer på de fleste henvendelsene sjøl på Discorden deres.

Som Vincent sier sjøl så er tinylytics lagd for små nettsider som akkurat en blogg eller sideprosjekt.

> It's easy to use and gives you just the right amount of data, without fuss, whilst keeping things fun

I tillegg til at personvernet blir tatt hensyn til:

> We're GDPR-compliant. We don't set cookies, nor do we store user identifiable information. Always hosted in Europe.

## Usynlig arbeid

Statistikken føles mer som en lansering, men det usynlige arbeidet som egentlig er langt viktigere er vedlikeholdsarbeidet som er gjort.

### Noe gammelt og noe nytt

Jeg har nemlig "retta opp kursen" på linkene som tidligere har ført deg på en blindvei, på følgende sider:
- [[lare-apent|å lære åpent]]
- [[gira-av-obsidian|Hvorfor jeg blir så gira av Obsidian]]
	- Lagt inn bilder som hadde blitt borte
- [[simen-sporsmal|Simen-spørsmål]]
- [[na-sida|nå-sida]]
- [[hvordan-jeg-har-lagd-denne-sida|hvordan jeg har lagd denne sida]]

Om du ikke har hørt meg snakke om [[tk-trikset|tk-trikset]] før så finnes det nå også et eget notat om det, med noen [fun facts fra Thomas Knutstad](https://www.linkedin.com/in/thomasknutstad/).

### Rydda opp i bilder

Kanskje den største jobben jeg har gjort er å rydde opp i gamle filer. Stor takk til [Kjartan](https://www.dovenpels.no/) som hjalp meg med å organisere skjermbildene og skjermopptakene mine [med Eagle](https://eagle.cool/). Det var faktisk utrolig hjelpsomt, for det lar meg organisere bilder på en helt annen måte enn jeg har gjort hittil.

![[images/eagle-tagging.png]]

Om du ikke kjenner til Eagle fra før av er det [definitivt verdt en kikk](https://www.youtube.com/watch?v=z9jxhN7dV-U&pp=ygUJZWFnbGUgYXBw). Det er ikke perfekt, men det fungerer utrolig bra til å organisere alt av bilder/gifer/filmklipp osv. Så lenge du gjør grunnarbeidet med å tægge det riktignok.

![[images/eagle-organisering.png]]

Alt jeg trengte var en 7 timer lang togtur fra Oppdal til Heggedal så var det plenty med tid til å tægge/organisere rundt 800 bilder, i tillegg til å skrive denne versjonsloggen.

## Hva jeg vil gjøre framover

Når jeg har bladd gjennom gamle filer nå så ser jeg at jeg bruker en del GIFer. Ofte for å vise konkret hva jeg liker med en app (som én enkelt funksjon), eller en del av arbeidsflyten min.

De filene blir fort vekk 40-70 mb store, selv om jeg reduserer kvaliteten, i tillegg til at de spiller av automatisk, enten du vil det eller ei. I det lange løp vil nok det gjøre sida mi treigere, siden det er mer informasjon som må lastes ned hos deg. Derfor kommer jeg til å se på muligheten for å laste dem opp som (ikke-oppførte) videofiler på youtube i stedet, og bygge det inn derfra (også kjent som *embedding*).

På den måten kan jeg faktisk *øke* kvaliteten på filene, ikke redusere det, sånn at det blir lettere å se hva som skjer på skjermopptaket. Siden det ofte er relevant å se hvor i menyen jeg trykker for å forstå hvordan du kan gjøre det sjøl. I tillegg vil ikke fila spilles av før du har tatt et aktivt valg om å se den. Som igjen vil gjøre det kjappere å vise innholdet på sida.

### Optimalisering

Om jeg har forstått riktig kan innebygginger fra youtube være treige, og inneholde unødvendig mye greier i den dataoverføringa som skjer. Derfor tenkte jeg å prøve meg på noe som heter "[Lite youtube embed](https://github.com/paulirish/lite-youtube-embed)", som skal være betraktelig kjappere.

### Give credit where credit is due

Både youtube-embedden, og Tinylytics, snubla jeg over ved å lese om [Erlend sine tanker om etikken og prinsippene bak bloggen sin](https://havn.blog/2024/02/20/the-ethics-and.html), som er vel verdt å lese.
