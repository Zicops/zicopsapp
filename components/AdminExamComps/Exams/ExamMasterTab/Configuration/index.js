import styles from '../examMasterTab.module.scss';
import SwitchButton from '../../../../common/FormComponents/SwitchButton';
import { useRecoilState } from 'recoil';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import { changeHandler } from '../../../../../helper/common.helper';
import { useRouter } from 'next/router';

export default function Configuration() {
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

  const router = useRouter();
  const isPreview = router.query?.isPreview || false;

  const btns = [
    { name: 'shuffle', label: 'Question Shuffling' },
    { name: 'display_hints', label: 'Display Answer Hints' },
    { name: 'show_answer', label: 'Show right Answers on finish' },
    { name: 'show_result', label: 'Show result on finish' }
  ];

  return (
    <div className={`${styles.configurationContainer}`}>
      {btns.map(({ name, label }) => (
        <SwitchButton
          label={label}
          labelPlacement="end"
          inputName={name}
          isChecked={examTabData[name]}
          isDisabled={isPreview}
          handleChange={(e) => changeHandler(e, examTabData, setExamTabData)}
        />
      ))}
    </div>
  );
}
