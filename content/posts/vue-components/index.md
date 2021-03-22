---

[format:off]: <> ( @formatter:off)
title: 'Vue components'
date: '2021-03-22'
published: false
tags: ['vue', 'vue3', 'component', 'string template component', 'component options', 'single file component']
canonical_url: false
description: 'Componenten, je ontkomt er tegenwoordig niet meer aan. Alle grote Javascript-frameworks (Vue, Svelte, Ember, React,
Angular etc..) hebben een vorm van componenten. Persoonlijk ben ik een fan van componenten. Het zorgt er bij mij voor
dat ik eerder gebruikte code, niet nogmaals hoef te schrijven, of te kopiëren en te plakken.'
cover_image: './assets/elena-koycheva-GUYCM0jhuSA-unsplash.jpg'
cover_credit: '© [Elena Koycheva](https://unsplash.com/@lenneek)'
[format:on]: <> (@formatter:on)
---

import JTextField from './components/JTextField.vue'

## Componenten in de wereld van Javascript

*Componenten, je ontkomt er tegenwoordig niet meer aan. Alle grote Javascript-frameworks (Vue, Svelte, Ember, React,
Angular etc...) hebben een vorm van componenten. Persoonlijk ben ik een fan van componenten. Het zorgt er bij mij voor
dat ik eerder gebruikte code, niet nogmaals hoef te schrijven, of te kopiëren en te plakken.*

## Vue 3 componenten

Ik ga het hebben over componenten in Vue 3.x. Vue componenten zijn er in twee smaken, **
String Template Components** en **Single File Components**. Je kunt ze in een project door elkaar gebruiken, alleen over
het algemeen maakt men een codebase met alleen **Single File Components**. Ter volledigheid schrijf ik over beiden.

### String Template Components

Om een **String Template Component** te maken, dien je een (Javascript) Object aan te maken, met daarin **component
options** en vervolgens dit component beschikbaar te maken voor andere componenten, of voor Vue globaal. Dat ziet er dan
als volgt uit als je in één bestand (meerdere) componenten definieert:

```javascript
const MyComponent = { /* ... component options ... */ }
```

Wanneer je meerdere bestanden gebruikt, dan dien je jouw component te *exporteren*, en dat ziet er weer zo uit:

```javascript
export default { /* ... component options ... */ }
```

*Exporteren kan op meerdere manieren, op deze manier doe ik het zelf doorgaans (default export, als het één component
is).*

### Component options

In de vorige paragraaf heb ik het component `MyComponent` aangemaakt. Dat is nu nog een leeg Object. In het Object
definieer je de *component options*. Wat ik meestal als eerste doe, en wat vaak bovenaan in de component options staat,
is een component een naam geven. Dit doe je door de *key* `name`, een *value* te geven.

```javascript
const MyComponent = {
  name: 'JTextField',
  /* ... */
}
```

Vervolgens kun je allerlei opties instellen/ opzetten, wat uiteindelijk jouw component maakt. Voor mij zijn de meest
gebruikte opties: `data`, `props`, `computed`, `methods` en `created`. Er zijn er nog meer, en ze zijn allemaal nuttig
bij bepaalde situaties ([alle opties zijn te vinden in de Vue documentatie](https://v3.vuejs.org/api/options-api.html)).

Voor het vervolg ga ik verder met het component `JTextField`. Dit is een tekst veld met een label erboven.

#### JTextField

```javascript
import './JTextField.css'

const JTextField = {
  name: 'JTextField',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    value: { type: String }
  },
  template: `
    <div class="text-field">
      <label class="label">{{ label }}</label>
      <input class="input"
             type="text"
             :value="value"
             @input="$emit('input', $event.target.value)"
             v-bind="$attrs"
      />
    </div>
  `
}
```

Ik heb een voorbeeld gemaakt op [Codepen](https://codepen.io/jvhellemondt/pen/mdRbPNQ). Op naar Single File Components.


### Single File Components

Een standaard opzet van een `Single File Component`, ook wel, *SFC*, ziet er als volgt uit:

```vue

<template>
  <!-- -->
</template>

<script>
export default {
  name: 'ComponentName',
  /* ... */
};
</script>

<style>
/* ... */
</style>
```

Je kan zien dat er een `template`, een `script` en een `style` tag inzit. Samen maakt dit een component.

* In `<template>` neem je html en/of andere componenten op;
* In `<script>`, importeer je andere componenten, voeg je javascript toe en stel je de *Vue component options* in, die
  gebruikt kunnen worden in `<template>`, en
* In `<style>` neem je de css styling op die je vervolgens kan gebruiken in `<template>`.

Een `Single File Component` kun je weer importeren en gebruiken in andere componenten zonder dat je, in die andere
componenten, alle code op hoeft te nemen. Net als een `String Template Component`.

## Waarom een Single File Component? 

In de Vue documentatie staan de volgende voordelen, en dus gelijk "de waarom", opgesomd. 

* Je hoeft, wanneer je de componenten globaal opzet, niet voor ieder component een unieke naam te verzinnen;
* Bij *String templates* ontbreekt "syntax highlighting";
* De styling/ css gebeurt in een apart bestand, gescheiden van de component, en
* Het maakt het moeilijker om html en javascript preprocessors (zoals Pug, en Babel) te gebruiken.

Persoonlijk wil ik daar nog aan toevoegen, het zorgt voor structuur en na er even aan te wennen, is het overzichtelijk. 

## SFC: JTextField

Om mee af te sluiten, hoe ziet `JTextField` eruit als `Single File Component`? Als volgt:

```vue

<template>
  <div class="text-field">
    <label class="label">{{ label }}</label>
    <input v-model="value" class="input" type="text"/>
  </div>
</template>

<script>
export default {
  name: 'JTextField',
  props: {
    label: {
      type: String,
      required: true
    },
    value: { type: String }
  }
};
</script>

<style lang="scss" scoped>
.text-field {
  display:         flex;
  flex-direction:  column;
  justify-content: flex-start;
  max-width:       250px;
  margin:          8px 0
}

.label {
  display:     flex;
  font-weight: 300;
  text-align:  left;
}

.input {
  border:  1px solid #669900;
  display: flex;
  padding: 8px;
  width:   100%;
}
</style>
```

En ook als `Single File Component`, ziet dit component er als volgt uit:

<div>
<JTextField label="Voornaam"/>
<JTextField label="Achternaam"/>
</div>
<br>
<br>

Bedankt voor het lezen! Ik hoop dat nu het verschil tussen `String Template Components` en `Single File Components` en de voordelen van `Single File Components`, duidelijk zijn.
<br>
<br>

Mocht je vragen hebben, dan mag je die mij natuurlijk stellen! Je kunt ze stellen door een e-mail te sturen naar [me@jvh.one](mailto:me@jvh.one) of door te reageren op deze Tweet: 
