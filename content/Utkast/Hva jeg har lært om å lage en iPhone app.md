## Kjedelige, men nødvendige greier

### Xcode

Selve programmet du bruker for å lage appen din

### Swift

Språket du bruker for å bygge appen din.

#### Kjekt å vite

Swift er språket som brukes for å bygge apper til alle operativsystemene til Apple. Så om du lærer deg Swift betyr det at du kan lage apper til klokka, telefonen, dataen, ipaden, og TVen. Og i noen tilfeller trenger du faktisk ikke gjøre store tilpasninger i det hele tatt, for å overføre appen din fra én flate til en annen.

### App store

> [!important] Uten å være med i Apple Developer Program kan du *ikke* publisere appen din


For å publisere en app i app store må du tydeligvis betale en årlig utgift for å Apples Developer Program, som gir deg tilgang til App Store Connect, Test flight (hvor du kan prøvekjøre appen din).

På en årlig basis koster det $ 99 (1102 kr).

Om du vil tilrettelegge for kjøp inne i appen din (bonusgreier) så konfigureres det i app store.

Appen må godkjennes av "the certificate team" for å vurdere om det tilfredsstiller Apple sin retningslinjer.

### Testflight

Her kan du teste appen din før lansering. Det betyr også at du kan sende en tidlig versjon av appen din til andre for å få tilbakemeldinger.


## Xcode-grensesnittet

### Navigator

Der du velger den fila du vil jobbe med.

### Editor area

Der du tilpasser fila du velger fra navigasjonen.

### Inspector

Også kjent som "utilities area".

Her finner du ting som:
1. Feilmeldinger
2. Fylle inn utdypende info 

Funksjonen til det panelet endrer seg altså ut i fra hva du har valgt i redigeringsområdet.

Det er også fire ulike faner:
1. Identity and type
2. ?
3. Quick help
4. Window group (?)

Om du f. eks er i "Quick help"-fanen så vil du få info om noe av koden du har valgt.

Når du bygger grensesnittet ditt er det også der du justerer padding f. eks, altså hvor mye luft du vil ha rundt noe. Eller hva slags tekst den skal inneholde.

### Simulator

Kan velge hvilken telefon du vil se grensesnittet ditt i.

Om du derimot vil se det på en fysisk telefon kan du koble den i med en USB-ledning, og velge den fra den samme menyen.

Måten du setter det i gang på er ved å trykke på Play-knappen øverst til venstre i grensesnittet. Det er der du "kjører" appen din.

### Status bar

Viser deg om du har feilmeldinger, eller hva Xcode jobber med.

### Library

En oversikt over:
1. Views
	1. Ulike elementer du kan bruke i grensesnittet dit
2. Modifiers
	1. Hvordan du kan modifisere de samme elementene
3. Snippets
	1. Kodesnutter
4. Media
	1. Om du har lagt inn "assets" i prosjektet (som bilder, video osv., men også farger du har spesifisert for prosjektet)

I biblioteket kan du også søke opp ting, på samme måte som du kunne gjort i en command palette.

### Hva de ulike filene gjør

![[Simens-skjermbilder-01-05-2024-kl06.56.png]]

Om du trykker på fila øverst i hierarkiet (root node) kommer du til innstillingene dine for prosjektet du har gående.

Om du går ned til mappa som heter "test" finner du alle kodefilene dine for prosjektet ditt.

Under mappa som heter Products så finner du den fila som du faktisk laster opp til app store.

#### dittProsjekt.swift-fila

Selve inngangen til appen din. Det viser det brukeren ser til å starte med, nemlig ContentView.

#### ContentView

ContentView har også sin egen fil. Den representerer hva brukeren ser. Og du kan lage flere visninger, men til å starte med vil det være den fila brukeren ser.

For å forhåndsvise koden din kan du bruke simulatoren.

#### Assets

Der du finner farger, ikoner, og alle slags bilder osv. som du vil bruke i prosjektet ditt.

#### Preview Content

Innenfor Preview Content finner du også en mappe som heter `Preview Assets.xcassets`, som er enda et "asset library", men kun ting du holder på å teste. Om det er noe du skal bruke i produksjon flytter du det til 

