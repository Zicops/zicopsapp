export function getImageBasedOnResourceType(type) {
  if (type === 'LINK') return '/images/URL-icon.png';
  if (type === 'PDF') return '/images/PDF-icon.png';
  if (type === 'DOC') return '/images/DOC-icon.png';
  if (type === 'DOCX') return '/images/DOCX-icon.png';
  if (type === 'PPT') return '/images/PPT-icon.png';
  if (type === 'EXCEL') return '/images/media-container.png';

  return '/images/media-container.png';
}
