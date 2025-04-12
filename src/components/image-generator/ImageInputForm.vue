<script setup lang="ts">
import { ref } from 'vue'

const modelValue = defineModel<string>()
const emit = defineEmits<{
  (e: 'parseInput'): void
}>()

const example = `hero-banner, png, 800x400, Welcome!, ff5733, ffffff
icon, jpg, 128x128, , 00bfff
logo, webp`

function setExampleInput() {
  modelValue.value = example
  emit('parseInput')
}
</script>

<template>
  <div class="mb-8">
    <label for="input-text" class="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
      Input Format (one image per line)
    </label>
    <div class="flex flex-wrap items-center mb-3 text-sm text-gray-500 dark:text-gray-400">
      <span>Format: filename, format, size [optional], text [optional], background-color [optional], text-color [optional]</span>
      <button 
        @click="setExampleInput" 
        class="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-xs underline"
      >
        Load Example
      </button>
    </div>
    <div class="relative">
      <textarea
        id="input-text"
        v-model="modelValue"
        rows="5"
        class="w-full p-4 border dark:bg-gray-700/80 dark:text-white dark:border-gray-600 border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
        placeholder="hero-banner, png, 800x400, Welcome!, ff5733, ffffff"
      ></textarea>
      <div class="mt-4 flex justify-end">
        <button
          @click="$emit('parseInput')"
          class="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg active:scale-98"
        >
          Parse Input
        </button>
      </div>
    </div>
  </div>
</template> 