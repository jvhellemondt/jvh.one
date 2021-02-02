---

[format:off]: <> ( @formatter:off)
title: 'Attributes in Vue, wat zijn dat?'
date: '2021-02-02' 
published: true
tags: ['Vue', 'Vue2', 'attribute', 'props', 'inheritance']
canonical_url: false 
description: 'Attributes lijken verdacht veel op props. Alleen is het eigenlijk andersom. Een prop is een attribute! En het zijn de bouwstenen die onze componenten herbruikbaar maken en ze zijn cruciaal voor de vorming van componenten.'
cover_image: './assets/dan-burton-l6jWD4AZIf0-unsplash.jpg' 
cover_credit: 'Omslag door [Dan Burton](https://unsplash.com/@single_lens_reflex)'
[format:on]: <> (@formatter:on)
---
import JTextField from './components/JTextField.vue'

*Een van de eerste zaken waarmee je in aanraking komt als je met Vue (of een ander Javascript framework) gaat werken,
zijn `props`. `Props` zijn de bouwstenen die jouw [componenten](/vue-components) vormen. In mijn
blog [Props voor gevorderden, attribute inheritance](/props-voor-gevorderde-attribute-inheritance) onder het
kopje [De Vue (v2.x) documentatie](/props-voor-gevorderde-attribute-inheritance#de-vue-(v2.x)-documentatie), geef ik aan
dat een `attribute` verdacht veel lijkt op een `prop`. Daar is wat voor te zeggen, alleen is het eigenlijk andersom.
Een `prop` is een `attribute`. In de Vue (v2.x) documentatie, worden ze
zelfs [Non-Prop Attributes](https://vuejs.org/v2/guide/components-props.html#Non-Prop-Attributes) genoemd. Hoe zit het
nou eigenlijk?*

## Attributen, waar ken ik dat van?

Wanneer je met Vue werkt, dan kom je al snel in aanraking met [componenten](vue-components)
. [Componenten](vue-components) hebben vaak attributen, net zoals HTML elementen.

Neem bijvoorbeeld het anchor-element (`<a></a>`). Bij een anchor (een link), dient een `href` opgegeven te worden om het
bruikbaar te maken (`<a href="https://www.jvh.one">Ga naar jvh.one!</a>`).

Een ander voorbeeld is het image-element (`<img>`). Een image-element heeft twee vereiste attributen, namelijk `src` (
de "locatie" van de afbeelding) en `alt` (een tekst die weergegeven wordt wanneer de afbeelding niet geladen kan worden)
. De omslag foto's van deze blog maakt gebruik van het image-element, en dat ziet er (*ongeveer*) als volgt
uit: `<img alt="Cover image" src="/assets/static/content/posts/vue-attributes/assets/dan-burton-l6jWD4AZIf0-unsplash.jpg">`
.

## Attributen in Vue

In [props voor gevorderden, attribute inheritance](/props-voor-gevorderde-attribute-inheritance) introduceerde ik
mijn [JTextField component](/props-voor-gevorderde-attribute-inheritance#componentsjtextfieldvue). Code technisch ziet
`JTextField` er als volgt uit:

```vue

<template>
  <div class="text-field">
    <label class="label">{{ label }}</label>
    <input class="input"
           type="text"
           :value="value"
           @input="$emit('input', $event.target.value)"
           v-bind="$attrs"
    />
  </div>
</template>

<script>
export default {
  name: 'JTextFieldInheritAttrs',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true
    },
    value: { type: String }
  }
}
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

Het is een [Single File (Vue) Component](/single-file-components) met twee props, `label` (vereist) en `value`. Dit zijn ook meteen twee attributen van JTextField (naast de standaard HTML attributen die gelden voor het input-element -- waarom? Daar vertel ik over in [props voor gevorderden, attribute inheritance](/props-voor-gevorderde-attribute-inheritance)) Wanneer
we dit component in andere componenten zouden gebruiken, dan kan dat door de component op te nemen in de Vue
template (`<template>...</template>`),
bijvoorbeeld: `<JTextField label="Voornaam" placeholder="Vul hier uw voornaam in" />`.

Dit ziet er dan zo uit:
<JTextField label="Voornaam" placeholder="Vul hier uw voornaam in" />

Wanneer we de achternaam willen, dan veranderen we de attributen naar `<JTextField label="Achternaam" placeholder="Vul hier uw achternaam in" />`, met als gevolg dat `JTextField` er zo uitziet:
<JTextField label="Achternaam" placeholder="Vul hier uw achternaam in" />

Je ziet dat je door een simpele wijziging in de attributen, de component gemakkelijk anders kan vormgeven. In Vue zijn de attributen de props en non-props attributes, die je meegeeft aan componenten, in de template van... Andere componenten.
<br>
<br>
<br>
Bedankt voor het lezen! Hopelijk schept dit duidelijkheid over de attributen/props die je onbewust en vaak gebruikt wanneer je met Vue werkt.

Mocht je vragen hebben, dan mag je die mij natuurlijk stellen! Je kunt ze stellen door een e-mail te sturen naar [me@jvh.one](mailto:me@jvh.one) of door te reageren op deze Tweet: 

https://twitter.com/jvhellemondt/status/1356575555576094720?s=20
