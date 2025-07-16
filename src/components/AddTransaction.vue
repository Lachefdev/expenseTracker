<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Text</label>
      <input type="text" id="text" placeholder="Enter text..." v-model="text" />
    </div>
    <div class="form-control">
      <label for="amount"> Amount <br />(negative - expense, positive - income) </label>
      <input type="text" id="amount" placeholder="Enter amount..." v-model="amount" />
    </div>
    <label for="category">Category</label><br />
    <div
      class="form-control"
      v-for="(category, index) in selectedCategories"
      :key="index"
      :style="{ display: 'inline-block' }"
    >
      <div id="category" :style="{ backgroundColor: categoryColor(category.id) }">
        <input
          type="radio"
          name="category"
          :id="category.id"
          :value="category"
          v-model="selected"
          class="categoryBtn"
        />
        <label :for="category.id">
          <img id="categoryIcons" :src="`../icons/${category.icon}.svg`" />
        </label>
      </div>
    </div>

    <button class="btn">Add transaction</button>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { useAppStore } from '../stores/app.js'
import { useCategories } from '../composables/useCategories.js'

const store = useAppStore()

const toast = useToast()
const categories = useCategories()

const emit = defineEmits(['itemAdded'])

const text = ref('')
const amount = ref('')
const selected = ref([])

const selectedCategories = computed(
  () => JSON.parse(localStorage.getItem('selectedCategories')) || store.getSelectedCategories(),
)

const categoryColor = (value) => categories.getColor(value)

const onSubmit = () => {
  if (!text.value || !amount.value) toast.error('Both fields must be filled')

  const transaction = ref({
    text: text.value,
    amount: parseFloat(amount.value),
    category: {
      id: selected.value.id,
      icon: selected.value.icon,
    },
  })

  emit('itemAdded', transaction.value)

  text.value = ''
  amount.value = ''
  selected.value = null
}
</script>
