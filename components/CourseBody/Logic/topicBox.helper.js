import { atom } from 'recoil';

export const ShowNotAssignedErrorAtom = atom({
  key: 'ShowNotAssignedError',
  default: false
});

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
  if (!passingCriteria) return 'N/A';
  //checking if passing criteria is marks or Percentage
  const passingCriteriaArr = passingCriteria?.split('-') || [];
  if (!+passingCriteriaArr?.[0]) return 'N/A';
  const updatedPassingCriteria =
    passingCriteriaArr?.[1] === 'Percentage'
      ? passingCriteriaArr?.[0] + '%'
      : passingCriteriaArr?.[0];

  return `${updatedPassingCriteria}`;
}
