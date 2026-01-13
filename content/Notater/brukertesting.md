---
type: notat
stage: done
why: share
date: 2021-01-17
lastmod: 2021-01-17
tags:
  - design
aliases:
  - Fortløpende brukertesting, og verdien av det
  - verdien av fortløpende brukertesting
title: Fortløpende brukertesting, og verdien av det
publish: true
slug: brukertesting
description: Brukertesting er en av de tingene som du gjerne vil gjøre, men som er lett å nedprioritere fordi du kaaan jo fortsette uten. Men hvordan skal du kunne lage en tjeneste uten å forstå utgangspunktet til de som skal bruke den?
---
> [!NOTE] Denne artikkelserien ble [først publisert på variantbloggen](https://blog.variant.no/del-1-fortl%C3%B8pende-brukertesting-og-verdien-av-det-fdabb3594bc3)

![[images/Pasted image 20240428105010.png]]

Brukertesting er en av de tingene som du gjerne vil gjøre, men som er lett å nedprioritere fordi du kaaan jo fortsette uten. Spesielt om det er lite tid tilgjengelig i budsjettet, da er brukertestene ofte noe av det første som kuttes. For sånn teknisk sett er du ikke helt **avhengig** av inputen fra de som skal bruke tjenesten, for å kunne lage den. Men bare å skrive den setningen føles jo feil. For hvordan skal du kunne lage en tjeneste uten å forstå utgangspunktet til de som skal bruke den?

# Del 1: Fortløpende brukertesting, og verdien av det

Med det som grunnlag vil jeg invitere deg til et aldri så lite dypdykk i brukertesting som verktøy. Her er det mange godbiter å ta tak i, og derfor blir dette en serie med innlegg hvor vi ser på ulike deler av brukertesting. I tillegg til hvordan fortløpende, eller kontinuerlig brukertesting, passer inn i prosessen av å utvikle et produkt eller tjeneste.

I Variant har vi nemlig en hypotese om at du kan skape mer verdi ved å ha fortløpende brukertester gjennom utviklingen av et produkt. Enkelt og greit.

## Bakgrunn

For å gi deg litt kjøtt på beinet vil jeg trekke fram noe som [Kristin skriver om i “Vår variant av produktutvikling”](https://medium.com/variant-as/produktutvikling-i-variant-bfa01d475ad2):

> Vi har funnet inspirasjon og læring fra Lean UX, som kombinerer Lean Startup, Design thinking og smidig utvikling. Lean Startup bruker prinsipper fra Lean ved å rette fokus på å redusere overflødige elementer, redusere barrierer og overleveringer, samt **kontinuerlig forbedring ved hjelp av eksperimentering, måling og læring.** Design thinking støtter seg på empati, **samarbeid, utprøving og iterasjoner som kjernen i problemløsing.** Smidig utvikling sørger for å **korte ned utviklingssyklusene, levere verdi og lære i en kontinuerlig prosess.**

Hvorfor trekker jeg fram akkurat de orda? Jo, fordi ved å lage noe, teste det, gjøre endringer basert på tilbakemeldingen, for så å teste på nytt og iterere videre, så rører vi ved mange av de verdiene.

De ordene eksemplifiserer rett og slett rollen som fortløpende brukertesting har i moderne produktutvikling. Fancy ord det der — “eksemplifisere”, men det gjør virkelig det.

For om du tester det du har, uferdig og rått som det enn måtte være, så får du **eksperimentert** og **samarbeida** med potensielle brukere. Det du sitter igjen med er erfaringsbasert **læring** som staker ut veien videre. Fram til du tester på nytt igjen. På den måten **korter du ned utviklingssyklusene**, og tjenesten dere lager vil henge mer på greip med det som brukeren faktisk trenger. Ergo du **skaper mer verdi**.

Tiltakene som kommer ut av hver brukertest vil også være målbare i form av “i hvor stor grad har vi tatt hensyn til tilbakemeldingene fra brukertestene?”.

Empatien kommer ved at du får innblikk i en annen persons situasjon, og en større forståelse for hvilke utfordringer, og ønsker de kan ha. I tillegg blir produktutviklinga mer personlig, siden brukeren din plutselig har et navn og et ansikt, i stedet for å være en slags oppsummert persona. Det tror jeg også vil være en effekt som vi ikke skal ta for gitt, siden det kan lede til økt indre motivasjon hos hver enkelt som observerer brukertestene.

![[images/Pasted image 20240428104430.png]]

# Del 2: Fortløpende brukertesting fra brukerens ståsted

I denne delen skal vi ta en kikk på noe av det viktigste, nemlig fortløpende brukertesting fra ståstedet til brukeren sjæl.

![](https://miro.medium.com/v2/resize:fit:1400/1*o6gtwck60P-pjDV-L8tGAQ.jpeg)

Spør du meg så hadde denne serien mangla noe dersom det ikke var en faktisk bruker involvert. Noen som har deltatt på flere brukertester tidligere. Derfor tok jeg kontakt med [Blindeforbundet](https://www.blindeforbundet.no/), som jeg har testa med før. Og videre førte kontakten til Arild Øyan. En supertrivelig type som jobber på [Trondheim Voksenopplæring-senter](https://www.knowit.no/), hvor han lærer blinde elever hvordan de kan bruke teknologi til å komme seg i gang igjen ved synstap.

Arild er selv blind, og har vært med på en rekke brukertester. Blant annet i utviklingen av den nye AtB-appen, som [Variant](https://www.variant.no/) gjør sammen med [Kantega](https://www.kantega.no/) og med støtte fra [KnowIt](https://www.knowit.no/).

## Ta tilbakemeldingene på alvor

Først, la oss se på det her fra brukerens perspektiv:

Du kommer inn på et sted du sannsynligvis ikke har vært før, i det som for mange vil være en fremmed situasjon. Sannsynligvis blir du også bedt om å skrive under på et samtykkeskjema i forkant. Hittil er selve formatet i grunnen ganske så formelt, uavhengig av hvor joviale designeren eller utvikleren er.

Deretter får du beskjed om at det er tjenesten som testes, ikke deg personlig. Og det er flott det, det er absolutt noe som bør nevnes, men sjansen er overhengende stor for at du blir frustrert når det er noe du ikke får til. Det er jo bare menneskelig å ville prestere, og mestre noe. Du har lyst til å kunne løse oppgava du har fått tildelt, helst uten hjelp. Spesielt når det er folk som ser på.

Etter en times tid får du en takk for at du stilte opp, og kanskje et gavekort om du er heldig, men etter det så er det stille. Da er jobben din gjort, og sjansen er stor for at du ikke hører noe mer om tjenesten du har testa etter det.

Som fasilitatorer er det viktig at vi anerkjenner at disse menneskene gjør oss en skikkelig tjeneste ved å stille opp. Derfor er det også viktig at forbedringspotensialet som oppdages under testene er noe som prioriteres i arbeidet framover.

Det er altfor lett å la brukertester bli noe som kun prioriteres helt mot slutten av et prosjekt, og at funnene dermed ender opp i en liste over forbedringer, som igjen havner i en back-log som blir liggende til du “får ledig tid”. Ikke bare hindrer det produktet i oppnå sitt potensiale, men er det ikke også litt respektløst ovenfor de som har tatt seg tid til å delta på testene og komme med feedback?

Da jeg spørte Arild om hva han selv forventer fra en brukertest, svarte han enkelt og greit,

> “At de som inviterer meg tar tilbakemeldingene mine på alvor. For du kan teste (en tjeneste eller løsning) og si at det her er ikke bra, og her kan man finne en bedre løsning, men så skjer det ingenting. Da er min rolle bortkasta.”

### To ulike verdener

Men hva er det vi egentlig vil oppnå med en brukertest? Jo, vi vil få en bedre forståelse av brukerens verden, og hvordan tjenesten vi utvikler passer inn der. Rett og slett danne oss et bilde av hvordan de opplever tjenesten. Når det kommer til universell utforming blir det satt ekstra på spissen. Da kan den faktiske brukeropplevelsen være veldig annerledes enn det som var den opprinnelige tanken.

Sammen med designere fra Brønnøysundregistrene har jeg vært med på brukertester med Blindeforbundet tidligere, og da var det mange kommentarer som virkelig satte seg, som gav meg en aha-opplevelsen. Én kommentar jeg husker spesielt godt kom fra en kar som selv beskriver øyesykdommen han har _“..som om du skulle sett gjennom et sugerør”_, siden synsfeltet gradvis svekkes, og du får mer og mer tunnelsyn.

> Utvikleren som sitter og programmerer har ikke en sjanse i havet til å skjønne hvordan jeg opplever å bruke en pc, uten å ha møtt meg eller møtt en person med min øyesykdom. Eller møtt en blind en som bruker voiceover. Så ved å se hvordan jeg bruker musa og slike ting, så vil dem få en helt annen opplevelse av hvordan vi opplever det, og hvordan vi bruker PCen. I stedet for at dem skal sitte og gjette. Der dem sitter på kontoret sitt, og lager noe nytt. Så brukertesting er kjempebra, jeg håper flere firmaer tar seg råd til det, for det er jo ikke gratis.

Det her blei også bekrefta av Christian Thon, som jobber med kommunikasjon hos Blindeforbundet.

> Jeg tenker at brukertesting er viktig for å prøve løsningen på ulike måter av mennesker med ulike bruksmønstre. Jeg har til gode å delta på en brukertest der utviklerne ikke sitter igjen med noen aha-opplevelser. Man ser litt annerledes på sin egen løsning etter å ha sett noen prøve å finne fram i den med 800 % zoom, ved hjelp av tale eller uten å bruke mus.

For hvis du ser på hjelpeteknologi, som skjermlesere f. eks, så vil de male et helt annet bilde enn det du og jeg ser på skjermen. Den må tolke det på et eller annet vis, så spørsmålet da er om folk som Arild vil klare å tolke det på samme måte som vi som designere har tenkt. Og ikke bare det som ligger på skjermen, men også det som skjer “bak skjermen”. Som han nevnte selv,

> “Om noen har programmert sida dårlig så kommer jeg til å gå meg vill. Min verden er noe helt annet enn den som er slengt opp på skjermen.”

Så med mindre det er definert i koden så veit ikke han hva han går glipp av. Om du har et bilde av et kart uten alternativ bildetekst f. eks, så vil ikke det lede Arild dit han skal.

### Langsiktig effekt

Nå kan det virke som fokuset på brukertestene blei mer retta mot universell utforming, men kommentarene ovenfor treffer bredere enn som så. For uten å ha førstehåndserfaringer med hvordan folk bruker dataen eller telefonen så er det vi som produktutviklere som famler i blinde.

Det som er viktig å ta med seg fra det her er den langsiktige effekten av brukertester. Og det er at vi forhåpentligvis unngår å gjøre samme feil to ganger. At vi, som designere og utviklere, tar med oss de aha-opplevelsene og deler dem med kollegaer og alle andre som vil høre. På den måten gjør vi det lettere for alle å bruke tjenestene vi lager, ikke bare de som har spesielle behov.

Vi er jo alle brukere av det ene og det andre, og forventningene våres er det samme når vi skal ta i bruk en nettbank-app, eller en nettside. Vi forventer bare at vi skal kunne gjennomføre de tinga vi kommer for å gjøre.

## To ting helt på tampen

Helt til slutt, hvilke konkrete erfaringer kan du ta med deg videre?

> 1. Under en brukertest er det i de mest frustrerende øyeblikkene vi kan lære mest.

Husker du det øyeblikket jeg nevnte tidligere, hvor brukeren blir frustrert fordi det er noe de ikke får til, men vil så veldig gjerne prestere? Det er i nettopp de situasjonene du kan lære mest, men da må du tørre å sitte i den pinlige stillheten. Selv om det er fristende å kaste en metaforisk livbøye til person som prøver sitt beste.

I stedet for å gi svaret må vi heller kunne stille spørsmål som “Hva er det du forventer å finne der? Hva tror du at du skal gjøre? Hvor ville du vanligvis gått for å finne den informasjonen? Hvordan oppfatter du hva du skal gjøre i dette tilfellet?”.

> 2. Hvordan får brukeren vite at vi har endret tjenesten basert på tilbakemeldingene han eller hun har gitt?

Som Arild nevnte tidligere, opplever han at rollen hans er bortkastet dersom det ikke gjøres endringer basert på tilbakemeldingene han kommer med. Når får han vite at det har skjedd noen endringer? Jeg spurte om han hadde fått noen oppfølginger tidligere, fra andre brukertester, og svaret var enkelt: “Nei”.

Når du står ved en milepæl i prosessen, la oss si dere har lansert en ny versjon, eller kanskje lansert noe for første gang, så er det lett å glemme å følge opp dem som har bidratt underveis i prosjektet. Den forglemmelsen har jeg vært skyldig i mang en gang, men samtidig så vil jeg oppfordre folk til å ta det mer på alvor. Til å sette det i system så du husker det, og gjennomfører. Optimalt sett burde vi sikkert gitt beskjed når vi har adressert en spesifikk endring som hver spesifikke bruker poengterte, men det tror jeg ærlig talt koker bort i kålen.

Derimot er det ikke utenkelig å sende en samla e-post til alle som har deltatt på brukertester, når det lanseres en ny versjon hvor det er tatt stilling til små og store tilbakemeldinger. Det kan være så enkelt som å si:

“Heisann! Simen fra Variant her. Du var jo med på brukertesting for oss for en stund tilbake angående det prosjektet, og nå ville jeg bare si i fra at vi har lansert en ny versjon hvor vi har gjort forbedringer basert på tilbakemeldingene vi fikk fra deg og de andre vi gjorde tester med. Her har du en link til den siste versjonen av tjenesten. Ville bare takke deg nok en gang for at du stilte opp, og ønske deg en god dag videre.”

Trenger ikke å være noe mer enn som så.

![[images/Pasted image 20240428104531.png]]

# Del 3: Fortløpende brukertesting som forankring i både team og organisasjon

*I del 1 så vi på hvilken verdi brukertesting egentlig har i moderne produktutvikling. Hva du får ut av det, og hvordan det kan passe inn i den større helheten av å utvikle et produkt eller tjeneste. I del 2 så vi på fortløpende brukertesting fra ståstedet til brukeren. I del 3 tar vi en kikk på hvordan du kan bruke fortløpende brukertesting for å oppnå mer engasjement rundt arbeidet som gjøres, både i teamet, men også organisasjonen som en helhet.*

## Inspirasjon for teamet

Når brukertester gjennomføres av noen få utvalgte vil det også være deres ansvar å formidle følelsene til de som testa tjenesten. Hva var det som var spesielt viktig, og hvorfor var det så viktig for dem? I sånne tilfeller kan det være enkelte interaksjoner eller kommentarer som virkelig skiller seg ut, og det kan føles som et “Du måtte nesten vært der for å virkelig forstå det”-øyeblikk. Derfor er det viktig å inkludere flere enn bare de som jobber med frontend. For deg som sitter på backend, og er uttøvende koder, så får du en slags intern prioritering av hva som er viktig. I tillegg til en personlig tilknytning til at det blir gjennomført.

![[images/Pasted image 20240428105248.png]]

Personlig er jeg jo designer, så for å få et bedre innblikk i hvordan brukertesting oppleves som utvikler så tok jeg en prat med Christian Brevik.

Han er en del av AtB-teamet, og bare noen få minutter før vi plukka opp tråden på Slack så hadde han vært med i en digital brukertesting av appen de jobber med. Det her var altså rykende ferskt i minnet hans.

Han fortalte meg om hvor uinspirerende det kan være å bare lage noe ut av en use case, at du utvikler i vakuum rett og slett. For som han påpeker selv:

> “Du bygger et eller annet som skal være et verktøy, eller brukbart for noen, så om du ikke ser noen som faktisk tar det i bruk så blir det veldig kjedelig. Det artigste da er å se det bli tatt i bruk. Superinspirerende.”

Christian er en ganske så engasjert type, så punktsettingen her får ikke helt fram hvor smittsom den entusiasmen var, men du får bare ta meg på ordet.

## Innsiktsarbeid gjør det lettere å prioritere

Den inspirerende følelsen trenger du heller ikke vente så lenge med å kjenne på. For ved å starte med brukertester tidlig vil det avklare ting mye fortere, på en nærmest vitenskapelig måte. Om du starter med brukertester tidlig handler det ikke bare om å skaffe innsikt, men det blir også fort tydelig hvor skoen egentlig trykker. Innsikten vil også føre til oppgaver, som igjen fører til et større roadmap. På en jevnlig basis vil det også hjelpe teamet med å prioritere arbeidsoppgavene, basert på innsikten fra brukertestene, siden du har et tydeligere bilde av hva som kan gi verdi på kort og lang sikt.

I AtB-teamet har åpenhet og brukerinvolvering vært en viktig faktor, og derfor har de også [åpen tilgang til et sånt roadmap](https://github.com/AtB-AS/mittatb-app/projects/6) for alle og enhver som vil se. Det er nok mest for de spesielt interesserte, men på den måten kan du som privatperson se når nye funksjoner kommer i appen din.

Resultatet fra en brukertest er som regel en rapport, med en oversikt over funnene som er gjort, og hvilke oppgaver eller tiltak som må gjøres med det som grunnlag. Det er en enkel måte å forankre arbeidet som er gjort hos andre interessenter. Nå nevner jeg AtB mye, men det er et veldig spennende tilfelle, blant annet fordi kollektivtrafikken er relevant for de aller fleste. I deres tilfelle har de også offentliggjort [rapportene fra brukertestene på bloggen til AtBeta](https://beta.atb.no/blogg/29-10-brukertest-med-blindeforbundet). Ikke bare vil det være betryggende ovenfor brukerne som har vært med på testene, og se at tilbakemeldinga deres har blitt mottatt, men det åpner også opp prosessen for alle andre som bruker appen. Så de kan se hvilke funksjoner som jobbes med, og hvordan vi jobber med det.

Men tilbake til der vi var — Om du kun opererer etter antagelser så kan det nærmest føre til krangler innad i teamet, siden noe vil være mer intuitivt for én, mens noe helt annet er intuitivt for noen andre. Her vil en brukertest kunne avklare det langt fortere. Og derfor vil det være en fordel å snakke med folk fra dag én.

## Ikke vent til siste liten

Som vi har skrevet om på bloggen før så er det mye læreglede ute og går, og jeg merker fort at det her med tidlig brukertesting har vært en “eye-opener” for flere. En annen designer som har hatt gode erfaringer, er Stine Bechmann, som har jobbet hos Unit i det siste.

![[images/Pasted image 20240428105311.png]]

Hun fortalte meg om hvor lett det er å glemme bort brukernes **forventninger** rundt uferdige ting. For i noen tilfeller holder det faktisk å vise kun noen tomme firkanter, og bare spørre “Hva forventer du egentlig å finne her?”. Så må du bare være tålmodig, tørre å sitte litt i den pinlige stillheten, og vente på at brukeren skal begynne å anta, gjette, og synse — “Ja, jeg vil jeg jo tro at det skal være sånn og sånn. Ville kanskje forventa å finne informasjon om det og det..”

Ofte vil man gjerne gjennomføre brukertester så for-seg-gjort som mulig, men i hennes erfaring kan det også være veldig effektivt å ha mer hyppige “feedback loops”. Noe som kan gi veldig mye til prosessen, men som ikke trenger å være like strukturert som en brukertest. Spesielt hvis du kommer inn i en pågående prosess, og det ikke ligger masse innsikt til grunn for avgjørelsene.

_For hva om du ikke har all verdens med tid eller budsjett, hva kan du gjøre da?_

Det er et spørsmål som vi utforsker støtt og stadig, og som jeg tenker å skrive mer om ved en seinere anledning. Her har vi nemlig noen gode erfaringer å by på. For å kunne utdype hvordan du kan gjennomføre det derimot — hvordan det kan se ut, hva du tester på osv — så vil jeg sanke inn noen flere erfaringer først, for å kunne nyansere situasjonen i større grad. Enda en grunn til å følge med videre!

### Forankring utover arbeidsgruppa

Da jeg snakka med Stine fortalte hun meg også om et annet tilfelle, hvor hun hadde brukt brukertester som en måte å forankre arbeidet utover i bedriften. I stedet for å forklare hver nye versjon til ulike stakeholders, gav hun heller en test av den nye demoen. På den måten fikk hun ikke bare forankra arbeidet som var gjort, men gikk også derfra med mer feedback som kunne jobbes med videre.

Og nettopp det her med forankring utover i bedriften, utover det enkelte teamet som jobber med produktet, det er også en av de store fordelene med distribuerte brukertester. Enten om du åpner opp for flere deltakere når du gjør digitale brukertester over Zoom (med samtykke fra brukeren så klart). Eller om du slår på stortromma med en såkalt “unlisted youtube stream”.

Da kan du enkelt og greit dele en link med alle som kan ha interesse, og nevne at _“I dag kjører vi brukertester av produktet vi jobber med, og dere kan hoppe inn her og se, om dere har tid”_. Christian, og de andre fra AtB-teamet, har gjort det her tidligere. Da spesifiserer de til alle mottakerne at de tar notater i Miro, og at andre gjerne må gjøre det samme, men det er ingen nødvendighet. Ved å ha en kontinuerlig stream på den måten så kan folk hoppe inn og ut, når det passer for dem. De fleste har ikke mulighet til å sette av en hel dag, men kanskje du kan hoppe innom i noen minutter?

Spesielt når det er snakk om universell utforming, hvor empati er en stor del av helhetsbildet. Da kan dette være en stor fordel. Når brukere blir mer enn bare “brukere”, og du plutselig innser at du gjør det arbeidet her for at Arild, Elisabeth, og Heidi f. eks, og at de skal få nøyaktig like mye nytte ut av tjenesten som resten av befolkninga. Da er det ikke bare snakk om å tilfredstille et krav. Da bygger du kultur, og du gjør empati til en sentral del av den.

Å se noen ta i bruk tjenesten du jobber med, det er nemlig utrolig inspirerende. Både å se hva som fungerer bra, eller hva som ikke fungerer i det hele tatt. Som Christian så fint poengterte i praten vår,

> “Vi lager ting som folk skal bruke. Det er det hele jobben vår går ut på.”

---

*Tusen takk til Stine Bechmann, Christian Brevik, Hilde Osmo Reindal, Vikas Gupta og resten av Variant-gjengen for faglig og språklig sparring. Og en ekstra takk til Olav Ellingsen, Ann Junita Kinge, og Øyvind Botnan Kvam, fra Brønnøysundregistrene for at de setter et godt eksempel for hvordan man kan gjøre brukertesting til en integrert del av arbeidskulturen.*
