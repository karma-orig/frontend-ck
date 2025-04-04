<template>
  <div class="app">
    <h1>Учёт расходов</h1>
    
    <div class="balance-container" v-if="history.length > 0">
      <div class="balance-item">
        <h3>Доходы:</h3>
        <span class="income">{{ incomeBalance }} ₽</span>
      </div>
      <div class="balance-item">
        <h3>Расходы:</h3>
        <span class="outcome">{{ outcomeBalance }} ₽</span>
      </div>
      <div class="balance-item">
        <h3>Баланс:</h3>
        <span :class="{'positive': totalBalance >= 0, 'negative': totalBalance < 0}">
          {{ totalBalance }} ₽
        </span>
      </div>
    </div>

    <p v-else class="no-operations">Вы не совершали финансовых операций</p>

    <form @submit.prevent="addOperation" class="operation-form">
      <div class="form-group">
        <label for="title">Название операции:</label>
        <input
          id="title"
          type="text"
          v-model.trim="title"
          required
          placeholder="Зарплата, продукты..."
        >
      </div>
      <div class="form-group">
        <label for="amount">Сумма:</label>
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          required
          placeholder="1000 или -500"
          step="0.01"
        >
      </div>
      <button type="submit" class="add-btn">Добавить операцию</button>
    </form>

    <div class="history">
      <h2>История операций</h2>
      <ul v-if="history.length > 0">
        <li
          v-for="item in history"
          :key="item.id"
          :class="{'income': item.amount > 0, 'outcome': item.amount < 0}"
        >
          <span class="text">{{ item.text }}</span>
          <span class="amount">{{ item.amount }} ₽</span>
          <button @click="removeOperation(item.id)" class="delete-btn">×</button>
        </li>
      </ul>
      <p v-else class="empty-history">Нет операций для отображения</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const title = ref('');
const amount = ref(0);
const history = ref([]);

const addOperation = () => {
  if (!title.value || amount.value === 0) return;
  
  history.value.push({
    id: Date.now(),
    text: title.value,
    amount: Number(amount.value)
  });
  
  title.value = '';
  amount.value = 0;
};

const removeOperation = (id) => {
  history.value = history.value.filter(item => item.id !== id);
};

const incomeBalance = computed(() => {
  return history.value
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0)
    .toFixed(2);
});

const outcomeBalance = computed(() => {
  return Math.abs(history.value
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0))
    .toFixed(2);
});

const totalBalance = computed(() => {
  return history.value
    .reduce((sum, item) => sum + item.amount, 0)
    .toFixed(2);
});
</script>

<style>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  color: #2c3e50;
  text-align: center;
}

.balance-container {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.balance-item {
  text-align: center;
}

.income {
  color: #28a745;
  font-weight: bold;
}

.outcome {
  color: #dc3545;
  font-weight: bold;
}

.positive {
  color: #28a745;
}

.negative {
  color: #dc3545;
}

.no-operations {
  text-align: center;
  color: #6c757d;
  font-style: italic;
}

.operation-form {
  margin: 20px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

.add-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.add-btn:hover {
  background-color: #0069d9;
}

.history {
  margin-top: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
}

li.income {
  border-right: 4px solid #28a745;
  background-color: rgba(40, 167, 69, 0.1);
}

li.outcome {
  border-right: 4px solid #dc3545;
  background-color: rgba(220, 53, 69, 0.1);
}

.text {
  flex: 1;
}

.amount {
  margin: 0 15px;
  font-weight: bold;
}

.delete-btn {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
}

.empty-history {
  text-align: center;
  color: #6c757d;
  font-style: italic;
}
</style>