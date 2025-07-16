import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const selectedCategories = ref([])
  const selectedLimits = ref([])
  const transactionList = ref([])

  const getSelectedCategories = () => selectedCategories.value

  const getSelectedLimits = () => selectedLimits.value

  const getTransactionList = () => transactionList.value

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
    getSelectedCategories,
    getSelectedLimits,
    getTransactionList,
    setSelectedCategories,
    setSelectedLimits,
    setTransactionList,
  }
})

/* export const useAppStore = defineStore('app', {

  state: () => ({
    selectedCategories: ref([]),
    selectedLimits: ref([]),
    transactionList: ref([]),
  }),
  getters: {
    getSelectedCategories(state) {
      return state.selectedCategories
    },
    getSelectedLimits(state){
      return state.selectedLimits
    },
    getTransactionList(state) {
      return state.transactionList
    }
  },
  actions: {
    setSelectedCategories(categories){
      this.selectedCategories = categories
    },

    setSelectedLimits(limits){
      this.selectedLimits = limits
    },

    setTransactionList(transactions){
      this.transactionList = transactions
    }
  }
}) */
