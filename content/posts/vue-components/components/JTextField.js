import './JTextField.css'

export default {
  name: 'JTextFieldInheritAttrs',
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
  </div>`
}
