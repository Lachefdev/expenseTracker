import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const selectedCategories = ref([])

  const setSelectedCategories = (categories) => {
    selectedCategories.value = categories
  }

  return {
    selectedCategories,
    setSelectedCategories
  }
})
