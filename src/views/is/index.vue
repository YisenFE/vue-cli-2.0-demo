<template>
  <div class="is-component" value="231">
    aaaa
    <div :is="com" :books="books">
      <template slot="book" slot-scope="props">
        <li>{{props.bookName}}</li>
      </template>
    </div>
    <button @click="handleChangeView('myInput')">myInput</button>
    <button @click="handleChangeView('mySlot')">mySlot</button>
    <textarea v-model="area" id="area" @input="handleInput"></textarea>
  </div>
</template>
<script>
import myInput from '@/components/input'
import mySlot from '@/components/slot'
// import $ from 'jquery'
// import '@accursoft/jquery-caret'
export default {
  name: 'isComponent',
  components: {
    myInput,
    mySlot
  },
  data() {
    return {
      area: '',
      com: 'myInput',
      books: [
        {name: 'book1'},
        {name: 'book2'},
        {name: 'book3'}
      ]
    }
  },
  methods: {
    handleChangeView(com) {
      this.com = com
    },
    handleInput(event) {
      // console.log($('#area').caret())
    }
  },
  watch: {
    books: {
      immediate: true,
      handler() {
        debugger
        a.b.c
      }
    }
  },
  mounted() {
    // console.log(this)
    // console.log($('#area').caret())
    // 'abcdefg'.includes('c')
  }
}
</script>
