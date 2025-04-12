<script setup lang="ts">
import { computed } from 'vue'
import type { ImageParams } from '../../types/image'
import IconDownload from '../icons/IconDownload.vue'
import IconLoading from '../icons/IconLoading.vue'
import IconCheck from '../icons/IconCheck.vue'
import IconError from '../icons/IconError.vue'

interface Props {
  images: ImageParams[]
  isGenerating: boolean
  isSuccess: boolean
  errorMessage: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'download'): void
}>()

const hasErrors = computed(() => {
  return props.images.some(img => !!img.error)
})
</script>

<template>
  <div>
    <div class="mt-8 flex justify-end">
      <button
        @click="$emit('download')"
        :disabled="hasErrors || isGenerating"
        class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
        :class="{ 'opacity-50 cursor-not-allowed': hasErrors || isGenerating }"
      >
        <span v-if="isGenerating" class="flex items-center">
          <IconLoading class="-ml-1 mr-2" />
          Generating...
        </span>
        <span v-else class="flex items-center">
          <IconDownload class="mr-1.5" />
          Download Images
        </span>
      </button>
    </div>
    
    <div v-if="isSuccess" class="mt-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-400 dark:border-green-700 rounded-xl">
      <div class="flex text-green-800 dark:text-green-200">
        <IconCheck class="mr-2" />
        <p>Images downloaded successfully!</p>
      </div>
    </div>
    
    <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-xl">
      <div class="flex text-red-800 dark:text-red-200">
        <IconError class="mr-2" />
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template> 