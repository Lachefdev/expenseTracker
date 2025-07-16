<template>
  <h1>Overview</h1>
  <div class="container">
    <div class="chartContainer">
      <Pie
        :data="computedPiechartData"
        :options="pieChartOptions"
      />
    </div>
    <br /><br />
    <div class="chartContainer">
      <Bar
        :data="computedBarchartData"
        :options="barChartOptions"
      />
    </div>

    <button
      class="btn"
      @click="exportList"
    >
      EXPORT
    </button>
    <button
      class="backBtn"
      @click="goBack"
    >
      BACK
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '../stores/app.js'
import { useCategories } from '../composables/useCategories.js'
import { useRouter } from 'vue-router'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

const store = useAppStore()
const router = useRouter()

const categories = useCategories()

const categoryColor = (value) => categories.getColor(value)

const selectedCategories = computed(
  () => JSON.parse(localStorage.getItem('selectedCategories')) || store.getSelectedCategories(),
)
const selectedLimits = computed(
  () => JSON.parse(localStorage.getItem('selectedLimits')) || store.getSelectedLimits(),
)
const transactionList = computed(
  () => JSON.parse(localStorage.getItem('transactionList')) || store.getTransactionList(),
)

const sumPerCategory = () => {
  const result = {}

  for (const item of transactionList.value) {
    const category = item.category.id
    if (!category) continue

    if (!result[category]) {
      result[category] = 0
    }

    result[category] += item.amount
  }

  return result
}

const percentOfLimit = () => {
  const progress = {}
  const expenses = sumPerCategory()

  const formattedSelectedLimits = selectedLimits.value

  for (const category in formattedSelectedLimits) {
    const spent = Math.abs(expenses[category] || 0) // Betrag als positiver Wert
    const limit = formattedSelectedLimits[category]
    const percentage = Math.min((spent / limit) * 100)

    progress[category] = {
      spent,
      limit,
      percentage: Math.round(percentage),
    }
  }

  return progress
}

const percentageIncludedCategories = () => {
  const percentages = percentOfLimit()

  return selectedCategories.value.map((item) => {
    const percentage = percentages[item.id]?.percentage ?? null
    return {
      ...item,
      percentage,
    }
  })
}

const includedCategoriesWithPercentage = computed(() => percentageIncludedCategories())

const expenses = transactionList.value.filter((item) => item.amount < 0)
const summarizedExpenses = expenses.reduce((accumulator, current) => {
  const key = current.text
  if (!accumulator[key]) {
    accumulator[key] = 0
  }
  accumulator[key] += current.amount
  return accumulator
}, {})

const pieLabels = Object.keys(summarizedExpenses)
const pieValues = Object.values(summarizedExpenses)
const pieColors = expenses.map((item) => categoryColor(item.category.id))

const computedPiechartData = computed(() => ({
  labels: pieLabels,
  datasets: [
    {
      backgroundColor: pieColors.slice(0, pieLabels.length),
      data: pieValues,
    },
  ],
}))

const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

const barLabels = includedCategoriesWithPercentage.value.map((item) => item.label)
const barValues = includedCategoriesWithPercentage.value.map((item) => item.percentage)
const barLabel = 'prozentualer Anteil des gesetzten Limits'
const barColor = includedCategoriesWithPercentage.value.map((item) => categoryColor(item.id))

const computedBarchartData = computed(() => ({
  labels: barLabels,
  datasets: [
    {
      label: barLabel,
      backgroundColor: barColor,
      data: barValues,
    },
  ],
}))

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

const goBack = () => router.push('/')
</script>
