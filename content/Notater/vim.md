---
date: 2024-03-23
lastmod: 2024-03-23
tags:
  - teknologi
aliases:
  - en introduksjon til Vim
title: En enkel introduksjon til Vim
publish: true
slug: vim
---

*Vim* er noe jeg har dansa forsiktig rundt over en lengre periode nå. På samme måte som når du ser en elg i skogen. Først så skvetter du. Samtidig er du fascinert over hva du ser, så du vil gjerne se litt til. Så du prøver å gå rolig forbi for å vise at du ikke er ute etter bråk, for du er redd for hva som skjer dersom du blir værende for lenge. Og når du har fått litt avstand så tar du beina fatt og løper avgårde.

Sånn har forholdet mitt vært til Vim. Fram til nå.

### Enkel sammenligning

For å forklare hva Vim er så kan vi sammenligne det med noe du *kanskje* kjenner til fra før av. For noen vil det nok være grunnleggende, men for andre vil det rett og slett være *mind-blowing* 🤯

Om du skal markere all tekst i et notat, eller i en tekstboks, har du kanskje gjort det ved å holde inne `cmd`-knappen og trykke på `a` (for `all`).  Hva med å flytte deg rundt i en setning ved å holde inne `alt/option`-knappen mens du bruker piltastene? Har du prøvd det?

Det som skjer da er at du hopper ett og ett ord bortover i en setning. Om du holder inne `command`-knappen derimot og trykker på høyrepila hopper du til slutten av den linja du er på (venstrepila sender deg altså til starten). Om du holder inne `shift` samtidig så markerer du også teksten.

Det samme gjelder også med `backspace`-knappen din. Om du holder inne `alt` og trykker på `backspace` sletter du ordet som er til venstre for musepekeren. Om du holder inne `command` i stedet sletter du alle ordene på den linja du er på (til venstre for musepekeren riktignok).

De hurtigtastene, eller snarveiene, bygger altså på hverandre. Kun ved å lære at alt/option og command endrer *hvor mye* av teksten du redigerer så kan du bruke det i to ulike situasjoner.

Når du først får det inn i fingra så går det ganske kjapt å bevege seg rundt i en tekst. Det som er kjipt er at det egentlig stopper der. Da har du nådd toppen av effektivitet tydeligvis. Eller.. Har du det?

## Hva vi kan lære av et 50 år gammelt dataprogram

Det er nemlig her Vim kommer inn i bildet. Vim står for "Vi IMproved", siden det er en videreutvikla versjon av et program fra 1976, som het "Vi". Altså 48 år siden 🤯 Da så dataen sånn her ut:

