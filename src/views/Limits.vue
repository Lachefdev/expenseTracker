<template>
  <h1>Limits</h1>
  <div class="container">
    <div
      v-for="(category, index) in selectedCategories"
      :key="index"
    >
      <label :for="category.id">
        <img
          class="setLimit"
          :src="`../icons/${category.icon}.svg`"
          placeholder=""
        />{{ category.label }}
      </label>
      <input
        type="text"
        :id="category.id"
        v-model="goalSet[category.id]"
      />
    </div>

    <div class="buttons">
      <button
        class="btn"
        @click="resetLimits"
      >
        RESET
      </button>
      <button
        class="btn"
        @click="saveLimits"
      >
        SAVE
      </button>
    </div>
    <button
      class="backBtn"
      @click="goBack"
    >
      << BACK
    </button>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../stores/app.js'

const store = useAppStore()
const router = useRouter()

const goalSet = ref({})

const selectedCategories = computed(
  () => JSON.parse(localStorage.getItem('selectedCategories')) || store.getSelectedCategories(),
)

onMounted(() => (goalSet.value = JSON.parse(localStorage.getItem('selectedLimits'))))

const saveLimits = () => {
  updateLocalStorage()
  store.setSelectedLimits(goalSet.value)
}

const updateLocalStorage = () =>
  localStorage.setItem('selectedLimits', JSON.stringify(goalSet.value))

const resetLimits = () => {
  store.setSelectedLimits({})
}

const goBack = () => router.push('/')
</script>
