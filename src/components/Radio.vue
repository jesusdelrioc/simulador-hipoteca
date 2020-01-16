<template>
  <div class="field is-horizontal">
    <label class="field-label has-text-grey is-size-6">{{label}}</label>
    <div class="field-body control">
      <span v-for="(value, key) in items" :key="key">
        <input
          type="radio"
          @change="$emit('field-update', id, $event.target.value)"
          :id="key"
          :name="id"
          class="is-checkradio is-success"
          :value="value.value"
        >
        <label :for="key" class="radio is-size-7">{{value.label}}</label>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Radio',
  inject: {
    $validator: '$validator'
  },
  $_veeValidate: {
    name () {
      return this.id
    },
    value () {
      return this.value
    },
    validator: 'inherit'
  },
  props: {
    label: String,
    items: Object,
    id: String,
    error: {
      type: String,
      required: false
    },
    checked: [Boolean, String, Number]
  },
  methods: {}
}
</script>
<style>
.control.has-icons-left .icon, .control.has-icons-right .icon {
  color: black;
}
 .field-label {
    flex-grow: 5;
    font-weight: lighter;
    font-size: 0.9em;
}
</style>
