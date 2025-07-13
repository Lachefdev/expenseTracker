<template>
  <h1>Overview</h1>
  <div class="container">
    <main>
      <div v-for="category in includedCategoriesWithPercentage" :key="category.id" class="chartItem"  :style="{
            borderColor: category.percentage > 100 ? 'red !important' : '#333'
          }">
        <div
          class="progressFill"
          :style="{
            height: `${category.percentage}%`,
            backgroundColor: categoryColor(category.id),
          }"
        ></div>
      </div>
    </main>
    <footer>
      <div v-for="category in includedCategoriesWithPercentage" :key="category.id" class="chartIcon">
        <img :src="`../../public/icons/${category.icon}.svg`">
      </div>
    </footer>

    <button class="btn" @click="exportList">EXPORT</button>
    <button class="backBtn" @click="goBack">BACK</button>
  </div>

</template>

<script setup>
import {computed} from 'vue';
import { useAppStore } from '../stores/app.js'
import {useCategories} from '../composables/useCategories.js'
import { useRouter } from 'vue-router';

const store = useAppStore()
const router = useRouter()

const categories = useCategories();

const categoryColor = (id) => categories.getColor(id)

const selectedCategories = computed(() => store.selectedCategories)
const selectedLimits = computed(() => store.selectedLimits)
const transactionList = computed(() => store.transactionList)

const sumPerCategory = () => {

  const result = {};

    for (const item of transactionList.value) {
      const category = item.category.id || item.category._custom?.value?.id;
      if (!category) continue;

      if (!result[category]) {
        result[category] = 0;
      }

      result[category] += item.amount;
    }

  return result
}

const percentOfLimit = () => {
  const progress = {}
  const expenses = sumPerCategory()

  const formattedSelectedLimits = JSON.parse(JSON.stringify(selectedLimits.value._rawValue))

    for (const category in formattedSelectedLimits) {
      const spent = Math.abs(expenses[category] || 0); // Betrag als positiver Wert
      const limit = formattedSelectedLimits[category];
      const percentage = Math.min((spent / limit) * 100);

      progress[category] = {
        spent, limit,
        percentage: Math.round(percentage),
      }
    }

    return progress
}

const percentageIncludedCategories = () => {

  const percentages = percentOfLimit()

  return selectedCategories.value.map(item => {
    const percentage = percentages[item.id]?.percentage ?? null;
    return {
      ...item,
      percentage
    }
  })
}

const includedCategoriesWithPercentage = computed(() => percentageIncludedCategories())

const goBack = () => router.push('/')

</script>
