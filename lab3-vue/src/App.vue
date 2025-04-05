<template>
  <div class="form-container">
    <h1>Регистрация</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="firstName">Имя:</label>
        <input 
          type="text" 
          id="firstName" 
          v-model="user.firstName" 
          required
        >
      </div>

      <div class="form-group">
        <label for="lastName">Фамилия:</label>
        <input 
          type="text" 
          id="lastName" 
          v-model="user.lastName" 
          required
        >
      </div>

      <div class="form-group">
        <label>Пол:</label>
        <div class="radio-group">
          <label>
            <input 
              type="radio" 
              value="male" 
              v-model="user.gender"
            > Мужской
          </label>
          <label>
            <input 
              type="radio" 
              value="female" 
              v-model="user.gender"
            > Женский
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input 
          :type="showPassword ? 'text' : 'password'" 
          id="password" 
          v-model="user.password" 
          required
        >
      </div>

      <div class="form-group">
        <label for="confirmPassword">Подтверждение пароля:</label>
        <input 
          :type="showPassword ? 'text' : 'password'" 
          id="confirmPassword" 
          v-model="user.confirmPassword" 
          required
        >
      </div>

      <button 
        type="button"
        class="show-password-btn" 
        @mousedown="showPassword = true"
        @mouseup="showPassword = false"
        @mouseleave="showPassword = false"
      >
        Показать пароль
      </button>

      <button 
        type="submit" 
        :disabled="!isFormValid"
        class="submit-btn"
      >
        Зарегистрироваться
      </button>
    </form>

    <div class="user-info" v-if="user.firstName || user.lastName">
      <p>
        Пользователь: {{ user.firstName }} {{ user.lastName }}. 
        {{ user.gender === 'male' ? 'Мужского' : 'Женского' }} пола.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const user = ref({
  firstName: '',
  lastName: '',
  gender: 'male',
  password: '',
  confirmPassword: ''
});

const showPassword = ref(false);

const isFormValid = computed(() => {
  return user.value.password === user.value.confirmPassword && 
         user.value.password.length > 0;
});

const handleSubmit = () => {
  console.log('Данные формы:', user.value);
  alert('Регистрация успешна! Данные выведены в консоль.');
};
</script>

<style>
.form-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.radio-group {
  display: flex;
  gap: 15px;
  margin-top: 5px;
}

.radio-group label {
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: normal;
  cursor: pointer;
}

.show-password-btn {
  display: block;
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.show-password-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background-color: #369f6d;
}

.user-info {
  margin-top: 20px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 4px;
}
</style>