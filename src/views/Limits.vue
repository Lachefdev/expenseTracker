<template>
    <h1>Limits</h1>
    <div class="container">

    <div v-for="category in selectedCategories" :key="category.id">
      <label :for="category.id">
        <img :style="{width: '25px', height: '25px', marginRight: '10px'}" :src="`../icons/${category.icon}.svg`" placeholder=""/>{{ category.label }}
      </label>
      <input
        type="text"
        :id="category.id"
        v-model="goalSet[category.id]"
      />
    </div>

    <div class="buttons">
        <button class="btn" @click="resetLimits">RESET</button>
        <button class="btn" @click="saveLimits">SAVE</button>
    </div>
    <button class="backBtn" @click="goBack">BACK</button>
    </div>
</template>

<script setup>
import {computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAppStore } from '../stores/app.js'

const store = useAppStore()
const router = useRouter()

const goalSet = ref({})

const selectedCategories = computed(() => store.selectedCategories)

const saveLimits = () => {
    store.setSelectedLimits(goalSet);
    router.push('/')
}

const resetLimits = () => {
    store.setSelectedLimits({})
}

const goBack = () => router.push('/')

</script>
