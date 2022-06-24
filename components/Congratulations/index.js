import CongratulationsBody from './CongratulationsBody';
import CongratulationsFooter from './CongratulationsFooter';
import CongratulationsHead from './CongratulationsHead';
import { data } from './Logic/congratulationsHead.helper';
import CongratulationsScreen from './CongratulationsScreen';
import CongratulationsScreenButton from '../common/CongratulationsScreenButton';
const Congratulations = ({ result }) => {
  const failImage = '/images/fail.png';
  const passImage = '/images/pass.png';
  const completedImage = '/images/completed.png';
  const style = {
    color: '',
    width: '',
    imgLink: ''
  };
  switch (data[result].result) {
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
  return (
    <div style={{ width: '70%' }}>
      <CongratulationsScreen>
        <CongratulationsHead
          user_name={'pallav'}
          exam_name={'Fundamentals Of Java Programming'}
          data={data[result]}
          style={style}
        />
        <CongratulationsBody data={data[result]} style={style} />
      </CongratulationsScreen>
      <CongratulationsFooter>
        <CongratulationsScreenButton title={'Download Result'} />
        <CongratulationsScreenButton title={'View Attempt History'} />

        <CongratulationsScreenButton title={'Exit And Return To Main Screen'} />
      </CongratulationsFooter>
    </div>
  );
};

export default Congratulations;
