<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div 
    class="emoji" 
    @click="$emit('select', emoji)"
    v-html="emoji.htmlCode[0]"
  ></div>
</template>

<script setup>
/* eslint-disable no-undef */
defineProps({
  emoji: {
    type: Object,
    required: true
  }
});

defineEmits(['select']);
</script>

<style scoped>
.emoji {
  cursor: pointer;
  transition: transform 0.2s;
  display: inline-block;
  margin: 5px;
}

.emoji:hover {
  transform: scale(1.2);
}
</style>