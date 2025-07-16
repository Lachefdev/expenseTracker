<template>
  <h3>History</h3>
  <ul id="list" class="list" v-for="(item, index) in items" :key="index">
    <li :style="{ backgroundColor: categoryColor(item.category?.id) }">
      {{ item.text }}
      <img id="categoryIcons" :src="`../icons/${item.category?.icon}.svg`" />
      <span>${{ item.amount }}</span>
      <button class="delete-btn" @click="deleteTransaction(item.id)">x</button>
    </li>
  </ul>
</template>

<script setup>
import { useCategories } from '../composables/useCategories.js'

const categories = useCategories()

const properties = defineProps({
  items: {
    type: Array,
  },
})

const emit = defineEmits(['itemDeleted'])

const categoryColor = (value) => categories.getColor(value)

const deleteTransaction = (id) => {
  emit('itemDeleted', id)
}
</script>
