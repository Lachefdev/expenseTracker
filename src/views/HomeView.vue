<template>
    <h2>Expense Tracker</h2>

    <div class="container">
      <Balance :balance="+ balance"/>
      <IncomeExpense :incomes="+ incomes" :expenses="+ expenses"/>
    </div>

    <TransactionList :items="transactionList" @itemDeleted="deleteTransaction" />
    <AddTransaction @itemAdded="addTransaction"/>

</template>

<script setup>
import Balance from '../components/Balance.vue'
import IncomeExpense from '../components/IncomeExpense.vue'
import TransactionList from '../components/TransactionList.vue'
import AddTransaction from '../components/AddTransaction.vue'
import {computed, ref, onMounted} from 'vue';
import {useToast} from 'vue-toastification';

const properties = defineProps({
  selectedOptions: {
    type: Array
  }
})

const toast = useToast();

onMounted (() => {

  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));

  if(savedTransactions) transactionList.value = savedTransactions;
})

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactionList.value))
}

const transactionList = ref([]);

const deleteTransaction = (id) => {
  transactionList.value = transactionList.value.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  toast.success('Transaction deleted')
}

const generateUniqueId = () => {
  return Math.floor(Math.random()* 1000000)
}

const addTransaction = (transaction) => {
  transactionList.value.push({
    id: generateUniqueId(),
    text: transaction.text,
    amount: transaction.amount,
    category: transaction.category,
    });

    updateLocalStorage();

    toast.success('Transaction added')
}

const incomes = computed (() => {
  return transactionList.value.filter((transaction) => transaction.amount > 0)
  .reduce((acc, transaction) => acc + transaction.amount, 0 ).toFixed(2)
})

const expenses = computed (() => {
  return transactionList.value.filter((transaction) => transaction.amount < 0).
  reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2)
})

const balance = computed (() => {
  return transactionList.value.reduce((acc, transaction) => acc + transaction.amount, 0)
})

</script>
