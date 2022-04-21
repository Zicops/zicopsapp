export function truncateToN(str, N) {
  return str.length > N ? str.substring(0, N-3) + '...' : str;
}
