export function imageResourceType(type) {
  let resourceImage;

  switch (type) {
    case 'LINK':
      resourceImage = '/images/URL-icon.png';
      break;
    case 'PDF':
      resourceImage = '/images/PDF-icon.png';
      break;
    case 'DOC':
      resourceImage = '/images/DOC-icon.png';
      break;
    case 'DOCX':
      resourceImage = '/images/DOCX-icon.png';
      break;
    case 'PPT':
      resourceImage = '/images/PPT-icon.png';
      break;
    case 'EXCEL':
      resourceImage = '/images/media-container.png';
      break;
  }
  return resourceImage;
}
