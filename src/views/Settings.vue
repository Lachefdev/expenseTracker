<template>
  <h1>Settings</h1>

  <div class="container">
    <h3>Kategorien wählen</h3>
    <div v-for="option in options" :key="option.id" class="checkbox-item">
      <input
        type="checkbox"
        :id="option.id"
        :value="option.value"
        v-model="selectedOptions"
      />
      <label :for="option.id">{{ option.label }}
        <img id="categoryIcons" :src="`../icons/${option.icon}.svg`"/>
      </label>
    </div>
  </div>

  <button class="btn" @click="saveChanges">SAVE</button>
  <button class="backBtn" @click="goBack">BACK</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import {ref, onMounted} from 'vue'
import { useAppStore } from '../stores/app.js'

const store = useAppStore()
const router = useRouter()

const emit = defineEmits(['categoriesSelected'])

const options = ref([
        { id: "grocery", value: "grocery", label: "Grocery", icon: "grocery", isChecked: false },
        { id: "spare_time", value: "spare_time", label: "Spare time", icon: "anker", isChecked: false },
        { id: "clothes", value: "clothes", label: "Clothes", icon: "cloth", isChecked: false },
        { id: "extraordinary", value: "extraordinary", label: "Extraordinary", icon: "extraordinary", isChecked: false },
        { id: "health", value: "health", label: "Health", icon: "health", isChecked: false },
        { id: "fuel", value: "fuel", label: "Fuel", icon: "fuel", isChecked: false },
        { id: "mobility", value: "mobility", label: "Mobility", icon: "mobility", isChecked: false },
        { id: "salary", value: "salary", label: "Salary", icon: "salary", isChecked: false },
        { id: "insurance", value: "insurance", label: "Insurance", icon: "insurance", isChecked: false },
        { id: "rent", value: "rent", label: "Rent", icon: "rent", isChecked: false },
        { id: "abonnement", value: "abonnement", label: "Abonnement", icon: "abonnement", isChecked: false },
        { id: "electricity", value: "electricity", label: "Electricity", icon: "electricity", isChecked: false },
        { id: "travel", value: "travel", label: "Travel", icon: "travel", isChecked: false },
        { id: "business", value: "business", label: "Business", icon: "business", isChecked: false },
        { id: "rubbish", value: "rubbish", label: "Rubbish", icon: "rubbish", isChecked: false },
        { id: "communication", value: "communication", label: "Communication", icon: "communication", isChecked: false },
      ])

const selectedOptions = ref([])

onMounted(() => {
  const storedCategories = JSON.parse(localStorage.getItem('transactionList'));
  if(storedCategories) selectedOptions.value = storedCategories.map(item => item.category.id)
})

const saveChanges = () => {
  store.setSelectedCategories(options.value.filter((option)=> selectedOptions.value.some((selectedOption) => selectedOption === option.value)))
  router.push('/')
}

const goBack = () => router.push('/')


</script>
