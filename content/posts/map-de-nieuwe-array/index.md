---
author: 'Jens van Hellemondt'
title: 'Map: de nieuwe array'
date: '2021-04-30' 
published: false
tags: ['Javascript', 'Vue', 'Array', 'map']
canonical_url: false 
description: ''
cover_image: '' 
cover_credit: ''
---

## De nieuwe array

*Itereren over een array, dat kan op meerdere manieren. In mijn begintijd gebruikte ik vooral een `for`-loop en sporadisch
eens een `while`-loop (**imperative coding**). Tegenwoordig maak ik gebruik van "array methods", zoals `.map`, `.filter`
, `reduce`, `.some` en nog veel meer (**declarative coding**). Iedere method heeft zo zijn use-case, en map is een method die ik veel gebruik.*

## Waarom map als je een for-loop kan gebruiken?

Zodra je map door hebt, heeft map een aantal voordelen. Hieronder de voordelen, waar ik later verder op in ga.
* Jij en je mede-coders, weten precies wat de uitkomst is van de map,
* Geen gebruik van variabelen buiten je iteratie/ scope, om je iteratie mee te regelen,
* Zekerheid jouw handeling voor ieder element in de array uitgevoerd wordt, 
* Minder code om hetzelfde te bereiken,
* Behoudt van de oorspronkelijke array.
