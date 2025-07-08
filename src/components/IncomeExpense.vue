<template>
    <div class="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" class="money plus">{{incomes}}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" class="money minus">{{expenses}}</p>
        </div>
    </div>
    <div class="progessbar">
        <!---<div :class="getColor(category.id)" v-for="category in selectedCategories" key="category.id"></div>-->
    </div>
</template>

<script setup>
import {computed} from 'vue'
import { useCategoryStore } from '../stores/categories.js'

const store = useCategoryStore()

const selectedCategories = computed(() => store.selectedCategories)

const properties = defineProps({
    incomes: {
        type: Number,
    },
    expenses: {
        type: Number,
    }
})
</script>
