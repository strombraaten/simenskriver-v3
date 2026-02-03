---
type: notat
date: 2023-05-21
lastmod: 2023-05-21
tags:
  - nyhetsbrev
  - design
  - kode
aliases:
  - Hva holder jeg på med?
title: Hva holder jeg på med?
publish: true
slug: hva-holder-jeg-på-med
---
Nå høres det ut som at jeg er kritisk til hva jeg sjøl driver med, men jeg syns det er nyttig å reflektere over hva jeg faktisk prøver å få til.

## Designforbedringer på hjemmesida

I det siste har jeg prøvd å tilpasse hvordan du registrerer deg til nyhetsbrevet. For øyeblikket har jeg bare copy-paste'a [det jeg får fra Buttondown](https://docs.buttondown.email/getting-started/building-your-subscriber-base) (nyhetsbrev-tjenesten), men da er det ikke like lett å endre den lysegrå bakgrunnsfargen, eller fargen på knappen også videre. Derfor har jeg prøvd å lage det fra bunnen av, men da blir jeg fort møtt i døra av min egen inkompetanse.

I bildet under får du se den nåværende versjonen, og det jeg jobber med stabla over hverandre. Hvis du syns det er vanskelig å se hva som står på bildet, så er det fordi det er en mørk tekst på en mørk bakgrunn. Og du trenger ikke være en designer akkurat for å skjønne at det blir feil.

![[images/buttondown-subscribe.png|Skjermbilde av to ulike alternativer for å registrere deg til nyhetsbrevet]]

Da kommer nemlig CSS inn i bildet, hvor du bestemmer hvordan det skal se ut visuelt sett. Du kan se på det som at HTML gir deg byggeklossene å jobbe med, at du har et avsnitt med tekst, en knapp, et bilde, også gir CSS deg mulighetene til å "style" de byggeklossene.

