/**
 * Truncates a string if it exceeds the specified length and adds "..." at the end.
 *
 * @param {string} txt - The input text to be truncated.
 * @param {number} [max=50] - The maximum allowed length of the string (default: 50).
 * @returns {string} - The truncated string with "..." if it exceeds `max`, otherwise the original string.
 */
export const txtSlicers = (txt: string, max: number = 20): string => {
  return txt.length > max ? `${txt.slice(0, max)}...` : txt;
};
