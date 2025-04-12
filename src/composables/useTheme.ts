import { ref, onMounted } from 'vue'

export function useTheme() {
  const isDarkMode = ref(false)

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value
    
    if (isDarkMode.value) {
      localStorage.setItem('theme', 'dark')
    } else {
      localStorage.setItem('theme', 'light')
    }
    
    applyTheme()
  }

  function applyTheme() {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Initialize theme on mount
  onMounted(() => {
    // Check for system preference
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Set initial dark mode based on stored preference or system preference
    isDarkMode.value = storedTheme === 'dark' || (storedTheme === null && prefersDark)
    
    // Apply theme immediately on mount
    applyTheme()
  })

  return {
    isDarkMode,
    toggleDarkMode
  }
} 