import { colors } from '../config/colors'

// Inyectar variables CSS desde colors.ts al DOM
export const injectColorVariables = () => {
  if (typeof document === 'undefined') return

  const root = document.documentElement

  Object.entries(colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      root.style.setProperty(`--${colorName}-${shade}`, value)
    })
  })
}
