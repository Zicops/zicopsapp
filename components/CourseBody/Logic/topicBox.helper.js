export function imageTypeTopicBox(type) {
  let topicImage;
  switch (type) {
    case 'Lab':
      topicImage = '/images/PDF-icon.png';
      break;
    case 'Assessment':
      topicImage = '/images/media-container.png';
      break;
    case 'Content':
      topicImage = '/images/lightBrain-icon.png';
      break;
  }

  return topicImage;
}

export function passingCriteriaSymbol(passingCriteria) {
  //checking if passing criteria is marks or Percentage
  if (passingCriteria) {
    const updatedPassingCriteria =
      passingCriteria?.split('-')[1] === 'Percentage'
        ? passingCriteria?.split('-')[0] + '%'
        : passingCriteria?.split('-')[0];

    return `${updatedPassingCriteria}`;
  }

  if (!!passingCriteria) return `0 M`;
}
