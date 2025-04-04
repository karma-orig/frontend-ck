<template>
  <div class="app">
    <h1>Emoji Kitchen</h1>
    
    <div class="selectors">
      <EmojiListComponent 
        :emojis="emojis" 
        @select-emoji="selectFirstEmoji"
        class="emoji-list"
      />
      <EmojiMixedComponent 
        :first-emoji="selectedEmojis[0]" 
        :second-emoji="selectedEmojis[1]" 
      />
      <EmojiListComponent 
        :emojis="emojis" 
        @select-emoji="selectSecondEmoji"
        class="emoji-list"
      />
    </div>

    <div v-if="!selectedEmojis[0] && !selectedEmojis[1]" class="instructions">
      <p>Выберите два emoji, чтобы создать микс</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import EmojiListComponent from './components/EmojiListComponent.vue';
import EmojiMixedComponent from './components/EmojiMixedComponent.vue';

const emojis = ref([]);
const selectedEmojis = ref([null, null]);

const selectFirstEmoji = (emoji) => {
  selectedEmojis.value[0] = emoji;
};

const selectSecondEmoji = (emoji) => {
  selectedEmojis.value[1] = emoji;
};

const loadEmojis = async () => {
  try {
    const response = await fetch('https://emojihub.yurace.pro/api/all');
    emojis.value = await response.json();
  } catch (error) {
    console.error('Error loading emojis:', error);
  }
};

onMounted(() => {
  loadEmojis();
});
</script>

<style>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
}

.selectors {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.emoji-list {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
  max-height: 70vh;
  overflow-y: auto;
}

.instructions {
  text-align: center;
  margin-top: 30px;
  color: #666;
  font-size: 1.2rem;
}
</style>