<script setup lang="ts">
import { computed } from 'vue'
import type { ImageParams } from '../../types/image'
import ImageItem from './ImageItem.vue'
import IconWarning from '../icons/IconWarning.vue'

interface Props {
  images: ImageParams[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:image', index: number, image: ImageParams): void
}>()

const hasErrors = computed(() => {
  return props.images.some(img => !!img.error)
})

function updateImage(index: number, image: ImageParams) {
  emit('update:image', index, image)
}

function handleImageUpdate(newImage: ImageParams, index: number) {
  updateImage(index, newImage)
}
</script>

<template>
  <div v-if="images.length" class="mb-6">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b dark:border-gray-700 pb-2">Image Preview</h2>
    
    <div v-if="hasErrors" class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 rounded-xl text-yellow-800 dark:text-yellow-200">
      <div class="flex items-center">
        <IconWarning class="mr-2" />
        <p>Please fix the errors below before downloading.</p>
      </div>
    </div>
    
    <div class="space-y-6">
      <div v-for="(image, index) in images" :key="image.id">
        <ImageItem 
          :image="image" 
          @update:image="newImage => handleImageUpdate(newImage, index)" 
        />
      </div>
    </div>
  </div>
</template> 