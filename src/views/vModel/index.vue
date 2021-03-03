<template>
  <div class="crm-input">
    <MyInput class="aaa" v-model="value1" :book="book"></MyInput>
    <div v-for="(item, key) in arr"
      :key="key">
      <input type="text" v-model="item.aa">
    </div>
  </div>
</template>
<script>
import MyInput from '@/components/MyInput/index'
export default {
  name: 'vModel',
  components: {
    MyInput
  },
  data() {
    return {
      value1: '111',
      book: 'asdf',
      arr: []
    }
  },
  mounted() {
    // this.$set(this.arr, 'a', 'bbb')
    this.arr.push({aa: 'aaaaa'})
    console.log(Array.from(this.arr))
  }
}
</script>
