<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mixer-container">
    <template v-if="props.firstEmoji">
      <BaseEmoji :emoji="props.firstEmoji" />
    </template>
    <span>➕</span>
    <template v-if="props.secondEmoji">
      <BaseEmoji :emoji="props.secondEmoji" />
    </template>
    <span>⬇️</span>
    <div class="img-container">
      <img :src="kitchenEmoji" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { computed } from 'vue';
import BaseEmoji from './BaseEmoji.vue';

const props = defineProps(['firstEmoji', 'secondEmoji']);

const kitchenEmoji = computed(() => {
  if (props.firstEmoji && props.secondEmoji) {
    const unicodeFirst = props.firstEmoji.unicode[0].replace('U+', '').toLowerCase();
    const unicodeSecond = props.secondEmoji.unicode[0].replace('U+', '').toLowerCase();
    return `https://emk.vercel.app/s/${unicodeFirst}_${unicodeSecond}?size=96`;
  }
  return null;
});
</script>

<style scoped>
.mixer-container {
  display: grid;
  grid-template-rows: repeat(5, fit-content(100px));
  align-items: start;
  font-size: 96px;
  justify-content: center;
  position: sticky;
  top: 0;
  height: fit-content;
}

.img-container {
  display: flex;
  flex-direction: column;
}

img {
  object-fit: cover;
  width: 96px;
  height: 96px;
  margin: 0 auto;
}
</style>