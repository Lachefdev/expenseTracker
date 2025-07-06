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
</template>

<script setup>
const properties = defineProps({
    incomes: {
        type: Number,
    },
    expenses: {
        type: Number,
    }
})
</script>
