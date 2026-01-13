---
date: 2023-10-08
lastmod: 2024-03-27
tags:
  - kode
  - design
aliases:
  - Hva jeg har lært av utviklere om designprosessen
title: Hva jeg har lært av utviklere om designprosessen
publish: true
slug: utviklere-om-designprosessen
---

# Hva jeg har lært av utviklere om designprosessen

Når vi snakker om det å bli bedre innafor faget ditt så er det lett å tro at du lærer mest av de som jobber med det samma som deg. Og helst de som har mer erfaring enn deg sjøl.

For all del, jeg har lært massevis av designerkollegaene mine i Variant, både de mindre- og de mer erfarne, men det er *utviklerne* som har gjort meg til en mer fullkommen UX designer. Nøyaktig hva jeg har lært av dem (og hva du også kan lære) skal jeg utdype for deg nå.

Skal sies at det her starta som en presentasjon som jeg holdt for noen dager siden, som jeg gjerne vil forbedre. Publikummet da bestod av utviklere og designere for det meste, og derfor er det nok mer stammespråk fra min side enn det pleier å være, men jeg er spent på å høre om du fremdeles henger med, og om det er interessant å lese. Eller om det blir for teknisk og du ikke gidder å lese mer. For det er en ærlig sak.

Uansett vil jeg gjerne vite om det er noe jeg kan gjøre tydeligere, eller nyansere på en bedre måte, for at poengene skal komme tydeligere fram.

## En hyllest til utviklerne

Det er altså utviklerne jeg kan takke for at jeg nå kan levere en bedre brukeropplevelse enn det jeg kunne før. Rett og slett fordi jeg veit mer om hva som kreves i de ulike delene av prosessen. Hvordan jeg kan gjøre jobben lettere for andre. At jeg har en bedre forståelse for hva som kan være tidkrevende å implementere, og hvilke små grep som kan utgjøre en stor forskjell (på selve opplevelsen av å bruke appen, nettsida, eller systemet vi lager).

Dette blir derfor en slags *homage* til utviklerne jeg har jobba med (fancy ord for hyllest) – fra de ferskeste av de ferske til de mest erfarne ringrevene – og hva de har lært meg om designprosessen.

Så, hva har jeg lært? For at du kan vurdere hva som er av interesse for deg får du en oppsummering med en gang. Jeg har nemlig lært at:

1. Du blir ikke *ferdig* med designet ditt, men du kan bli ferdig med en versjon av det. 
2. Ikke overtenk arbeidet ditt, bare snakk sammen i stedet
3. Testing i et QA-miljø gir deg mye mer enn å stirre på skisser i Figma
4. Verdien av "Hvis det skjer, hva skjer da?"
5. Inkluder utviklere tidlig og fortløpende for å korrigere kursen din underveis
6. Du må ikke lage et helt designsystem, men du bør lage noen enkle regler
7. Estetikk er langt mer enn bare det visuelle
8. Alt er mulig, kommer bare an på hva hvor mye tid vi har

### 1. Du blir ikke *ferdig* med designet ditt, men du kan bli ferdig med en versjon av det

Når det kommer til et produkt eller en tjeneste i sin helhet så er jeg veldig vant til at man forbedrer det bit for bit, at man "jobber iterativt", og har innstillinga om at det blir bedre versjon for versjon. Samtidig, av en eller annen grunn, så tenker jeg at det *jeg* lager, altså designet, det skal være "ferdig-ferdig", før det utvikles. Men hva er grunnen til det egentlig? Hvorfor tenker jeg at designet skal være dønn ferdig før man kan begynne å jobbe med det?

Sannsynligvis er det en kombinasjon av to årsaker. For det første:

#### Egoet mitt kommer i veien

Her har jeg et konkret eksempel, hvor jeg og utvikleren Trym jobba på et nettsideprosjekt sammen. Da lagde jeg nemlig en dedikert side i Figma som het "Ferdig", hvor jeg skulle legge alle de delene av nettsida som var ferdig-designa. Tanken var da at det ville være tydelig for han å se hva han kunne begynne med, også slapp han å spørre meg hva som var klart.

Problemet her var jo bare at den sida var mer eller mindre tom. I lang, lang tid (relativt til den tida vi hadde på prosjektet riktignok)