`Assets.xcassets` i prosjektmappa di.

### Canvas

Du kan forhåndsvise innholdet ditt i canvas-området. I utgangspunktet kan du ikke interagere med grensesnittet der (trykke eller dra deg rundt), men du kan gjøre det dersom du trykker på play-knappen som aktiverer en "live preview".

Du kan også velge ulike enheter, veksle mellom lys og mørk modus.

### Split pane

Overraskende ofte syns jeg det er nyttig å ha to dokumenter åpne ved siden av hverandre. Måten du gjør det i Xcode er ved å velge `Add editor to the right`. Da kan det hende du vil skjule `Canvas`- delen for å kun fokusere på koden. Canvas er altså forhåndsvisninga av det du lager. 

![[Simens-skjermbilder-01-05-2024-kl07.08.png]]

Om du holder nede option-knappen når du trykker på `add editor` så kan du legge den horisontalt under fila di.

Om du vil kjapt åpne en fil, men du vil plassere den ved siden av den fila du allerede har åpen, kan du holde inn option-knappen og trykke på den fila du vil åpne fra navigasjonen på venstresida.



### Kommentarer

For å legge igjen en kommentar i fila di bruker du `//`, som f. eks `// Dette ville vært en kommentar`.


# Grunnleggende kodegreier

Okei, men nå må vi fokusere på hva vi faktisk skal gjøre. Nemlig å skrive kode for å få noe til å skje.

Om jeg åpner opp den fila som heter `ContentView.swift`, siden det er den man vil se i appen, så kan vi starte med denne kodesnutten her (som da er et utdrag):

```
var Body: some view {

Text("Hello world!").padding()

}
```

Først av alt så må koden din befinne seg innenfor krølleparenteser – `{}`.

Deretter velger vi hva vi vil lage, i dette tilfellet er det et tekst-element. Det vil alltid følge med parenteser hvor innholdet ditt plasseres inni – `Text()`. Siden jeg har valgt et tekstelement her må jeg legge til to anførselstegn for å definere hva som skal stå der – `Text("Hello world!").

Den delen som sier `.padding` i kalles en "modifier".

### Modifiers

"Modifiers" er et tillegg til noe annet. Den endrer hvordan noe ser ut eller oppfører seg. Padding f. eks legger til luft/mellomrom rundt et element.

Padding er derimot bare én av mange ulike modifiers du kan bruke. Om vi hadde lagt til f. eks `.background(Color.blue)` ville teksten vår fått en blå bakgrunn. Og plutselig har vi en knapp.

![[Simens-skjermbilder-01-05-2024-kl07.34.png]]

### Hvordan du kan unngå å skrive kode

For å jobbe mer visuelt kan du også bruke biblioteket som jeg nevnte tidligere. Der kan du søke opp alt mulig rart, f. eks `.background()` som vi brukte istad, og bare dra det inn i koden din, for så å redigere det i inspect-panelet på høyresida.

Det kan være spesielt kjekt hvis du ikke er helt sikker på hva som er riktig. Med andre ord, at du ikke er helt kjent med [[syntaks|syntaksen]], eller grammatikken, for Swift.

### Proff-tips

For å åpne opp biblioteket kan du bruke hurtigtasten `cmd + shift + L`. Når jeg da søker opp "background" vil du se noe lignende det bildet her:

![[images/Simens-skjermbilder-01-05-2024-kl07.40.png]]

En ting som er verdt å merke seg er at du ikke kan søke på tvers av de ulike fanene i biblioteket. For som jeg nevnte tidligere så er det fire ulike faner:

1. Views
	1. Ulike elementer du kan bruke i grensesnittet dit
2. Modifiers
	1. Hvordan du kan modifisere de samme elementene
3. Snippets
	1. Kodesnutter
4. Media
	1. Om du har lagt inn "assets" i prosjektet (som bilder, video osv., men også farger du har spesifisert for prosjektet)

Det vil si at du background-modifieren ikke dukker opp om du er i Views-fanen f. eks. Så du må vite det i forkant, "Er det en modifier eller en view jeg er på utkikk etter nå?".

![[xcode-library.mp4|xcode-library]]

## Mer kodegreier

Om du holder inne command-knappen og trykker på et element i forhåndsvisninga di får du opp flere muligheter. Her kan du blant annet trykke på "Show SwiftUI Inspector" som da lar deg redigere et element i inspect-panelet på høyresida, i stedet for å endre det i selve koden.
![[Simens-skjermbilder-01-05-2024-kl08.05.png]]
Der kan du også legge til modifiers direkte på elementet fra dialogboksen som dukker opp.

Det trikset med å holde inne command-knappen fungerer også i koden, bare så du veit det. Og du kan også legge til modifiers derfra, på en mer visuell måte.

![[Simens-skjermbilder-01-05-2024-kl08.08.png]]

## Oversikt over informasjonsflyt

I denne illustrasjonen ser du at View Code er koden som utgjør selve grensesnittet ditt (User Interface). Når brukeren trykker på noe for eksempel så kaller vi det en hendelse, eller et "event", på engelsk. I appen må vi spesifisere at vi vil plukke opp en hendelse som deretter skal føre til at innholdet endrer seg på en eller annen måte.

![[Simens-skjermbilder-13-05-2024-kl21.00.jpg]]
Denne syklusen gjentar seg på nytt, og på nytt, ettersom interaksjoner du har med en app alltid skal føre til et svar fra grensesnittet. Noe som indikerer at appen har forstått at du prøver å gjøre noe, og må derfor gi deg en respons i retur.

## Hva er egentlig data i denne sammenhengen?

## Ulike typer

- Om du skal skrive tekst så må du plassere det mellom to anførselstegn – "som dette".
- `// kommentarer skrives ved å starte en setning med to skråstreker`

