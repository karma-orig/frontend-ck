<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <BaseEmoji 
      v-for="emoji of emojis" 
      :key="emoji.name" 
      :emoji="emoji"
      @select="$emit('selectEmoji', emoji)"
    />
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import BaseEmoji from './BaseEmoji.vue';

defineProps({
  emojis: {
    type: Array,
    required: true
  }
});

defineEmits(['selectEmoji']);
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  font-size: 3rem;
  gap: 10px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
}
</style>