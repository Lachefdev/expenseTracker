<template>
    <h4>Your Balance</h4>
    <h1 id="balance">{{balance || 0}}</h1>
</template>

<script setup>
const properties = defineProps({
    balance: {
        type: Number,
    },
})
</script>
