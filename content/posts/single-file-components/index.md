---
[format:off]: <> ( @formatter:off)
title: 'Single file component'
date: '2021-02-16' 
published: false
tags: ['Vue', 'Vue2']
canonical_url: false 
description: ''
cover_image: '../elena-koycheva-GUYCM0jhuSA-unsplash.jpg'
cover_credit: 'Elena Koycheva'
[format:on]: <> (@formatter:on)
---

Een standaard opzet van een `Single File Component`, ook wel, *SFC*, ziet er als volgt uit:

```vue
<template>

</template>

<script>
  export default {
    name: 'ComponentName',
  };
</script>

<style>

</style>
```

Een 'SFC' kent de (onder andere) de tags `template`, `script` en `style`. Alle drie optioneel.

* In `<template>` neem je html en/of andere componenten op.
* In `<script>`, importeer je andere componenten, voeg je javascript toe en stel je de *Vue component options* in, die,
  als dat nodig is, gebruikt kunnen worden in de `<template>`.
* In `<style>` neem je de css styling op die je vervolgens kan gebruiken in de `<template>`