For jeg jobba på mange ulike deler av designet samtidig. Og klarte aldri å si meg helt ferdig med én del av det, siden alt hang sammen, og valgene jeg gjorde på ett område påvirka valgene jeg tok på det neste området. Konsekvensen av det derimot var at Trym bare måtte "trå vann" på en måte, for jeg hadde ikke noe klart som han kunne jobbe på.

Hva med den andre grunnen da? Den andre grunnen til hvorfor jeg tror at designet skal være helt ferdig før man kan begynne å jobbe med det? Jo, for det andre:

#### Jeg blir overvelda av at det er mye å ta hensyn til, så jeg klarer ikke å dele det opp i mindre leveranser.

Her kan jeg riktignok trekke inn noe jeg har lært av utvikler-Tore. Og det er verdien av å starte med noe smått, og bare bygge videre derfra. Å starte med "strikk og binders" som han kaller det.

For det trenger virkelig ikke se fint ut på "baksida" (i prosjektfila mi i dette tilfellet) så lenge vi får noe ut i verden, og ser at det funker. Da skaper vi nemlig momentum for vårs sjøl, for teamet vi jobber i, og ofte kunden vi jobber for. Også kan vi rydde opp i prosjektfiler seinere (selv om det såklart er en fordel å rydde mens du jobber, nettopp for å unngå å alltid dytte det foran deg).

#### Så hva legger jeg egentlig i den lærdommen?

Som jeg innleda med – Du blir ikke *ferdig* med designet ditt, men du kan bli ferdig med *en versjon* av det. For min del betyr det at jeg er ikke låst til designet jeg lager. Ikke bare er det lov til å endre det seinere, men det er også forventa at jeg gjør det. Nettopp for å kunne forbedre det. Det er jo akkurat derfor vi snakker om å *jobbe iterativt*, at du lager én versjon nå for å kunne lære av hva som kunne vært bedre, for så å lage en bedre versjon av det i neste omgang.

Samtidig syns jeg det er viktig å få fram at vi designere må bli bedre til å arrestere vårs sjøl når egoet vårt kommer i veien for framdrifta. For dette gjelder nok ikke bare meg.

Det leder meg inn på lærdom nummer to:

### 2. Ikke overtenk arbeidet ditt, bare snakk sammen i stedet

Det er lett å tenke at du må lage såkalte hover- og active-states av alle knapper i en prototype, føøør du skal dele skissene dine med andre. Eller at du må ha tenkt ut alle feilmeldinger som skal dukke opp hvis brukeren gjør det ene eller andre. Og spesielt når det kommer til å dele designskissene med utviklere. For mange av vårs designere har nok erfaringer med noen "triggerhappy" utviklere, som gyver løs på implementeringa av noe som ikke var helt "ferdig" i våre øyne.

Men.. utviklere trenger egentlig ikke perfekte skisser for å komme i gang med jobben sin. Så lenge man snakker sammen, og finner ut av hva som trengs for å kunne jobbe videre.

Det var sånn jeg og Trym løste det eksempelet jeg nevnte tidligere. For den "Ferdig"-sida som jeg lagde i Figma, den var jo mer eller mindre tom. Men han tok tak i det, og spørte meg om det var noe han kunne komme i gang med, som sannsynligvis ikke kom til å endre seg i så stor grad, og DET var det jo!

Så da fant vi fram de delene av designet som var mer eller mindre "stabile", men hvor det mangla noen små avgjørelser. Også blei vi heller enige om at han skulle spørre meg dersom det var noe han trengte en avgjørelse på.

#### Så hva legger jeg egentlig i den lærdommen?

Rett og slett at jeg må drite i at ting skal bli ferdig, og heller tenke at designet må leve, og utvikle seg over tid, i iterasjoner som alt annet. Nettopp for at vi skal kunne lære mer om hvordan det faktisk er i bruk.

Som leder meg videre til lærdom nummer tre.

### 3. Testing i et QA-miljø gir deg mye mer enn å stirre på skisser i Figma

Når jeg sier QA-miljø så betyr det bare en liksom-versjon av det vi lager, som vi kan bruke for å finne feil, og teste vårs fram før vi faktisk lanserer noe til offentligheten.

