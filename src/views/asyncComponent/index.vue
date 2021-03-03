<template>
  <div class="crm-async-component">
    <my-input></my-input>
    111
  </div>
</template>
<script>
import myInput from '@/components/input'
export default {
  name: 'asyncComponent',
  components: {
    myInput
  },
  data() {
    return {
      formData: {
        value1: '1234abcd'
      },
      res: null,
      a: '1111',
      res1: ''
    }
  },
  mounted() {
    this.getData()
    this.res1 = Object.assign({}, this.res)
  },
  methods: {
    getData() {
      this.ajax('/b/cascader1', {
        isJson: true,
        // type: 'get',
        params: {
          a: 1
        }
      }).then(res => {
        // console.log('222')
        this.res = res.data
      })
    }
  },
  beforeUpdate() {
    // console.log('beforeUpdate')
  },
  updated() {
    // console.log('updated')
  },
  beforeDestroy() {
    // console.log('beforeDestroy')
  },
  destroyed() {
    // console.log('destroyed')
  }
}
</script>
