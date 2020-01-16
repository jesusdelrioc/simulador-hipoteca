<template>
  <div class="field level">
    <label class="field-label has-text-grey is-size-6">{{label}} <i v-if="title" class="fas fa-question-circle" :title="title"></i></label>
    <div class="field-body control has-icon">
       <input class="input"
      type="number"
      @blur="validate(id)"
      v-validate="'required'"
      @change="updateValue"
      :class="{'input': true, 'is-danger pulse': error }"
      :id="id"
      :step="step"
      :name="id"
      :max="max"
      :min="min"
      :title="label"
      :placeholder="placeholder">
          <span class="icon is-small is-left">
            <i class="fas fa-exclamation-triangle has-text-danger" v-if="error"></i>
            <i :class="['fas', icon ]" v-else></i>
          </span>
    </div>
  </div>
 </template>
<script>
export default {
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
  name: 'CampoTexto',
  props: {
    validating: String,
    max: String,
    min: String,
    label: String,
    step: String,
    placeholder: String,
    id: String,
    title: {
      type: String,
      required: false
    },
    icon: String,
    value: {
      default: this.default,
      type: [ Number, String ]
    },
    error: {
      type: String,
      required: false
    }
  },
  methods: {
    updateValue (e) {
      this.$emit('field-update', this.id, e.target.value)
    },
    validate (param) {
      console.log(param)
      this.runData()
      this.$validator.validate(param)
    },
    runData () {
    }
  }
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
