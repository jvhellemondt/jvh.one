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
  name: 'JTextField',
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
