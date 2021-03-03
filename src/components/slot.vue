<template>
  <div calss="crm-slot">
    <slot name="book" v-for="book in books" :book-name="book.name"></slot>
  </div>
</template>
<script>
export default {
  name: 'crmSlot',
  props: {
    books: {
      type: Array,
      default: () => []
    }
  }
}
</script>
