export function truncateToN(str, N = 100) {
  if (!str) return '';

  return str.length > N ? str.substring(0, N - 3) + '...' : str;
}

export function isWordMatched(firstWord = '', secondWord = '') {
  if (firstWord == null) return false;
  if (secondWord == null) return false;

  return firstWord?.trim()?.toLowerCase() === secondWord?.trim()?.toLowerCase();
}
