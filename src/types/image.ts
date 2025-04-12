export interface ImageParams {
  id: string
  filename: string
  format: string
  size: string
  text: string
  backgroundColor: string
  textColor: string
  error?: string
  previewUrl?: string
}

export const supportedFormats = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'gif', 'avif']
export const defaultSize = '300x300'
export const defaultBackgroundColor = '000000'
export const defaultTextColor = 'FFFFFF' 