import CongratulationsBody from '../common/CongratulationsBody';
import CongratulationsFooter from '../common/CongratulationsFooter';
import CongratulationsHead from '../common/CongratulationsHead';
import { data } from '../common/CongratulationsHead/Logic/congratulationsHead.helper';
import CongratulationsScreen from '../common/CongratulationsScreen';
import CongratulationsScreenButton from '../common/CongratulationsScreenButton';
const Congratulations = () => {
  const failImage = '/images/fail.png';
  const passImage = '/images/pass.png';
  const completedImage = '/images/completed.png';
  const style = {
    color: '',
    width: '',
    imgLink: ''
  };
  switch (data[0].result) {
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
    <div>
      <CongratulationsScreen>
        <CongratulationsHead
          user_name={'pallav'}
          exam_name={'Fundamentals Of Java Programming'}
          data={data[0]}
          style={style}
        />
        <CongratulationsBody data={data[0]} style={style} />
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
