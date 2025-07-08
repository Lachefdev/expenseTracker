import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const selectedCategories = ref([])

  const setSelectedCategories = (categories) => {
    selectedCategories.value = categories
  }

  return {
    selectedCategories,
    setSelectedCategories
  }
})
