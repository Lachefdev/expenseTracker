<template>
       <h3>History</h3>
          <ul id="list" class="list" v-for="item in items" :key= item.id>
            <li :class="item.amount > 0 ? 'plus' : 'minus'">{{item.text}}
              <span>${{item.amount}}</span>
              <button class="delete-btn" @click="deleteTransaction(item.id)">x</button>
            </li>
          </ul>
</template>

<script setup>

const properties = defineProps({
    items: {
        type: Array,
    }
})

const emit = defineEmits(['itemDeleted'])

const deleteTransaction = (id) => {
    emit('itemDeleted', id)
}

</script>
