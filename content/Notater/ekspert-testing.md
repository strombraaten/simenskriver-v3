---
type: notat
stage: done
why: share
date: 2024-04-28
lastmod: 2024-04-28
tags:
  - design
  - nyhetsbrev
aliases:
  - Hvorfor ekspert-testing burde være en del av designprosessen
title: Ekspert-testing som en del av designprosessen
publish: true
slug: ekspert-testing
---
I boka ["Don't make me think"](https://www.goodreads.com/book/show/18197267-don-t-make-me-think-revisited?from_search=true&from_srp=true&qid=MwSkLWxcUt&rank=1) snakker Steve Krug om noe han kaller "expert usability review", og det er et konsept som er verdt å utforske litt nærmere.

## Hva handler boka om

Om du ikke kjenner til boka fra før så er det en lettlest, liten klassiker av en bok (innenfor designmiljøet), som handler om å designe ting som mennesker interagerer med – uavhengig om det er en app, en mikrobølgeovn, eller en minibank.

Forfatteren selv skriver at *"Selv om teknologien endrer seg fort så handler fremdeles brukervennlighet om folk, og hvordan de forstår og bruker ting. Ikke om selve teknologien. For selv om teknologi endrer seg fort, så endrer folk seg veldig sakte."*

Med sine 216 sider er boka forholdsvis kort, i tillegg til at den inkluderer en del bilder, men personlig har jeg bare lest litt av den. Samtidig så har jeg lært mye av det lille jeg har lest, og det vil jeg dele med deg.

## Gjennomgang med eksperter

Han begynner boka med å forklare hva han jobber med, som en "usability consultant". Og nå skal det sies at tilnærminga kanskje har endra seg litt siden han skreiv det for godt over 20 år siden, men det er fremdeles relevant å forstå seg på.

For han nevner at folk ("kunder") sender han noe som de jobber på, og det kan være alt fra en nettside de holder på å lage, en link til noe de skal redesigne, eller en prototype til en app. 

> I try using what they send me, doing the things that their users would need or want to do with it. I note the places where people are likely to get stuck and the things that I think will confuse them (an “expert usability review”).

Måten han legger det fram på så er det noe han gjør på egenhånd. Det *kan* være relevant om du kommer inn på et nytt prosjekt, men samtidig er det sannsynligvis ingen som har spørt deg om en pirkete gjennomgang av alt som er gjort fram til det punktet. Som oftest er heller behovet at du bare skal produsere og videreutvikle på det som finnes, fra dag én.

### Tilpasning til dagens prosesser

Sånn som designprosesser er nå til dags, opplever jeg at det er mer aktuelt å tilrettelegge for at *noen andre* kan gjennomføre en vurdering av noe du *sjøl* har lagd. At du bruker designmiljøet rundt deg for å vurdere hvor sluttbrukeren kan sette seg fast, eller få problemer. Hva enn som kan skape frustrasjon, rett og slett.

Jeg veit ikke med deg, men personlig vil jeg i grunn teste så mye som mulig. Det er derfor jeg har skrevet om en laaang artikkel om [[brukertesting|verdien av fortløpende brukertesting]]. Ikke bare fordi det er gøy (for det er det virkelig), men også fordi jeg blir bedre kjent med hvem jeg gjør denne jobben for. Hva de egentlig vil oppnå, og jeg forsterker forståelsen min av hvem sluttbrukerne egentlig *er*. Og hva de syns er vanskelig, og hva de syns er overraskende lett. 

Måten vi skaffer den kunnskapen på er ofte gjennom intervjuer eller brukertester. Det er noe vi gjør for å se om tjenesten vår henger på greip. Det kan riktignok være mer omfattende å stelle istand. Og spesielt når du er innleid som konsulent opplever jeg at du må være strategisk med hva du vil teste, og hvor ofte du vil foreslå å gjøre det. Geriljatesting, eller interntesting på "liksombrukere" kan være alternativer, og har absolutt sin plass fra tid til annen, men blir fort mer overfladisk.

Ved å heller bruke ekspertene rundt deg kan du derimot luke vekk småfeil på et tidlig stadiet, uten å bruke masse tid på rekruttering og planlegging.

### Hva man burde se etter

Poenget med en "expert usability review" er å sette fingeren på såkalte "usability issues". Altså utfordringer eller feil med designet du jobber med. Som designere, og utviklere også, er vi unikt godt egna til å si om noe følger *vanlige* bruksmønstre eller ikke.

For det er ikke alle som tenker over om lagreknappen skal være til høyre, mens avbryt-knappen skal være til venstre. Men *vi* tenker over det. Det er iallefall vi som har muligheten til å spille sluttbrukeren god, ved å benytte bruksmønstre de allerede er vant til. Å lene vårs på [etablerte konvensjoner](https://okse.no/artikler/nielsens-10-heuristikker-for-ui-design-p%C3%A5-godt-norsk), som det heter så fint.

De fortløpende vurderingene der er nok noe de fleste designere gjør uten å tenke på det. Om du oppdager at du har for mange knapper i designet ditt som har fått en "primary" funksjon, altså at den skal skrike til sluttbrukeren for å si "HER SKAL DU TRYKKE FOR Å KOMME DEG VIDERE", så ville du kanskje ikke kalt det en "usability issue". Men du ville nok anerkjent det som en utfordring i brukeropplevelsen.

![[images/primary-button.jpg]]

Sånn sett syns jeg det er nyttig å anerkjenne at den handlingen har et begrep. At det er en greie liksom. Nettopp for at du skal leite etter det oftere. Da kan du spørre deg sjøl og andre – hvilke *usability issues* har vi her? Eller aller helst kan vi finne et norsk alternativ, men de forslagene her ruller ikke akkurat av tunga foråsirresånn – brukbarhetsproblemer, brukeropplevelsesmangler, brukervennlighetssvakheter. Da blir det fort "UX-svakheter", eller om man ser noen "feil med brukbarheten".

### Bedragersyndrom og selvtillit

Det å anse seg sjøl som en *ekspert*, som skal bidra i en "expert usability review", kan nok være vanskelig for mange. For det er garantert ikke bare jeg som har kjent på [[imposter-syndrome|bedragersyndromet]] før. Samtidig er det viktig å tenke over hvem vi sammenligner vårs med i det tilfellet. For hvis du har interesse av, eller erfaring med å designe grensesnitt, og du slenger rundt deg med begreper som *empty state*, *sekundærknapp*, og [alle størrelsene du bruker er delelig på 8](https://medium.com/swlh/the-comprehensive-8pt-grid-guide-aa16ff402179).. Ja, da vil jeg si du er en ekspert, sammenligna med mange andre.

![[pasted-image-20240428102334.png]]

On the flip side, så er det en nydelig mulighet til å gi andre følelsen av å *være* en ekspert, bare ved å spørre om hjelp til å vurdere arbeidet ditt. For det er jo et skikkelig kompliment når noen er genuint interessert i din mening, for å forbedre designet de jobber med. Det å øke andres selvtillit kan altså være en undervurdert gevinst av å introdusere denne formen for ekspert-testing i designmiljøet ditt. 

## Avslutning

Mange av vårs, inkludert meg sjøl i aller høyeste grad, bruker altfor mye tid på å surre rundt i våre egne hoder. Hvor vi prøver å tenke vårs ut av en problemstilling. Tid som hadde vært bedre brukt på å spørre noen andre, og observere deres tanker, fremfor å prøve og forstå dine egne.

I blant er det mye mer virkningsfullt å *gjøre*. Ikke tenke. En ekspert-testing med en kollega, enten om det er innad i samme bedrift eller en bransjekollega, kan være én måte å skape momentum på, for å forbedre det du jobber på. Eller så kan du eventuelt prøve å bruke [[kunstig-intelligens-som-sparringspartner|kunstig intelligens som sparringspartner]]?

Når alt kommer til alt så vil sluttbrukeren være eksperten på selve oppgaven de skal oppnå med verktøyet ditt. For det er nettopp hun eller han vi lager tjenesten for, og tilrettelegger arbeidsflyten etter. Samtidig er det designere som tilrettelegger for hvordan det skal føles og oppleves. Og det vil være lettere for to designere å si at navigasjonen på den-og-den sida vil være problematisk fordi det er ingen opplagt måte å bevege seg fra A til B på.

For en sluttbruker, som ikke har design som sitt fagfelt, men som er ekspert på noe helt annet, så vil de nok ikke påpeke navigasjonen som problemet, men heller den overordna følelsen. At det føles rotete, eller at de er usikre på hva de skal gjøre. Derfor kan det være nyttig å innføre ekspert-tester som en del av prosessen din, for å vurdere brukeropplevelsen fortløpende.
