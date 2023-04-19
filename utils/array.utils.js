export function sortArrByKeyInOrder(array, key = 'sequence', isAsc = true) {
  if (!array?.length) return [];

  const _arr = structuredClone(array || []);
  let ascVal = -1,
    desVal = 1;
  if (isAsc) {
    ascVal = 1;
    desVal = -1;
  }
  return _arr?.sort((a, b) => (a[key] > b[key] ? ascVal : desVal));
}