For utenom å faktisk brukerteste prototyper, så er det lite du egentlig lærer av å bare se på statiske skisser i Figma. Det er som et "best case scenario", hvor ingenting går feil. Hvor alle har samme skjermstørrelse som deg, ikke en eneste funksjonsnedsettelse, perfekt belysning, og aldri dårlig tid. Det er optimale forhold.

Problemet med det er at dersom jeg vurderer designet mitt ut utelukkende gjennom en iPhone 15 pro-"frame" i Figma, så designer jeg for eliten, som det kalles. Og i stor grad så er det teknologifolk som vårs (som lager appene og nettsidene vi bruker) som nettopp utgjør den eliten.

Eliten er vi som har et dedikert "[gadgetbudsjett](https://handbook.variant.no/information#Gadgets)" å kose vårs med, som får dataen gjennom jobben, og som faktisk har oppdatert telefonen de siste fem årene.

Ikke bare føles det mye mer "ekte" å interagere med designet jeg har lagd i et såkalt QA-miljø (Quality Assurance), men det kan gi meg en bedre forståelse for folk som har ulike begrensninger eller bare et annet utgangspunkt enn meg sjøl. Og når vi tilrettelegger for dem så vil også løsningene våres treffe bedre for alle andre og.

### 4. Verdien av "Hvis det skjer, hva skjer da?"

Vi UX-designere fokuserer alt for mye på det som kalles "The Happy Path".

Og "The Happy Path" er altså den optimale brukeropplevelsen, hvor alt fungerer nøyaktig som det skal, uten problemer eller misforståelser underveis. Det er altså solskinnsdager og enhjørninger bæsjer gull.

Men så er det en utvikler som spør:

> Duuu, hvis du gjør *sånn* og *sånn*.. Hva skjer da egentlig?

Eller som jeg fikk høre her om dagen, om hvordan systemet skulle oppføre seg basert på en handling brukeren gjør:

> Om du kan fjerne den infoboksen der, skal den da være borte for alltid? Eller skal den komme tilbake igjen?

Den type tilbakemeldinger er både gull verdt, men også rimelig frustrerende, for jeg har sjeldent noe godt svar sånn på stående fot. Problemet med å fokusere på "The Happy Path" som jeg nevnte, er nettopp at det at er veldig få brukeropplevelser som er sømløse fra starten av.

La vårs si at du tester på en person i 60-åra som har begynt å se dårligere, og som derfor har forstørra all tekst på dataen sin til 110%. Da kan det være nok til at det kødder med den fine layouten din. Eller kanskje du ikke hadde tenkt over at det fremdeles finnes de der ute som eier en iPhone SE i 2023 (jeg ser på deg, Oda). Eller at noen bare trykker feil rett og slett, og alt de vil er angre på den handlinga de nettopp gjorde.

Det er derfor det er så utrolig nyttig med utviklere som spør "*Okei, men hvis man gjør sånn og sånn, hva skjer da?*". For vi må rett og slett tilrettelegge for at folk gjør rare ting, også må vi lære av det. Selv om det er sykt frustrerende å få den kommentaren slengt i trynet når jeg som designer trodde at jeg hadde tenkt på alt.

Ikke bare er det nyttig for brukeropplevelsen i sin helhet, men det vil også gi vårs et mer realistisk syn på hvor lang tid det tar å gjøre jobben. Siden vi får definert omfanget på en bedre måte.

Mye av det UX-ugrasset der, som jeg skal begynne å kalle det, det kan vi som designere også luke vekk tidligere enn vi tror.

### 5. Inkluder utviklere tidlig og fortløpende for å korrigere kursen din underveis

Jeg holder på å videreutvikle en app nå (hos den kunden jeg jobber for) hvor det skal være info som oppdaterer seg basert på bruken, i tillegg til små endringer på noe som har sett dønn likt ut de siste 5-10 årene ca. Og underveis har jeg spørt utvikleren jeg jobber med om ting som:

> Du, jeg tenker å gjøre sånn *her*, hva tenker du om det? Blir det tidkrevende å implementere, eller er det en smal sak? Har det noen konsekvenser som jeg ikke tenker over, sånn som du oppfatter det?

Ved å kaste ut sånne spørsmål i ny og ne, og sparre på konseptet på en fortløpende basis så klarer jeg å unngå åpenbare feil som jeg ikke ville plukka opp før jeg hadde testa det. 

