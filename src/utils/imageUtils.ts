import type { ImageParams } from '../types/image'
import { supportedFormats, defaultSize, defaultBackgroundColor, defaultTextColor } from '../types/image'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export function generateImageUrl(image: ImageParams): string {
  let url = `https://placehold.co/${image.size}`
  
  // Always include the background and text colors
  url += `/${image.backgroundColor}/${image.textColor}`
  
  url += `.${image.format}`
  
  if (image.text && image.text !== image.size) {
    url += `?text=${encodeURIComponent(image.text.replace(/ /g, '+'))}`
  }
  
  return url
}

export function validateImage(image: ImageParams): ImageParams {
  // Clone the image to avoid mutating the original
  const validatedImage = { ...image }
  
  // Clear previous error
  validatedImage.error = undefined
  
  // Revalidate
  if (!validatedImage.filename) {
    validatedImage.error = 'Filename is required'
  } else if (!validatedImage.format) {
    validatedImage.error = 'Format is required'
  } else if (!supportedFormats.includes(validatedImage.format.toLowerCase())) {
    validatedImage.error = `Unsupported format: ${validatedImage.format}. Use: ${supportedFormats.join(', ')}`
  } else if (!/^\d+x\d+$/.test(validatedImage.size) && validatedImage.size !== '') {
    validatedImage.error = 'Size must be in format: WIDTHxHEIGHT'
  } else if (validatedImage.backgroundColor && !/^[0-9A-Fa-f]{6}$/.test(validatedImage.backgroundColor)) {
    validatedImage.error = 'Background color must be a valid 6-digit hex color'
  } else if (validatedImage.textColor && !/^[0-9A-Fa-f]{6}$/.test(validatedImage.textColor)) {
    validatedImage.error = 'Text color must be a valid 6-digit hex color'
  }
  
  // Set default values if not provided
  if (!validatedImage.size) {
    validatedImage.size = defaultSize
  }
  
  // Set default text to size if not provided
  if (!validatedImage.text) {
    validatedImage.text = validatedImage.size
  }
  
  // Default background color
  if (!validatedImage.backgroundColor) {
    validatedImage.backgroundColor = defaultBackgroundColor
  }
  
  // Default text color
  if (!validatedImage.textColor) {
    validatedImage.textColor = defaultTextColor
  }
  
  // Update preview URL
  if (!validatedImage.error) {
    validatedImage.previewUrl = generateImageUrl(validatedImage)
  }
  
  return validatedImage
}

export async function downloadAsZip(images: ImageParams[]): Promise<void> {
  const zip = new JSZip()
  
  const fetchPromises = images.map(async (image) => {
    try {
      const response = await fetch(image.previewUrl || '')
      if (!response.ok) throw new Error(`Failed to fetch ${image.filename}`)
      
      const blob = await response.blob()
      zip.file(`${image.filename}.${image.format}`, blob)
    } catch (error) {
      console.error(`Error fetching ${image.filename}:`, error)
      throw error
    }
  })
  
  await Promise.all(fetchPromises)
  const content = await zip.generateAsync({ type: 'blob' })
  saveAs(content, 'placeholder-images.zip')
}

export async function downloadSingleImage(image: ImageParams): Promise<void> {
  const response = await fetch(image.previewUrl || '')
  if (!response.ok) throw new Error(`Failed to fetch ${image.filename}`)
  
  const blob = await response.blob()
  saveAs(blob, `${image.filename}.${image.format}`)
}

export function parseImageInput(input: string): ImageParams[] {
  const lines = input.split('\n').filter(line => line.trim() !== '')
  const images: ImageParams[] = []

  lines.forEach((line, index) => {
    const parts = line.split(',').map(part => part.trim())
    
    // Get initial filename and format
    let filename = parts[0] || ''
    let format = parts[1] || ''
    
    // Parse format to lowercase
    format = format.toLowerCase()
    
    // Remove format extension from filename if it exists
    if (filename.includes('.')) {
      const filenameParts = filename.split('.')
      const possibleExtension = filenameParts.pop()?.toLowerCase() || ''
      
      // If the extension matches a supported format, remove it
      if (supportedFormats.includes(possibleExtension)) {
        filename = filenameParts.join('.')
        // If no format was specified, use the extension as format
        if (!format) {
          format = possibleExtension
        }
      }
    }
    
    const image: ImageParams = {
      id: `img-${index}`,
      filename,
      format,
      size: parts[2] || defaultSize,
      text: parts[3] || '',
      backgroundColor: parts[4] || '',
      textColor: parts[5] || ''
    }

    // Validate the image and add it to the array
    images.push(validateImage(image))
  })

  return images
} 