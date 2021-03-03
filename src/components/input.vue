<template>
  <div class="crm-input">
    <el-input :value='value' @input="handleValue"></el-input>
    <input type="text" :value="value" @input="handleValue1">
  </div>
</template>
<script>
export default {
  name: 'myInput',
  props: {
    value: String
  },
  data() {
    return {
    }
  },
  methods: {
    handleValue(val) {
      this.$emit('input', val)
    },
    handleValue1() {
      console.log(arguments)
    }
  }
}
</script>
