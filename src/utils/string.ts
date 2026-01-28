export const generateId = (prefix: string, label: string): string => {
  const normalizedLabel = label.toLowerCase().replace(/\s+/g, '-')
  return `${prefix}-${normalizedLabel}`
}