Samtidig er det neimen ikke alle utviklere som er like åpne for møter hvor du foreslår "abstrakt idémyldring og utforsking", men de fleste derimot er åpne for å komme med en mening. Samtidig som folk flest liker jo følelsen av å kunne hjelpe. Du trenger bare ikke vinkle det som et faktisk møte eller en workshop 😉

Du kan altså spare mye tid på å inkludere en utvikler allerede i konseptfasen.

### 6. Du må ikke lage et helt designsystem, men du bør lage noen enkle regler

Måten jeg lærte det her på var at jeg rett og slett dreit meg ut, og tenkte altfor kortsiktig. Jeg jobba på et prosjekt hvor vi skulle lage en nettside på kort tid, og da vi nærma vårs slutten så sa utvikleren jeg jobba med noe sånt som:

> Det hadde vært så mye lettere å lage det her hvis jeg visste at det var noen regler for spacinga mellom tekstelementer som er like.

Og det høres jo opplagt ut når jeg sier det nå, men der og da så hadde jeg ikke tenkt på det. Jeg var altfor fokusert med å lage designet på én og én side – isolert fra hverandre. Jeg tenkte rett og slett ikke på helheten.

Jeg fikk riktignok rumpa i gir foråsirresånn og slang sammen noe den samma dagen (som ligner på eksempelet under), som viste seg å være til stor hjelp for vårs begge. For det fikk meg til å tenke mer systematisk på layouten og, som førte til færre "unntakstilfeller" i designet, og langt mer struktur.

![[images/Pasted image 20231002111812.png]]

Det jeg lærte er altså at du kan ta noen *få* store avgjørelser som fjerner behovet for å svare på mange spørsmål underveis.

Samtidig så må du virkelig ikke lage et helt designsystem, men du bør virkelig lage noen enkle regler. For da tilrettelegger du for at det er mønster som kan gjentas gjennom hele løsningen.

Hvis du ikke veit noe bedre så anbefaler jeg også bare bruke 8-gangen for å definere størrelser. Sånn at alt av spacing og typografi kan deles på 8. Som da gir deg størrelser som 16, 24, 32, 56 også videre. Det overlapper også perfekt med måleenheten REM, som jeg lærte om i samma slengen 🤓

### 7. Estetikk er langt mer enn bare det visuelle

Vi designere bruker mye tid på å lage et grensesnitt som *ser* veldig fint ut. Og det dokumenteres grundig med kommentarer og piler i Figma, for å forklare nøyaktig hvordan spacinga skal være, eller hvor avrunda kantene skal være, med fargekoda seksjoner for både det ene og det andre.

Én ting vi glemmer bort riktignok, er at vi også må samarbeide med utvikleren om at grensesnittet også skal *føles* bra i produksjon. Ikke bare hvordan det ser ut. Da snakker vi om de små animasjonene f. eks når du går fra én side til en annen, du åpner en dialogboks, eller hvordan det er å swipe gjennom en app.

Og det er stor forskjell fra utvikler til utvikler på hvor mye "ekstra krydder" (i form av smude "transitions", som det kalles) som man drysser på utenom at du som designer spesifiserer det. Det er såklart et samarbeid, hvor alle parter har et delt ansvar, men det er altfor lett å nedprioritere i prosessen.

### 8. Alt er mulig, kommer bare an på hva hvor mye tid vi har

Jeg husker at utviklerne, Mikael og Christian, sa det der til meg flere ganger – "Alt er mulig, kommer bare an på hvor mye tid vi har", da vi var innleid hos AtB. Og den setningen trengte jeg egentlig å høre. Fordi som designere kan vi være veldig forsiktige i blant, å tenke "*Å nei, det blir sikkert vanskelig hvis vi skal gjøre sånn og sånn*", som gjør vårs alt for forsiktige. At vi ikke *tør* å foreslå det til utviklerne, men alt er jo mulig. Man må bare ha tida til å finne ut av hvordan. Og hvis det ikke er tid til det så må du vurdere om det er verdt å prioritere det over noe annet.

## Konklusjon

I teorien har jeg visst lenge at det er viktig å ha et tett forhold mellom designere og utviklere. Samtidig er det først nå, etter å ha jobba med en god del utviklere i løpet av de siste tre årene, at jeg virkelig har lært *hvordan* jeg kan gjøre min rolle så godt jeg kan, for at det samarbeidet skal bli så bra som mulig.
