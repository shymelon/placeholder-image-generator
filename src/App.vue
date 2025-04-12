<script setup lang="ts">
import { useTheme } from './composables/useTheme'
import { useImageGeneration } from './composables/useImageGeneration'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import ImageInputForm from './components/image-generator/ImageInputForm.vue'
import ImagesList from './components/image-generator/ImagesList.vue'
import DownloadButton from './components/image-generator/DownloadButton.vue'
import './assets/main.css'

// Set up theme
const { isDarkMode, toggleDarkMode } = useTheme()

// Set up image generation
const { 
  inputText, 
  parsedImages, 
  isGenerating, 
  isSuccess, 
  errorMessage,
  parseInput, 
  downloadImages, 
  updateImage 
} = useImageGeneration()
</script>

<template>
  <div class="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
    <div class="max-w-6xl mx-auto">
      <AppHeader :isDarkMode="isDarkMode" @toggleDarkMode="toggleDarkMode" />

      <main class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 transition-colors duration-300 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 mt-8">
        <ImageInputForm 
          v-model="inputText"
          @parseInput="parseInput" 
        />

        <ImagesList 
          :images="parsedImages" 
          @update:image="updateImage" 
        />
        
        <DownloadButton 
          v-if="parsedImages.length" 
          :images="parsedImages" 
          :isGenerating="isGenerating" 
          :isSuccess="isSuccess" 
          :errorMessage="errorMessage" 
          @download="downloadImages" 
        />
      </main>
      
      <AppFooter />
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}

/* Add glass morphism effect */
.dark .bg-opacity-95 {
  backdrop-filter: blur(12px);
}

.bg-opacity-95 {
  backdrop-filter: blur(8px);
}

/* Add subtle animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

main {
  animation: fadeIn 0.5s ease-in-out;
}

.active\:scale-98:active {
  transform: scale(0.98);
}

/* Remove default outline on focus */
input:focus, select:focus, textarea:focus {
  outline: none !important;
}

/* Add padding to inputs in cards */
.grid input, .grid select {
  padding: 0.625rem 0.75rem;
}

/* Fix textarea padding */
#input-text {
  padding: 1rem;
}
</style>