#### Oversikt

| Hva det er     | Hvordan du skriver det |
| -------------- | ---------------------- |
| String         | `"hallo"`              |
| Int (integer)  | `12`, `10`             |
| Double         | `0.4`, `1.2`           |
| Bool (boolean) | `true`, `false`        |

Alle disse typene oppsummeres som "data types" i Swift, og er de mest vanlige typene man snubler over. Det betyr at det finnes flere, men at det er et godt utgangspunkt for å komme i gang.

### Hvordan du introduserer en verdi til systemet

For å bruke en verdi må du erklære (?) – på engelsk heter det "to declare a new variable" – variabelen din. Du må erklære at du vil lage en ny variabel. Måten du gjør det på er ved å skrive `var` etterfulgt av hva du vil at den skal hete – `var myVar`, siden det er min variant.

Etter det må du spesifisere hva variabelen skal inneholde, altså hva slags type data den skal brukes til. I dette tilfelle vil jeg at den skal inneholde tekst, og at det skal stå hallo. For å gjøre det må jeg først definere hva slag variabel det er, og det gjør du ved å legge til et kolon etter navnet du har valgt på variabelen – `var myVar:String`.

Deretter vil jeg definere hva slags tekst det skal være. For å gjøre det legger vi til et erlik-tegn, som kalles en "assignment operator", på engelsk. Da blir det seende sånn her ut – `var myVar:String = "hallo"`.

Om jeg da vil bruke dette i tilfellet med [[samtalekort-appen]] kan jeg skrive noe sånt som – `var questionEnthusiastic:String = "Hva er det som gjør deg gira eller engasjert nå om dagen?"`.

Om jeg da vil hente fram det spørsmålet til seinere, f. eks hvis jeg lager en liste med spørsmål, så kan jeg si at `questionEnthusiastic` skal inkluderes. Så vil hele spørsmålet inkluderes. Det kan vi faktisk teste ved å kjøre en kommando som heter `print()`. For å få det til å funke må du da bare legge til navnet på variabelen din mellom parentesene – `print(questionEnthusiastic)`.

![[xcode-print.mp4]]

Men hva om du vil introdusere en verdi som ikke er tekst, altså noe annet enn en "string"-type? Da må du bare huske å definere det når du introduserer verdien. Om du vil 