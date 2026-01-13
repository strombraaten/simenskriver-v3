---
date: 2023-10-27
lastmod: 2023-10-27
tags:
  - design
aliases:
  - variabler i Figma
title: Variabler i Figma
publish: true
slug: figma-variabler
---

## Notater

- Figma sine variabler lar deg lage avansert prototyping mye enklere. Det finnes fire ulike typer
	- Color
	- Number
	- String
	- Boolean
- Hvordan lage en variabel.
	- Trykk på `Local variables
		- Create variable
			- Velg hvilken type (Color, Number, String, Boolean)
				- Fyll ut navn + verdi
- Variabler organiseres innenfor `collections`
	- En collection kan deles inn i flere grupper
		- Modes
- Tre ulike typer nivåer
	- Primitive
		- Også kjent som `core`
	- Semantics
		- Navngis etter hva variabelen skal brukes til, slik at navnet gir informasjon om formål, betydning, hva og hvor de skal brukes. Disse kan man bruke i arbeidet, som kan ha navn som:
			- text/primary
			- spacing/light
			- background/secondary
	- Components
- Hvem lager du systemet for?
	- Hvor komplekst skal det være?
- "Expressions" i prototyper lar deg manipulere verdien med en rekke operasjoner. Det finnes to typer
	- `Set variable`
		- Brukes til å endre verdier på tall, strenger og booleans
	- `Conditionals`
		- Lar deg lage reglerfor det som skal skje. Conditionals skrives med if/else-logikk
- Disse to kan brukes i samme handling og rekkefølgen er viktig. Handlingene vises når prototypen spilles av.
