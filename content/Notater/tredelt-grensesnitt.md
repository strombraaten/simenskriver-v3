---
type: notat
stage: done
why: share
date: 2025-03-23
lastmod: 2025-03-23
tags:
  - design
title: Det tredelte AI-grensesnittet
publish: true
slug: tredelt-grensesnitt
description: Det virker som det etableres en slags "best practice" når det kommer til tekstbaserte AI-verktøy nå. Hvor alle baserer seg på et tredelt grensesnitt som gjerne viser en oversikt, en chat, og et fortløpende resultat.
---
Oversikt. Chat. Fortløpende resultat. 

I verden av grensesnitt for AI-chatter er det de tre fasene eller stegene som går igjen. Du har oversikten på venstre side. Chatten i midten, hvor du starter med en løs tanke, og spisser det gradvis inn i det som blir resultatet ditt.

Her kan du se det i [ChatGPT](https://chat.openai.com/):
![[images/chatgpt-eksempel-tredeltgrensesnitt.jpg|eksempel på tredelt grensesnitt i ChatGPT]]

Og sånn her ser det ut i [Claude](https://claude.ai/):
![[images/claude-eksempel-tredeltgrensesnitt.jpg|eksempel på tredelt grensesnitt i Claude]]

Oversikten og chatten har blitt mer og mer etablerte bruksmønstre de siste årene. Oversikten viser en historikk over tidligere samtaler eller tråder, hva enn du vil kalle det. Chatten er der du skriver fram og tilbake med språkmodellen du har valgt. Det resultatet på høyresida derimot, som oppdateres fortløpende, det er nytt. 

## Det fortløpende resultatet

Anthropic, selskapet bak Claude, kaller det "Artefacts". OpenAI, selskapet bak ChatGPT, kaller det "Canvas". De fungerer litt ulikt, men essensen er det samme.

Fellesnevneren er at de enten samler resultatene fra chatten, f. eks hvis du skriver en artikkel som denne, eller at forslag på kode skrives ut foran øya dine. Grafer lages basert på tallene du har gitt i chatten, også videre.

Den store fordelen med et panel som viser deg et fortløpende resultatet er at en AI-chat blir fort rotete hvis du ikke har en måte å ta vare på de gode svarene underveis. En setning her, og en setning der. Sånn klipper du og limer sammen det endelige resultatet ditt. 

### Markere for å interagere

Det første svaret du får er sjeldent det beste, og det siste svaret mangler kanskje noen viktige punkter som har blitt nevnt tidligere. Derfor er det et behov for å spare på ting underveis, og samle det. 

Optimalt sett kunne du markert teksten du vil ta med deg videre fra chatten, på samme måte som du guler ut noe i en bok, samtidig som det da listes opp i panelet på høyresida. Eller at du i det minste får en dialogboks med handlinger, som du gjør i Cursor.

![[images/cursor-inline-editing.jpg|eksempel på "in-line editing" i Cursor-appen]]

Både ChatGPT og Claude gir deg muligheten til å redigere teksten på den måten, men kun i panelet på høyre side – i selve resultatet du har fått. Ikke i chatten.

![[images/chatgpt-inline-editing.jpg|eksempel på in-line editing i ChatGPT]]


## Videre utforskning

[NotebookLM, fra Google](https://notebooklm.google/), bruker den samme tredelingen, men bruker heller det venstre panelet til kilder, og det høyre panelet til lag-en-podkast-ut-av-hva-som-helst-funksjonen deres.

![[notebookLM-default.png]]

![[images/notebooklm-eksempel.jpg]]

Oversikten over trådene, eller i dette tilfellet "notatbøkene" finner du på en dedikert side ved å trykke på hjem-ikonet øverst til venstre ved tittelen.

![[images/notebooklm-oversikt.png|oversikt over tråder i NotebookLM]]
Google har også gjort noen snedige valg når det kommer til å tilpasse designet til skjermstørrelsen. Når skjermen blir mindre enn en viss størrelse blir panelene delt opp i faner i stedet.

![[images/notebook-responsivitet.jpg|inndeling i faner i NotebookLM]]

Det er også noe utrolig tilfredsstillende ved å vise og skjule de ulike panelene nettleseren. Samtidig som du beholder noe av den grunnleggende funksjonaliteten som ligger der, så lenge du veit hva du ser etter.

![[images/notebook-skjule-paneler.mp4|skjuler og viser paneler i NotebookLM]]

## Avslutning

Det tredelte grensesnittet er ingen fasit. Samtidig er det spennende å se at det dukker opp mønster for hvordan vi bruker kunstig intelligens for å blant annet generere tekst.
