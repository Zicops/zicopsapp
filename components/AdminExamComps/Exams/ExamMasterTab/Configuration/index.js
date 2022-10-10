import styles from '../examMasterTab.module.scss';
import SwitchButton from '../../../../common/FormComponents/SwitchButton';
import { useRecoilState } from 'recoil';
import { ExamTabDataAtom } from '../../../../../state/atoms/exams.atoms';
import { changeHandler } from '../../../../../helper/common.helper';
import { useRouter } from 'next/router';
import ToolTip from '@/components/common/ToolTip';

export default function Configuration() {
  const [examTabData, setExamTabData] = useRecoilState(ExamTabDataAtom);

  const router = useRouter();
  const isPreview = router.query?.isPreview || router.asPath?.includes('view') || false;

  const btns = [
    { name: 'shuffle', label: 'Question Shuffling' },
    { name: 'display_hints', label: 'Display Answer Hints' },
    { name: 'show_answer', label: 'Show right Answers on finish' },
    { name: 'show_result', label: 'Show result on finish' }
  ];

  const configurationTooltipTitle = {
    shuffle: 'Change display order of questions for learners',
    display_hints: 'Show answer hints during attempt',
    show_answer: 'Show answer key on finish',
    show_result: 'Show learner result on finish'
  };

  return (
    <div className={`${styles.configurationContainer}`}>
      {btns.map(({ name, label }) => (
        <ToolTip title={configurationTooltipTitle[`${name}`]} placement="right">
          <span>
            <SwitchButton
              label={label}
              labelPlacement="end"
              inputName={name}
              isChecked={examTabData[name]}
              isDisabled={isPreview}
              handleChange={(e) => changeHandler(e, examTabData, setExamTabData)}
            />
          </span>
        </ToolTip>
      ))}
    </div>
  );
}
