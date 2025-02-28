export const getAccessibleColor = (backgroundColor: string) => {
    // Convert hex to RGB
    const hexToRgb = (hex: string) => 
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
         .replace(/^#/, '')
         .match(/.{2}/g)
         ?.map(x => parseInt(x, 16)) || [0, 0, 0]
  
    // Calculate luminance
    const getLuminance = (r: number, g: number, b: number) => 
      (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
    const [r, g, b] = hexToRgb(backgroundColor)
    const luminance = getLuminance(r, g, b)
    
    return luminance > 0.5 ? '#000000' : '#ffffff'
  }