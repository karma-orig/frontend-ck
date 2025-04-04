<template>
  <div class="app">
    <h1>Случайные факты о числах</h1>
    
    <div class="controls">
      <input
        v-model.number="inputNumber"
        type="number"
        placeholder="Введите число"
        min="1"
        class="number-input"
      >
      <button @click="generateFact" class="generate-btn">
        Получить факт
      </button>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
    </div>

    <div v-else-if="currentFact" class="fact-display">
      <h2>Факт о числе {{ inputNumber }}:</h2>
      <p class="fact-text">{{ currentFact }}</p>
      <p class="fact-type">Тип: {{ currentFactType }}</p>
    </div>

    <div v-else class="instructions">
      <p>Введите число и нажмите "Получить факт"</p>
    </div>

    <div class="history" v-if="factHistory.length > 0">
      <h2>История фактов</h2>
      <ul>
        <li v-for="(fact, index) in factHistory" :key="index">
          <span class="fact-number">{{ fact.number }}</span>: 
          <span class="fact-content">{{ fact.text }}</span>
          <span class="fact-category">{{ fact.category }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Предопределенные факты по категориям
const factsDatabase = {
  math: [
    "является числом Харшад",
    "— простое число",
    "— треугольное число",
    "— число Фибоначчи",
    "— совершенное число",
    "— факториал числа",
    "— степень двойки"
  ],
  year: [
    "год основания Microsoft",
    "год первого полета человека в космос",
    "год изобретения телефона",
    "год окончания Второй мировой войны",
    "год рождения Альберта Эйнштейна",
    "год первого чемпионата мира по футболу"
  ],
  trivia: [
    "— любимое число многих математиков",
    "считается счастливым числом",
    "часто встречается в природе",
    "имеет особое значение в нумерологии",
    "— число с богатой историей",
    "упоминается в Библии"
  ]
};

const inputNumber = ref('');
const loading = ref(false);
const currentFact = ref('');
const currentFactType = ref('');
const factHistory = ref([]);

const generateFact = () => {
  if (!inputNumber.value) return;
  
  loading.value = true;
  
  // Имитация загрузки
  setTimeout(() => {
    const num = Math.abs(parseInt(inputNumber.value));
    
    // Выбираем случайную категорию
    const categories = Object.keys(factsDatabase);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    // Выбираем случайный факт с использованием mod
    const factsList = factsDatabase[randomCategory];
    const factIndex = num % factsList.length;
    const selectedFact = `${num} ${factsList[factIndex]}`;
    
    currentFact.value = selectedFact;
    currentFactType.value = randomCategory;
    
    // Добавляем в историю
    factHistory.value.unshift({
      number: num,
      text: selectedFact,
      category: randomCategory
    });
    
    // Ограничиваем историю 10 последними фактами
    if (factHistory.value.length > 10) {
      factHistory.value.pop();
    }
    
    loading.value = false;
  }, 800);
};
</script>

<style>
.app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1, h2 {
  color: #2c3e50;
  text-align: center;
}

.controls {
  display: flex;
  gap: 1rem;
  margin: 2rem auto;
  max-width: 500px;
}

.number-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.number-input:focus {
  border-color: #42b983;
  outline: none;
}

.generate-btn {
  padding: 0.75rem 1.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.generate-btn:hover {
  background-color: #369f6d;
}

.loading {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(66, 185, 131, 0.2);
  border-radius: 50%;
  border-top-color: #42b983;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fact-display {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
  text-align: center;
}

.fact-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 1rem 0;
}

.fact-type {
  color: #6c757d;
  font-style: italic;
}

.history {
  margin-top: 3rem;
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.history ul {
  list-style-type: none;
  padding: 0;
}

.history li {
  padding: 0.75rem;
  margin: 0.5rem 0;
  background-color: #f8f9fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.fact-number {
  font-weight: bold;
  color: #42b983;
  min-width: 40px;
}

.fact-content {
  flex: 1;
  text-align: left;
}

.fact-category {
  background-color: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #495057;
}

.instructions {
  text-align: center;
  color: #6c757d;
  margin: 2rem 0;
}
</style>