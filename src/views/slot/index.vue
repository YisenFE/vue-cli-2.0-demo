<template>
  <div calss="crm-slot">
    <my-slot :books="books">
      <template slot="book" slot-scope="props">
        <li>{{props.bookName}}</li>
      </template>
    </my-slot>
  </div>
</template>
<script>
import mySlot from '@/components/slot'
export default {
  name: 'crmSlot',
  components: {
    mySlot
  },
  data() {
    return {
      books: [
        {name: 'book1'},
        {name: 'book2'},
        {name: 'book3'}
      ]
    }
  }
}
</script>
