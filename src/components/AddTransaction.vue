<template>
         <h3>Add new transaction</h3>
      <form id="form" @submit.prevent="onSubmit" >
        <div class="form-control" >
          <label for="text">Text</label>
          <input type="text" id="text" placeholder="Enter text..." v-model="text"/>
        </div>
        <div class="form-control">
            <label for="amount">
                Amount <br />(negative - expense, positive - income)
            </label>
          <input type="text" id="amount" placeholder="Enter amount..." v-model="amount"/>
        </div>
        <label for="category">Category</label><br>
        <div class="form-control" v-for="category in selectedCategories" :key="category.id" :style="{display: 'inline-block'}">
          <div id="category" :style="{backgroundColor: getColor(category.id)}">
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
import {ref, computed} from 'vue';
import {useToast} from 'vue-toastification';
import { useCategoryStore } from '../stores/categories.js'

const store = useCategoryStore()

const toast = useToast();

const emit = defineEmits(['itemAdded']);

const text = ref ('');
const amount= ref('');
const selected = ref(null)

const selectedCategories = computed(() => store.selectedCategories)

const getColor = (id) => {
  const categoryColor = {
    "grocery": '#d5a6bd',
    "spare_time": '#d9ead3',
    "clothes": '#d9d2e9',
    "extraordinary": '#cfe2f3',
    "health": '#d5a6bd',
    "fuel": '#ead1dc',
    "mobility": '#b4a7d6',
    "salary": '#ffe599' ,
    "insurance": '#fce5cd',
    "rent": '#c27ba0',
    "abonnement": '#f9cb9c',
    "electricity": '#ea9999',
    "travel": '#9fc5e8',
    "business": '#a2c4c9',
    "rubbish": '#b6d7a8',
    "communication": '#eeeeee',
  }

  return categoryColor[id]
}

const onSubmit = () => {

    if(!text.value || !amount.value) toast.error('Both fields must be filled')

    const transaction = ref({
        text: text.value,
        amount: parseFloat(amount.value),
         category: {
            id: selected.value.id,
            icon: selected.value.icon
          }
    })


    emit('itemAdded', transaction.value)

    text.value = '';
    amount.value = '';
    selected.value = null;
}
</script>
