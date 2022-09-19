export function imageTypeTopicBox(type) {
  let topicImage;
  switch (type) {
    case 'Lab':
      topicImage = '/images/PDF-icon.png';
      break;
    case 'Assessment':
      topicImage = '/images/Rectangle 55 (1).png';
      break;
    case 'Content':
      topicImage = '/images/Rectangle 55.png';
      break;
    case 'Classroom':
      topicImage = '/images/Rectangle 55 (2).png';
      break;
    default:
      topicImage = '/images/Rectangle 55 (3).png';
      break;
  }

  return topicImage;
}

export function passingCriteriaSymbol(passingCriteria) {
  if (!passingCriteria) return ``;
  //checking if passing criteria is marks or Percentage
  const updatedPassingCriteria =
    passingCriteria?.split('-')[1] === 'Percentage'
      ? passingCriteria?.split('-')[0] + '%'
      : passingCriteria?.split('-')[0];

  return `${updatedPassingCriteria}`;
}
