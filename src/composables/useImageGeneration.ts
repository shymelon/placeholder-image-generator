import { ref, computed } from 'vue'
import type { ImageParams } from '../types/image'
import { parseImageInput, downloadAsZip, downloadSingleImage } from '../utils/imageUtils'

export function useImageGeneration() {
  const inputText = ref('')
  const parsedImages = ref<ImageParams[]>([])
  const isGenerating = ref(false)
  const isSuccess = ref(false)
  const errorMessage = ref('')

  const hasErrors = computed(() => {
    return parsedImages.value.some(img => !!img.error)
  })

  function parseInput() {
    parsedImages.value = parseImageInput(inputText.value)
  }

  async function downloadImages() {
    try {
      isGenerating.value = true
      errorMessage.value = ''
      const validImages = parsedImages.value.filter(img => !img.error)
      
      if (validImages.length === 0) {
        throw new Error('No valid images to download')
      }

      // Try to use ZIP if more than one image
      if (validImages.length > 1) {
        await downloadAsZip(validImages)
      } else {
        await downloadSingleImage(validImages[0])
      }
      
      isSuccess.value = true
      setTimeout(() => {
        isSuccess.value = false
      }, 3000)
    } catch (error) {
      console.error('Download error:', error)
      errorMessage.value = error instanceof Error ? error.message : 'Unknown error occurred'
    } finally {
      isGenerating.value = false
    }
  }

  function updateImage(index: number, image: ImageParams) {
    parsedImages.value[index] = image
  }

  return {
    inputText,
    parsedImages,
    isGenerating,
    isSuccess,
    errorMessage,
    hasErrors,
    parseInput,
    downloadImages,
    updateImage
  }
} 