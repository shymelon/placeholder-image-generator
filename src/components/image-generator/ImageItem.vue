<script setup lang="ts">
import type { ImageParams } from '../../types/image'
import { supportedFormats } from '../../types/image'
import { validateImage } from '../../utils/imageUtils'

interface Props {
  image: ImageParams
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:image', image: ImageParams): void
}>()

function updateImageProperty() {
  const validatedImage = validateImage(props.image)
  emit('update:image', validatedImage)
}
</script>

<template>
  <div 
    class="p-5 border rounded-xl transition-all duration-300 hover:shadow-md" 
    :class="{ 
      'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/30': image.error, 
      'border-gray-200 dark:border-gray-700': !image.error 
    }"
  >
    <div class="grid grid-cols-1 md:grid-cols-7 gap-5">
      <!-- Preview -->
      <div class="md:col-span-2 flex justify-center items-center bg-gray-100 dark:bg-gray-700/50 p-3 rounded-xl transition-colors duration-300">
        <img
          v-if="image.previewUrl"
          :src="image.previewUrl"
          :alt="image.filename"
          class="max-w-full max-h-48 object-contain rounded shadow-sm"
        />
        <div v-else class="text-red-500 dark:text-red-400 text-center py-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto mb-2 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Preview not available</span>
        </div>
      </div>
      
      <!-- Properties -->
      <div class="md:col-span-5 space-y-4">
        <div v-if="image.error" class="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl text-sm mb-3 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ image.error }}
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label :for="`filename-${image.id}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Filename*
            </label>
            <input
              :id="`filename-${image.id}`"
              v-model="image.filename"
              @change="updateImageProperty"
              class="mt-1 w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors duration-300"
              type="text"
            />
          </div>
          
          <div>
            <label :for="`format-${image.id}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Format*
            </label>
            <select
              :id="`format-${image.id}`"
              v-model="image.format"
              @change="updateImageProperty"
              class="mt-1 w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors duration-300"
            >
              <option v-for="format in supportedFormats" :key="format" :value="format">
                {{ format }}
              </option>
            </select>
          </div>
          
          <div>
            <label :for="`size-${image.id}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Size
            </label>
            <input
              :id="`size-${image.id}`"
              v-model="image.size"
              @change="updateImageProperty"
              class="mt-1 w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors duration-300"
              placeholder="300x300"
              type="text"
            />
          </div>
          
          <div>
            <label :for="`text-${image.id}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Text
            </label>
            <input
              :id="`text-${image.id}`"
              v-model="image.text"
              @change="updateImageProperty"
              class="mt-1 w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors duration-300"
              type="text"
            />
          </div>
          
          <div>
            <label :for="`bg-color-${image.id}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Background Color
            </label>
            <div class="mt-1 flex">
              <span class="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/80 text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
                #
              </span>
              <input
                :id="`bg-color-${image.id}`"
                v-model="image.backgroundColor"
                @change="updateImageProperty"
                class="flex-1 rounded-none rounded-r-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors duration-300"
                type="text"
                placeholder="000000"
              />
            </div>
          </div>
          
          <div>
            <label :for="`text-color-${image.id}`" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Text Color
            </label>
            <div class="mt-1 flex">
              <span class="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/80 text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">
                #
              </span>
              <input
                :id="`text-color-${image.id}`"
                v-model="image.textColor"
                @change="updateImageProperty"
                class="flex-1 rounded-none rounded-r-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white focus:border-blue-500 focus:ring-blue-500 text-sm transition-colors duration-300"
                type="text"
                placeholder="FFFFFF"
              />
            </div>
          </div>
        </div>
        
        <div v-if="image.previewUrl" class="text-xs text-gray-500 dark:text-gray-400 break-all border-t dark:border-gray-700 pt-3 mt-3">
          <span>URL: {{ image.previewUrl }}</span>
        </div>
      </div>
    </div>
  </div>
</template> 