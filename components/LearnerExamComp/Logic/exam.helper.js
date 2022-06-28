export function getPassingMarks(passingCriteria, totalMarks) {
  const [criteria, type] = passingCriteria?.split('-');

  if (type === 'Marks') return +criteria || 0;

  return (+criteria * 100) / +totalMarks || 0;
}
