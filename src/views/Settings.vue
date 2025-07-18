<template>
  <h1>Settings</h1>

  <div class="container">
    <h3>Kategorien wählen</h3>
    <div
      v-for="(option, index) in options"
      :key="index"
      class="checkbox-item"
    >
      <input
        type="checkbox"
        :value="option.value"
        v-model="selectedOptions"
      />
      <label :for="option.id"
        >{{ option.label }}
        <img
          id="categoryIcons"
          :src="`../icons/${option.icon}.svg`"
        />
      </label>
      <span @click="deleteOption(index)">X</span>
    </div>
    <div class="newOption">
      <input
        type="text"
        v-model="newOption"
        @keydown.enter="handleInput"
      />
    </div>
  </div>

  <button
    class="btn"
    @click="saveChanges"
  >
    SAVE
  </button>
  <button
    class="backBtn"
    @click="goBack"
  >
    BACK
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAppStore } from '../stores/app.js'

const store = useAppStore()
const router = useRouter()

const emit = defineEmits(['categoriesSelected'])

const options = ref([
  { id: 'grocery', value: 'grocery', label: 'Grocery', icon: 'grocery' },
  {
    id: 'chemist',
    value: 'chemist',
    label: 'Chemist',
    icon: 'chemist',
  },
  { id: 'spare_time', value: 'spare_time', label: 'Spare time', icon: 'anker' },
  { id: 'clothes', value: 'clothes', label: 'Clothes', icon: 'cloth' },
  {
    id: 'extraordinary',
    value: 'extraordinary',
    label: 'Extraordinary',
    icon: 'extraordinary',
  },
  { id: 'health', value: 'health', label: 'Health', icon: 'health' },
  { id: 'fuel', value: 'fuel', label: 'Fuel', icon: 'fuel' },
  { id: 'mobility', value: 'mobility', label: 'Mobility', icon: 'mobility' },
  { id: 'salary', value: 'salary', label: 'Salary', icon: 'salary' },
  { id: 'insurance', value: 'insurance', label: 'Insurance', icon: 'insurance' },
  { id: 'rent', value: 'rent', label: 'Rent', icon: 'rent' },
  {
    id: 'abonnement',
    value: 'abonnement',
    label: 'Abonnement',
    icon: 'abonnement',
  },
  {
    id: 'electricity',
    value: 'electricity',
    label: 'Electricity',
    icon: 'electricity',
  },
  { id: 'travel', value: 'travel', label: 'Travel', icon: 'travel' },
  { id: 'business', value: 'business', label: 'Business', icon: 'business' },
  { id: 'rubbish', value: 'rubbish', label: 'Rubbish', icon: 'rubbish' },
  {
    id: 'communication',
    value: 'communication',
    label: 'Communication',
    icon: 'communication',
  },
])

const selectedOptions = ref([])
const newOption = ref('')

onMounted(() => {
  const storedCategories =
    JSON.parse(localStorage.getItem('selectedCategories')) || store.getSelectedCategories()
  if (Array.isArray(storedCategories))
    selectedOptions.value = storedCategories.map((item) => item.id)
})

const saveChanges = () => {
  localStorage.setItem(
    'selectedCategories',
    JSON.stringify(options.value.filter((option) => selectedOptions.value.includes(option.value))),
  )

  store.setSelectedCategories(
    options.value.filter((option) => selectedOptions.value.includes(option.value)),
  )
}

const handleInput = (event) => {
  options.value.push({
    id: 'new',
    value: event.target.value.toLowerCase(),
    label: event.target.value,
    icon: 'new',
  })
  newOption.value = ''
}

const deleteOption = (id) => {
  options.value.splice(id, 1)
}

const goBack = () => router.push('/')
</script>
