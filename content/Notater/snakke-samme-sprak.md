---
type: notat
date: 2023-04-03
lastmod: 2023-04-03
tags:
  - nyhetsbrev
  - design
  - kode
title: Om det å snakke samme språk
publish: true
slug: snakke-samme-sprak
---
## Hvordan designere forholder seg til størrelser

Hvis jeg spør en amerikaner om hva slags temperatur det er meldt imorra, og hun svarer med å si "77 °Fahrenheit", sier det meg jo null og niks. Rett og slett fordi jeg ikke er vant til å bruke den måleenheten.

Det samme kjenner jeg på når en utvikler spør meg om hvor mange "*rem*" det er mellom en knapp og et avsnitt f. eks. Jeg har nemlig vært [dypt i Figmaland](https://www.figma.com/) de siste to månedene, og lagd et grensesnitt for en kunde på jobb. Da må man plutselig ta stilling til sånt. Hvor mye mellomrom bør det egentlig være mellom en knapp og et avsnitt? Det er ett av mange filosofiske spørsmål man må ta stilling til som UX designer.

Jeg kommer ikke til å reflektere rundt det spørsmålet i dag, men jeg vil definitivt [anbefale den artikkelen her om å basere størrelser på et 8-punkts system](https://medium.com/swlh/the-comprehensive-8pt-grid-guide-aa16ff402179). Det har vært blant de større innflytelsene på designarbeidet mitt det siste året, vil jeg si.

Det jeg heller vil snakke om er *hvordan* vi forholder vårs til mellomrom og størrelser i det hele tatt.

### Store åpenbaringer ved grunnleggende kunnskap

I det siste har jeg nemlig jobba med posisjonering og "spacing" på en måte som jeg ikke har vært vant til.

På én måte kjenner jeg at det her er så grunnleggende at jeg nesten skammer meg over å anse det som "ny kunnskap", bare fordi det er helt grunnleggende for mange. Samtidig er det noe utrolig spennende med å få en åpenbaring når du lærer deg noe nytt. Og "det nye" for meg nå i det siste vært CSS og HTML. Da syns jeg det er viktig å anerkjenne de nøkkelfunnene som jeg snubler over underveis.

### Fleksible og ikke-fleksible måleenheter

For om jeg lager et grensesnitt så forholder jeg meg til pixler. Og det har jeg alltid gjort. Det har vært standard-enheten som brukes i design-programmer så lenge jeg kan huske. Problemet med det er at pixler er en "absolutt lengde". Den er konstant.

Det er en fordel hvis du lager en plakat f. eks, hvor du veit at A2 er det eneste formatet som skal brukes. Med digitale greier derimot må du tilrettelegge for at én person har en liten iPhone SE, mens en annen skal se på samme greia på en 32-tommers skjerm på jobb. Og det du lager skal være like fint i alle størrelser.

**![[images/responsivt-design.png]]

Når du lager et *responsivt design* må det altså kunne skaleres vertikalt og horisontalt. Da egner det seg dårlig med en måleenhet som ikke tar hensyn til omstendighetene den befinner seg i.

Derfor er det mye lettere å jobbe med en *relativ* måleenhet som tilpasser seg til omstendighetene, og ikke en *absolutt* måleenhet.  `REM` og `EM` er eksempler på to sånne relative måleenheter.

I praksis vil man da snakke om 1rem, 1.5rem, 3rem også videre. Men hvordan veit jeg hvor mye det er i pixler?

Jo, hver nettleser har nemlig en standard skriftstørrelse som den faller tilbake til, dersom du ikke har spesifisert hvordan du vil at teksten skal se ut. Den størrelsen er som regel 16 pixler. Her burde jeg forklart mer spesifikt hvordan [REM er definert relativt til skriftstørrelsen av rotelementet](https://www.freecodecamp.org/news/what-is-rem-in-css/) (REM = Root element), men det der forstår jeg egentlig ikke. Og det er greit nok for min del.

Så lenge jeg veit at 16 pixler er det samme som 1 REM, og at det gjelder alle størrelser, med mindre man spesifikt endrer det til noe annet. Det kan jeg jobbe med. Da er 2 REM det samme som 32 pixler, 3 REM er 48 pixler også videre.

### Motivasjon

Okei, men hvorfor er det her spennende?

Jo, for det betyr at jeg som designer plutselig snakker samme språk som utvikleren jeg jobber med. Når vi snakker samme språk blir det også mindre tvil om hvor ting skal stå i forhold til hverandre. Med andre ord, det blir lettere å oversette designet jeg har lagd til kode, og jeg må bruke mindre tid på å presisere at noe er feilposisjonert.

Jeg kan gi deg et eksempel for å illustrere det poenget tydeligere.

Sammen med utvikleren jeg har jobba med så jeg på posisjonering av ulike elementer, i den nettsida vi har lagd, og hvor mye mellomrom det skulle være fra det ene til det andre. Og forståelig nok var han litt frustrert over at det ikke var noen *regler* rundt det hele.

Det er jo mye lettere å definere at det **alltid** skal være 1 REM med mellomrom fra ingressen både opp til overskriften, og ned til brødteksten. Sånn er det bare. Såklart kan det være unntak, men det vil jo være kjappere å tilpasse de få unntakene sammenligna med å gå gjennom hvert eneste tilfelle hvor det er en ingress, og definere at "*Her skal det være 1 rem, der skal det være 1.5, og der skal det være 1 rem igjen.*"

Sannheten var at jeg ikke hadde vært konsekvent med avstandene gjennom hele løsningen. For jeg hadde fokusert på én side av gangen, som et enkeltstående stillbilde, ikke løsningen som en helhet. Derfor lagde jeg over oversikten nedenfor.

![[images/storrelsesforhold-ui.png]]

Ikke bare er det til stor hjelp for utvikleren, men også til meg. For da trenger jeg aldri å vurdere hver enkelt situasjon. Da lener jeg meg bare på regelen.

### Bonus-argument

Mens jeg leste meg opp på [hvorfor designere burde gå vekk fra pixler og bruke rem i stedet](https://uxdesign.cc/why-designers-should-move-from-px-to-rem-and-how-to-do-that-in-figma-c0ea23e07a15), var ett av argumentene at pixler ikke ville skalere opp dersom du ser dårlig, og har zooma inn alt på telefonen til 200% f. eks. Skrifta ville altså forbli like liten selv om du aktivt prøver å forstørre det for å kompensere for utfordringer med synet. Og det er et åpenbart problem, og en soleklar grunn til å bruke relative måleenheter i stedet.

Samtidig så var det en utvikler-kompis av meg som nevnte at det pleide å være sånn før, men at det ikke er tilfellet lenger. Om du kan avkrefte eller bekrefte det her så vil jeg gjerne vite om det 🙋‍♂️