Som med mye annet vil det også være en smart måte å jobbe på, og en.. mindre smart måte å jobbe på. I dette tilfelle vil en mindre smart måte være å "hardkode" det. Altså ved å si at akkurat den ene knappen skal ha denne blåfargen (#4E80EE). En smartere måte vil være å tilrettelegge for at alle knapper av den typen, uansett hvor på sida de befinner seg, vil ha den spesifikke fargen, størrelsen, mellomrom, skrifttype og alt mulig rart.

Så det er det jeg har prøvd på under her, hvor jeg lagde min første [flexbox](https://www.youtube.com/watch?v=phWxA89Dy94) 🥳

![[images/flexbox.png]]

Jeg møtte riktignok på noen andre kode-utfordringer på min vei, så den "gamle" måten å registrere seg til nyhetsbrevet forblir inntil videre, men det kommer etterhvert.

### Down the rabbit hole I go

I mellomtida har jeg innsett at nå har jeg et "rabbit hole" foran meg, og at det vil bli mye lettere å gjøre endringer dersom jeg faktisk har en bed re forståelse av hva jeg faktisk driver med. Og det er så mye morsommere å bare hoppe ned i et sånt kaninhull først som sist, og ikke tenke for mye på det. Så nå lener jeg meg bare inn i det, og bruker det momentumet jeg har for å sette fart.

<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/4BgQaxfQfeqys" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div>

For å bli mer dedikert til å lære meg noe nytt har jeg god erfaring med å investere en liten sum (450 kr i dette tilfelle) for å følge et tilpassa opplegg, som også tilrettelegger for praktisk erfaring. Jeg gjorde det samme med [piano](https://apps.apple.com/us/app/simply-piano-learn-piano-fast/id1019442026?platform=ipad), og ["fingerdrumming"](https://www.melodics.com/finger-drumming), og storkoste meg med prosessen.

Nå bruker jeg [en app som heter Mimo](https://mimo.org/) for å lære meg mer om HTML, CSS, og bittelitt Javascript. Faktisk så skriver jeg ned noe av det jeg lærer underveis, så hvis du vil ta en kikk på notatene mine kan du [se hva jeg har lært om HTML](https://www.simenskriver.no/notes/HTML/), og [hva jeg har lært om CSS](https://www.simenskriver.no/notes/CSS/). Det er ikke så mye å skryte av for øyeblikket, men forhåpentligvis kan det senke terskelen for andre til seinere.

## En åpenbar åpenbaring

Det som fikk meg til å gå aktivt inn for å lære å kode riktignok var at jeg innså at jeg prøvde å forbedre designet ved å gjøre direkte endringer i koden. Uten å egentlig vite hva jeg holder på med. Nå skal det sies at det er utrolig motiverende å lære seg noe nytt når det betyr at du kan endre på noe du syns er stygt, men det går neimen ikke fort.

Det er i grunn sånn jeg har lært meg alt av kode fram til nå, at det er noe jeg virkelig vil endre på, også lærer jeg meg nøyaktig så mye som må til for å endre på det. Ikke noe mer.

Samtidig så jobber jeg jo som designer på dagtid, så hvorfor ikke bruke de ferdighetene jeg har der, i stedet for å knote rundt med kode som jeg ikke forstår?

## Hva som skjer på designfronten

Hva betyr det i praksis? At jeg har begynt å lage et miniatyrisk designsystem, som gir meg retningslinjer for:

- Hvor mye luft det skal være mellom ulike "elementer" (også kjent som "spacing"). Det kan være mellomrommet fra en overskrift til selve brødteksten, eller mellom setninger i en punktliste som det du ser på nå
- Fargebruk. Spesielt hvordan linkene vises, siden de er en essensiell del måten [simenskriver.no](http://simenskriver.no) er lagd på – hvor ett tema linker videre til noe annet.
- Typografi, eller størrelsen og utseendet til overskrifter, linker, og alt av tekst på sida

### Hvor starter man da?

Å lage designsystemer fra bunnen av er noe jeg har lite erfaring med egentlig. Som regel er det noe som blir til underveis, når du skal lage mer og mer greier innafor samme stil. Hvor det da blir et åpenbart behov for at ting skal både se, og føles likt ut, uansett hvor på sida du befinner deg.

Nå starta jeg iallefall med å gjenskape det du ser på hjemmesida, bare i [et designprogram som heter Figma](https://figma.com/). Da tar jeg et skjermbilde av sånn sida ser ut i dag, også lager jeg det fra bunnen av. Ved å gjøre det presser jeg nemlig meg sjøl til å ta avgjørelser underveis, om alt fra spacing, til typografiske valg og fargebruk. Samtidig samler jeg inn eksempler jeg liker, fra andre folk. Som f. eks hvor luftig og lettlest [sida til Jay L. Colbert](https://wilde-at-heart.garden/pages/about/) er.

### Typografi og spacing

For øyeblikket har jeg kommet hit:

![[images/simen-skriver-profilfarge.png]]

Her introduserer jeg en slags profilfarge som også vil påvirke mange andre fargevalg (som understreking av linker, bakgrunn på knapper osv.).

### Fargebruk

Valg av farger er nok det jeg har minst erfaring med, når du skal jobbe systematisk med design. Derfor var det veldig lærerikt for å se [en introduksjon til hvordan du kan bruke HSB-skalaen for å definere fargenyanser](https://www.youtube.com/watch?v=yYwEnLYT55c).

HSB står for _hue, saturation, brightness_, og tilrettelegger for en mer matematisk utregning av fargene du velger. Som var til overraskende stor hjelp.

Eksempelet under ser veldig ferdig ut, men for å lande på de riktige nyansene må de testes i bruk først, for å se om det passer inn der hvor det skal brukes. Så denne oversikten er mer et generisk utgangspunkt i grunn:

![[images/shades-of-color.png|Nyanser av fem ulike farger]]

Anthony Hobday har [en oversikt over visuelle prinsipper](https://anthonyhobday.com/sideprojects/saferules/) som jeg stadig kommer tilbake til. Deriblant det her med å gi litt farge også til de nøytrale nyansene dine, som blei ekstra tydelig da jeg sette det opp på denne måten:

![[images/shades-of-grey.png|Nyanser av gråtoner]]

Det er små forskjeller mellom de tre ulike fargesammensetningene på bildet, men ved å ha et bittelite drypp av de fargene som ellers brukes i profilen så vil det forhåpentligvis føles mer helhetlig når alt kommer til alt.

### Men.. hvorfor?

Mange grunner! For øyeblikket er det for svak kontrast mellom bakgrunnen på sida og hvordan linkene ser ut blant annet. Det er ikke bra nok med tanke på universell utforming, og noe jeg vil endre på.

![[images/analyse-av-kontraster.png|Analyse av kontraster på dagens versjon av simenskriver.no]]

Også fordi jeg har et behov for å være tydelig i feilmeldingene mine. Eller hvordan sida mi informerer deg om at noe ikke finnes, eller noe er under arbeid. Siden jeg publiserer notater som ikke er "ferdig", og som ofte kan linke til sider som ikke ennå finnes er det desto viktigere å være tydelig om det.

## Uventa fordeler

Å være den som både designer og utvikler en digital greie er nytt for meg, men det er også utrolig spennende. For jeg er utvilsomt min egen største kritiker, så jeg vil at det skal bli bra. Samtidig kan jeg minimalt om koding, så da er det en fordel om jeg er så tydelig i mine design-instrukser som jeg kan. På den måten blir jeg ikke bare en drastisk bedre utvikler, om jeg kan kalle meg det, men jeg blir også en langt bedre designer. For jeg får den forståelsen om hva som kreves for å utvikle det jeg ser for meg.
