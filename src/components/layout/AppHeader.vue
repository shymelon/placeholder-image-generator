<script setup lang="ts">
import IconSun from '../icons/IconSun.vue'
import IconMoon from '../icons/IconMoon.vue'

interface Props {
  isDarkMode: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggleDarkMode'): void
}>()
</script>

<template>
  <header class="mb-12 text-center relative flex flex-col items-center">
    <div class="absolute right-0 top-0">
      <button 
        @click="$emit('toggleDarkMode')" 
        class="p-2 rounded-full transition-all duration-300 hover:bg-gray-200/80 dark:hover:bg-gray-700/80 shadow-sm hover:shadow-md active:scale-95"
        :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <!-- Sun icon for dark mode -->
        <IconSun v-if="isDarkMode" />
        <!-- Moon icon for light mode -->
        <IconMoon v-else />
      </button>
    </div>
    <h1 class="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4">
      Placeholder Image Generator
    </h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Generate multiple placeholder images with a single click</p>
  </header>
</template> 