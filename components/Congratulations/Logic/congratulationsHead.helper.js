export const data = [
  {
    result: 'PASS',
    message: 'You have completed the exam...',
    text: 'Congratulations'
  },
  {
    result: 'FAIL',
    message: 'Better Luck Next Time',
    text: 'sorry'
  },
  {
    result: 'Completed',
    message: 'You have completed the exam...',
    text: 'Congratulations'
  }
];

export function getResultStyles(type) {
  const style = {
    color: '',
    width: '',
    imgLink: ''
  };

  const failImage = '/images/fail.png';
  const passImage = '/images/pass.png';
  const completedImage = '/images/completed.png';

  switch (type) {
    case 'PASS':
      style.imgLink = passImage;
      style.color = '#26BA4D';
      style.width = '72%';

      break;
    case 'FAIL':
      style.imgLink = failImage;
      style.color = '#F53D41';
      style.width = '66%';
      break;
    case 'Completed':
      style.imgLink = completedImage;
      style.color = '#26BA4D';
      style.width = '72%';
      break;
  }

  return style;
}
