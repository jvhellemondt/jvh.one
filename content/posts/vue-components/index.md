---
[format:off]: <> ( @formatter:off)
title: 'Vue components'
date: '2021-02-09'
published: false
tags: ['Vue', 'Vue2']
canonical_url: false
description: ''
cover_image: '../elena-koycheva-GUYCM0jhuSA-unsplash.jpg'
cover_credit: 'Elena Koycheva'
[format:on]: <> (@formatter:on)
---

In de laatste paragraaf heb ik kort laten zien hoe een Vue component / SFC eruit ziet. Je kan zien dat er template,
script en style tags inzitten. Samen maakt dit een component. Zo'n component kun je weer importeren en gebruiken in
andere componenten zonder dat je, in die andere componenten, alle code op hoeft te nemen. Een component is dus een
abstractie, wat ervoor zorgt dat je minder code hoeft te repeteren. Werken met dergelijke abstracties om repetitie te
voorkomen, wordt ook wel het DRY-principle genoemd.

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

## Component: JTextField

Het onderstaande voorbeeld is in zijn geheel een component. Daarnaast bevat dit component nog een ander component,
namelijk `TodoList`.

```vue
<template>
  <div class="text-field">
    <label class="label">{{ label }}</label>
    <input v-model="value" class="input" type="text" />
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

}

.label {

}

.input {

}
</style>
```
