export const getAccessibleColor = (backgroundColor: string) => {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const normalizedHex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
  };

  // Calculate luminance
  const getLuminance = (r: number, g: number, b: number) =>
    (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  const [r, g, b] = hexToRgb(backgroundColor);
  const luminance = getLuminance(r, g, b);

  return luminance > 0.5 ? '#000000' : '#ffffff';
};