import styles from '../examMasterTab.module.scss';
import SwitchButton from '../../../../common/SwitchButton';
import { useRecoilState } from 'recoil';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import { changeHandler } from '../../../../../helper/common.helper';

export default function Configuration() {
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

  return (
    <div className={`${styles.configurationContainer}`}>
      <SwitchButton
        text={'Question Shuffling'}
        inputName="shuffle"
        isChecked={examTabData.shuffle}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
      />
      <SwitchButton
        text={'Display Answer Hints'}
        inputName="display_hints"
        isChecked={examTabData.display_hints}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
      />
      <SwitchButton
        text={'Show right Answers on finish'}
        inputName="show_answer"
        isChecked={examTabData.show_answer}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
      />
      <SwitchButton
        text={'Show result on finish'}
        inputName="show_result"
        isChecked={examTabData.show_result}
        changeHandler={(e) => changeHandler(e, examTabData, setExamTabData)}
      />
    </div>
  );
}
