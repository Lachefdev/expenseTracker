import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const selectedCategories = ref([])
  const selectedLimits = ref([])
  const transactionList = ref([])

  const setSelectedCategories = (categories) => {
    selectedCategories.value = categories
  }

  const setSelectedLimits = (limits) => {
    selectedLimits.value = limits
  }

  const setTransactionList = (transactions) => {
    transactionList.value = transactions
  }

  return {
    selectedCategories,
    selectedLimits,
    transactionList,
    setSelectedCategories,
    setSelectedLimits,
    setTransactionList
  }
})