![[images/Pasted image 20240324221827.png|Lear Siegler's ADM-3A computer terminal]]

Det fantes altså ikke noen musepeker på den tida. Og det eneste du hadde var tekst på en skjerm og tastaturet foran deg. Det viser seg at Vim gir deg *betraktelig* flere muligheter for å redigere tekst i en fei, sammenligna med det vi gjør i dag. Ikke bare det, men også mer presist. Du kan nemlig:

- Bevege deg `x antall` linjer opp eller ned
- Hoppe over `x antall` ord i en linje for å havne nøyaktig dit du vil være
- Legge igjen et "merke i margen" som gjør at du kan hoppe til det spesifikke punktet uansett hvor i teksten du befinner deg seinere. Eller hoppe mellom ulike merker i margen.
- Og hvis jeg forstår riktig så kan du også kjapt fikse opp i gjentagende skrivefeil. Om du plutselig oppdager at ordet "i fjor" ikke har en D på slutten, men du veit at du har skrevet det 5-6 ganger i teksten din kan du kjapt finne alle steder du har gjort samme feilen, og rette det opp én gang, i stedet for å gjøre samme endring 5-6 ganger
	- Om jeg forstår riktig kan du til og med endre det på tvers av flere dokumenter

Er det her nødvendig? Overhodet ikke. Er det gøy? Å jada!

### En artikkel i flere deler

Siden det er litt omfattende å sette seg inn i deler jeg det opp i flere deler. I første omgang tenker jeg det er nyttig med en introduksjon. Samtidig har jeg begynt på [[vim-oppslagsverk|et slags oppslagsverk]], hvor jeg dokumenterer det jeg lærer fortløpende.

Oppslagsverket kan du kikke på allerede, men det er litt hulter til bulter for øyeblikket, siden jeg lærer mer og mer, og strukturerer det underveis.

Sist, men ikke minst vil jeg se nærmere på hvordan jeg kan tilrettelegge for Vim i min arbeidsflyt. Enten om det er for å skrive artikler i Obsidian, eller å kode på mitt enkle vis til simenskriver.no. 

### Hva er det?

Først er det viktig å skille mellom *Vim*, [som er et program](<https://en.wikipedia.org/wiki/Vim_(text_editor)>) brukt til koding, og *Vim motions*, som er hurtigtastene du bruker, som er tilgjengelig mange andre steder og ikke bare i vim-programmet. Jeg kommer til å snakke om Vim motions, men det virker som folk flest bare omtaler det som kun Vim, selv om man ikke egentlig snakker om programmet, så da gjør jeg det og.

#### Vim motions

*Vim motions* er måten du navigerer og redigerer tekst på. Ikke noe mer hokus-pokus. Det kan såklart være et kodespråk, eller det kan være en artikkel som det her.

Det som er fascinerende er at det er såpass effektivt at det brukes av mange den dag i dag. Og at den tilnærminga, eller de "hurtigtastene", om du vil, har blitt så populære at det er funksjonalitet for det i mange ulike kodeprogrammer gjennom plugins og mer avanserte innstillinger.

### Eksempel

I stedet for å holde inne `alt/option`-knappen og bruke høyre piltast for å bevege deg til slutten av et ord, ville du med Vim bare trykt på `e`. Om du skulle bevegd til starten av et ord ville du trykt på `w`.

![[images/vim-demo-we.gif]]

Nå tenker du kanskje "Men.. vil det ikke da være en `e` eller `w` i setningen min?". Å neida du! For Vim er bygd opp av ulike moduser.

## Modusene i Vim

I hovedsak kan vi fokusere på tre moduser, selv om det finnes flere tydeligvis. De tre modusene er:

1. Insert mode
2. Normal mode
3. Visual mode

### Insert mode

"Insert mode" er der du faktisk skriver teksten din. For å aktivere Insert mode trykker du på `i` (for "insert"). Da vil ting oppføre seg nøyaktig som du er vant til.

Når du derimot er ferdig med å skrive og skal bevege deg rundt i teksten, kanskje flytte deg lenger opp i avsnittet for å slette noen unødvendig fyllord, trykker du på `escape`-knappen for å aktivere "Normal mode".

![[images/vim-demo.gif]]

### Normal mode

"Normal mode" er der man bruker mest tid. I stor grad er det her du redigerer teksten din. Det som skiller Normal mode fra alt annet du er vant til riktignok er at om du trykker på bokstaven `w` f. eks så dukker det ikke opp en bokstav, sånn som jeg nevnte tidligere, men du flyttes til starten av neste ord.

Bokstavene blir altså tolka som hurtigtaster. De fleste av vårs er nok vant til at hurtigtaster involverer en kombinasjon av `command`-knappen + en eller annen bokstav, eller om du skal ta et skjermbilde så må du holde inne `command`, `alt/option`, og tallet 3. I Normal mode i Vim derimot er alt en hurtigtast. De er bare lettere tilgjengelig. Når du *kan* dem riktignok.

### Visual mode

Visual mode har jeg ikke lært meg så mye om ennå, men jeg har lest meg opp til at det er der du markerer, kopierer, og limer inn tekst. Den delen av tekstredigering hvor folk flest ville brukt datamusa til å markere et utdrag av en setning. For å aktivere visual mode trykker du på `v`.

### Én fordel med å jobbe modusbasert

Siden Vim er basert på ulike moduser tvinger det deg til å skille *skriving* fra *redigering*. Det sies at Hemingway har sagt ["Write drunk. Edit sober"](https://medium.com/@Strombraaten/write-blind-edit-later-d0bbfc0ca330). På sett og vis er det akkurat det Vim tvinger deg til å gjøre, ved å skifte mellom skrive- og redigeringsmodus (insert og normal mode).

## Hvorfor vil du kaste deg ut i det der?

Jeg er en stor tilhenger av å lære meg noe én gang som jeg vil dra nytte av over lang, lang tid. Det er en av grunnene til at jeg lærte meg Colemak – en alternativ layout for tastaturer, hvor de bokstavene du bruker mest faktisk er lettest tilgjengelig, noe som *ikke* er tilfellet med QWERTY-layouten som vi alle har vært vant med siden skrivemaskinene på slutten av 1800-tallet.

Det jeg syns er fascinerende med Vim er hvordan det gjør det mulig å forflytte seg rundt i et tekstdokument på en helt annen måte enn jeg er vant til. Du trenger ikke bruke musa på samme måte, som kan redusere anstrengelsen på underarmen din. Samtidig som du begrenser ubehagelige bevegelser til et minimum.

Om jeg begynner å bruke Vim så kommer jeg ikke til å skrive artikler fortere. Det tror jeg ikke. For det hjelper meg ikke med å *tenke* fortere. Det tar den tida det tar. 

Redigeringa av det jeg har skrevet derimot, tida jeg bruker på navigere meg rundt i et dokument, eller finne fram til ett ord for så å erstatte det med noe annet, også gjenta det flere steder, hvis det er en følgefeil. *Det* er noe som kan gå betraktelig fortere. Og viktigst av alt så virker det gøy rett og slett.

Å gjøre noe bare fordi det er gøy er noe jeg syns er undervurdert. Å lære meg Vim er en utfordring hvor jeg må gå opp noen nye nervebaner i hjernen min, og det syns jeg virker spennende. Så nå kjører vi i gang.

### Anbefalinger

Det her høres for godt ut til å være sant, men du kan faktisk spille et old scool Zelda-lignende spill for å lære Vim. [Doron Linder lagde spillet Vim Adventures](https://www.youtube.com/watch?v=rvZVqw63cK4) for at du skal kunne lære det grunnleggende, steg for steg, i et rolig og pedagogisk tempo, hvor du må repetere flere ganger underveis.

> You play a blinking cursor appearing one day in a semi text based world of Textland inhabited by little people but ruled by bugs.
> 
> ..You start the game with only the ability to move up, down, left, and right. As you progress, you talk to people and collect items and keyboard buttons. Each keyboard button adds to the set of commands you can give the cursor, until you master VIM.

![[images/vim-adventures.mp4|vim-adventures]]

Etter nivå 3 må du riktignok betale en lisens på 370 kr, noe det absolutt er verdt, hvis du faktisk vil gi det et forsøk.

Eller så kan du hoppe inn i terminalen og skrive `vimtutor` og trykke på enter, så dukker det magisk opp en introduksjon som du kan leike deg med. Der har jeg lært masse.

![[images/vimtutor.mp4|vimtutor]]
