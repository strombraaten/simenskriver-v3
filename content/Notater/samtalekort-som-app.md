---
type: notat
date: 2024-05-05
lastmod: 2024-05-05
tags:
  - nyhetsbrev
  - design
  - kode
title: Samtalekort som app
publish: true
slug: samtalekort-som-app
description: Når terskelen er så høy for å printe opp flere kort, hvorfor ikke bare lære seg å lage en app?
---
Er du klar for det her? For dette kommer til å eskalere fort. Eller. Så fort som du klarer å lese, eller skumme gjennom innholdet, men mot slutten skal du få se noe temmelig kult 🤓

## Bakgrunn

For en 7-8 år siden lagde jeg, og [min hyggete kollega Hallvar](https://www.buggejohnsen.no/), et produkt som heter Samtalekort. En liten boks med 25 spørsmål, som du fint kan ha i lomma, i veska, eller i sekken, så du alltid er klar for å ta en samtale til et nytt nivå. Om du befinner deg i en knipe av en samtale kan du alltids snu det til noe spennende ved å stille et spørsmål som f. eks "Kan du huske noe som du syns var skummelt i øyeblikket, men som du er glad du gjorde?".

![[images/samtalekort.jpg]]

Sosialt sett kan det høres ut som en rar ting å gjøre, nettopp å trekke fram en pakke med kort dersom praten plutselig går trått. Så det krever såklart litt innpakking. Personlig pleier jeg å vinkle det inn på denne måten:

> Du, nå kom jeg på en ting. Det blir vel fort vekk en digresjon, for det har vel egentlig ikke så mye å gjøre med det vi nettopp snakka om, men det hadde vært interessant å få din vinkling på det.
> 
> For jeg snakka med noen nå nylig om erfaringer som virker skumle i øyeblikket, men som du er glad for at du gjorde, når du ser tilbake på det. Kan du komme på et eller flere sånne øyeblikk for din del?

### Digresjon

Om det her er første gang du hører om samtalekorta er det fullt mulig å kjøpe en pakke samtalekort altså. Bare send meg en mail på `strombraaten@gmail.com` eller en melding på `99458511` så finner vi ut av frakt og vippsing derfra.

Men! Det var ikke poenget. Jeg skulle snakke om utfordringa med samtalekorta i sin nåværende form.

## Utfordringa

Utfordringa er at når du har vært gjennom de 25 spørsmåla er det ikke like fristende å bruke dem igjen og igjen, og igjen. Det er absolutt interessant å stille spørsmåla til nye folk, for å se hva de ville svart, men etterhvert blir det ønskelig med noe nytt.

Terskelen er altså *høy* for å sette i gang en ny produksjonsrunde, bare for kunne å gi ut flere spørsmål.

Designet kan for all del gjenbrukes, og sånn sett er det bare å levere nye spørsmål til trykk, men det stopper jo ikke der. For spørsmåla må puttes inn i esken, og esken i seg sjøl må brettes og limes, og består av to ulike deler (som en fyrstikkeske), og knyttes sammen med et klistremerke. Det er altså en omfattende jobb med å montere det.

I tillegg til at det er viktig for meg at det ikke ser slurvete ut. Når jeg først gjør noe vil jeg ikke at det skal være halvhjerta, men heller "helhjerta". Det betyr at en ny produksjonsrunde innebærer også en kvalitetssjekk av hver eneste pakke, hvor jeg da må se etter:
1. Er klistremerket skeivt plassert på esken? Er det midtstilt?
2. Er det noen feil i selve trykkjobben? Har blekket "blødd" noen steder? Har arket blitt "flisete" etter kniven som har avrunda hjørnene?
3. Er esken *for* stram i hylsteret, eller sklir det inn og ut på en ønskelig måte?

Både trykkinga, og monteringa er noe som kan gjennomføres av andre, men selve kommunikasjonen med de ulike partene, logistikken det medfører, og ikke minst kvalitetssjekkinga – å vurdere hva som er godt nok, og ikke – det arbeidet faller i så fall på meg. Med mindre jeg lærer opp noen andre til å stille samme krav som meg. Alt i alt utgjør det en høy terskel for å oppdatere Samtalekorta med nye spørsmål.

Da hadde det vært lettere med en app som jeg kunne oppdatere med nye spørsmål i ny og ne. Spørsmålet da er heller – hvordan lager jeg en app?

## Hvordan lager jeg en app?

Når du skal lage en mobil-app havner du umiddelbart på spørsmålet – native eller ikke-native? For iOS har sitt "native"-språk som heter Swift. Mens Android har Kotlin og Java, som sitt native-språk.

Nå er jeg ute på tynn is, men når vi snakker om at et kodespråk er "native" for en plattform, betyr det at språket er spesiallagd og støttet direkte av den plattformleverandøren det gjelder. Språk som React Native og Flutter er derimot "plattformuavhengige rammeverk", som det kalles, som da vil fungere på både iPhone og Android, men som legger et mellomlag mellom koden din og plattformens native kode. Hvis jeg har forstått riktig så kan det mellomlaget gå utover ytelsen og tilgangen til plattformens funksjoner, sammenligna med native kode.

Jeg skal ikke gå dypt på forskjellene her, for jeg kan ærlig talt ikke nok om det. Men underveis hørte jeg med noen kollegaer av meg, som alle hadde gode argumenter for hvorfor jeg burde velge det ene eller andre.

Jeg liker såklart tanken av å slå to fluer i en smekk, altså gjøre appen tilgjengelig for både iPhone- og Android-folk, som man oppnår ved å skrive det i Flutter eller React Native. Og jeg utforska begge de mulighetene (litt iallefall), men jeg har et veldig tynt kunnskapsgrunnlag å bygge videre på. Noen er kjent med React fra tidligere nettside-prosjekter, men for meg virka alt fremmed uansett. Derfor var det en kommentar fra Mikael som festa seg hos meg:

> For noen uten veldig mye kodeerfaring tror jeg faktisk Swift UI og verktøyene som kommer med der er ganske bra. Gitt at en vil fokusere på iOS. Godt språk, dedikerte komponenter som gjør at det ser iOS ut med en gang.

Det er godt mulig jeg plutselig endrer kurs, men for øyeblikket prøver jeg å lære meg Swift, som da er Apple sitt native-språk for iPhone.

### Fordeler jeg har merka meg

Enn så lenge er det noen fordeler som jeg har merka meg:
1. Du kan jobbe mer visuelt om du vil, ved å "drag-and-droppe" inn de ulike elementene du trenger, også får du se koden de er bygd opp av. Som er en litt annerledes tilnærming for å lære seg grammatikken, eller syntaksen til kodespråket.
2. Du har et lett-tilgjengelig bibliotek av elementer, hvor selve dokumentasjonen er bygd inn i programmet du bruker (som en nybegynner for meg er det digg å slippe å søke opp absolutt alt, men å heller få det servert i konteksten av selve arbeidet)
3. Det finnes gode læringsressurser

![[images/Simens-skjermbilder-01-05-2024-kl07.40.png]]

## Hva skal appen gjøre

For å forstå hva jeg ville oppnå har jeg begynt å lage noen lister for funksjonaliteten jeg ser for meg.

### Funksjonalitet

#### Må ha

- En samling med spørsmål
- Mulighet til å navigere seg fra et spørsmål til et annet

#### Vil gjerne ha

- Offline-tilgang til alle spørsmålene, uten å være avhengig av internett for å vise spørsmålene
- Hjelp til å stille gode oppfølgingsspørsmål, eller introdusere spørsmålet til å starte med

#### Kan ha

- Mulighet til å lagre/spare på de spørsmålene du liker best?
- En listevisning over dine favorittspørsmål?
- En intro-skjerm til Samtalekort?
- Dele spørsmål med andre?
- Aktivere offline/flymodus som et eget "samtalemodus"? Trigge en snarvei som setter på ikke-forstyrr?
- Lys og mørk modus

### Spørsmål jeg har

#### Lagring av data

I hvor stor grad trenger jeg å tenke på databaser? Og må det være eksternt, eller kan spørsmålene lagres lokalt på telefonen til sluttbrukeren, som en del av appen man laster ned?

Hvis jeg kun skal lagre spørsmål, altså bare tekst, er det egentlig behov for å sette meg inn i hvordan jeg knytter det til en database? Jeg kjenner såvidt til [Firebase](https://firebase.google.com/) og [Supabase](https://supabase.com/), men det øker jo fort kompleksiteten hvis jeg må dykke ned i det der og.

#### Omfanget av arbeidet

Hvordan kan jeg snevre inn omfanget for å gjøre det lettest mulig for meg sjøl? Sagt på en annen måte: Hva slags funksjonalitet burde jeg vente med for å ikke gjøre det unødvendig komplekst til å starte med?

#### Offline

Offline-fokuset er viktig for meg. Nettopp fordi den fysiske og taktile egenskap med korta flytter oppmerksomheten din *vekk* fra telefonen. Vekk fra alle distraksjoner som kan dukke opp.

Om du skal kunne lese spørsmåla på telefonen burde jeg også legge til rette for å unngå distraksjoner, så langt det lar seg gjøre.

Spørsmålet mitt da handler egentlig om hvorfor trenger en app tilgang til internett i det hele tatt? Hva slags handlinger er det som krever det?

Spotify f. Eks er avhengig av å laste inn sanger som ikke er lokalt lagra på din telefon. Notat-appen din derimot har sannsynligvis lagra notatene dine lokalt, men synkroniserer det med skyen (og sørger dermed for at du har en backup) når du er på nett igjen.

Men er det noe spesielt man må tenke over, når man vil tilrettelegge for en app som funker vel så bra *uten* tilgang til internett som med? 

Når du først har lasta ned en app (fra app store) så vil den vel "by default" være tilgjengelig offline. Derimot så antar jeg at det kan bli behov for å sikkerhetskopiere valgene man har tatt. Som f. eks hvis du har lagra dine favorittspørsmål. Da er jo det informasjon som lagres i appen, men for å sørge for at du ikke mister din liste, i tilfelle noe skulle skje, så bør man kanskje lagre en backup i skyen? 

### Begrensninger

Jeg har lyst til å bruke dette som en måte å lære meg mer om bærekraftig app-utvikling, og hva det kan være. Derfor vil jeg legge noen begrensninger på meg sjøl, som f. eks:
- Prøve å unngå bruk av bilder eller film, for å redusere den totale filstørrelsen
	- Dette kan påvirke behovet for ikoner i grensesnittet, så jeg må vurdere hvor kantete jeg skal være her
- Fokusere hovedsakelig på tekst og grafikk som "produseres" gjennom koden
- Offline-tilgjengeligheten vil nok også være en begrensning, men det kan hende det blir et framtidig mål, avhengig av hva jeg finner ut om arbeidsmengde for å få det til på en god måte

## En liten start

Når du holder korta i handa blir det fort en liten "vifte", hvor flere kort ligger over hverandre. En mulig tilnærming er å gjenskape det digitalt, sånn at jeg kan spille videre på en naturlig måte å bytte kort på. Nettopp ved å bruke scrolle-bevegelsen med tommelen for å flytte det øverste kortet bakerst i bunken.

![[images/samtalekort-prototype.jpg]]

Nå skal det sies at ulempa med å vise en kladd fra Figma er at det fort ser laaangt mer "ferdig" ut enn det egentlig er. Så du får ta det her med en solid klype salt.

Riktignok så *tror* jeg at jeg skulle klart å gjenskape designet i Swift nå, fra et visuelt ståsted, men jeg har ikke lært meg nok ennå til å vite hvordan jeg navigerer fra ett skjermbilde til et annet 😅

![[images/samtalekort-prototype-ios.jpg]]

Dette er en av flere tilnærminger jeg kunne tenke meg å utforske.

### Interaksjonen

Tanken er at du kan trykke på et kort for å få opp den "detaljerte visninga", som også kan gi merverdi (sammenligna med de fysiske korta) i form av oppfølgingsspørsmål, i tillegg til hjelp med å introdusere spørsmålet. Om du vil teste en enkel prototype av det kan du [sjekke ut den linken her](https://www.figma.com/proto/2OqSMKidAdyAwswRnl81u5/Samtalekort?page-id=0%3A1&type=design&node-id=1-59&viewport=-187%2C-529%2C0.47&t=6o4hnrb6zAPkoTCY-1&scaling=scale-down&starting-point-node-id=1%3A59&mode=design), som da åpner Figma i nettleseren din.

Interaksjonen med kortstokken kunne i teorien vært noe a'la det [Anton Kosarchyn](https://dribbble.com/akosarch) har lagd her:

![[images/cards.gif]]

Alternativt kunne jeg gjort noe mer Tinder-lignende, som [dette eksempelet fra Sam Atmore:](https://dribbble.com/shots/4856441-Movie-Browsing-Experience)

![[images/cards-gestures.gif]]

### Tilbake til virkeligheten

Nå drømmer jeg såklart. Først vil jeg se om jeg kan lære meg det som trengs for å få den grunnleggende "må ha"-funksjonaliteten på plass.

Om det var noen av spørsmålene ovenfor som du kan hjelpe meg med å forstå bedre så hadde jeg satt veldig pris på en forklaring. Alt det her er nytt for meg, så alle råd tas i mot med takk og digitale high-fives 👋

## Bonus

### Læringsressurser for å lage iPhone-apper

1. [E-bøkene til Mark Moeykens](https://www.bigmountainstudio.com/free-swiftui-book) som viser skjermbilder av koden, med forklaringer og illustrasjoner av alt du trenger å vite er gull verdt!
2. Kursene til [Chris Ching (Code with Chris)](https://www.bigmountainstudio.com/view/courses/8-day-app/1231155-build-an-app-in-8-days/3750515-day-3-level-up-your-ui-building-skills) er pedagogisk lagt opp, og forbausende lett å følge med på, selv for nybegynnere
