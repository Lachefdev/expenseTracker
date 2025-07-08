<template>
       <h3>History</h3>
          <ul id="list" class="list" v-for="item in items" :key= item.id>
            <li :style="{backgroundColor: getColor(item.category.id)}">{{item.text}}
              <img id="categoryIcons" :src="`../icons/${item.category.icon}.svg`"/>
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

const deleteTransaction = (id) => {
    emit('itemDeleted', id)
}

</script>
