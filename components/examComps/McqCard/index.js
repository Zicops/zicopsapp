import Button from '../../common/Button';
import styles from './mcqCard.module.scss';
import McqOption from './McqOption';
import Image from 'next/image';
import { Box } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { LearnerExamAtom } from '@/state/atoms/exams.atoms';

const McqCard = ({ each, setIsQuestion, setOption, data, setData, current, setCurrent }) => {
  const learnerExamData = useRecoilValue(LearnerExamAtom);
  console.log(learnerExamData);

  const obj = {
    option: 'a',
    hint: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
  };
  obj.src = '/images/courses/1.png';
  // obj.quesSrc = '/images/courses/1.png';

  const handleChange = () => {
    return data.map(function (obj) {
      if (obj.id === each.id) {
        return {
          ...obj,
          isVisited: true
        };
      } else {
        return { ...obj };
      }
    });
  };

  const hasAttachment = !!each.question?.attachment;

  let index = 0;

  return (
    <>
      <div
        className={`${styles.mcq_container}`}
        onClick={() => {
          setCurrent(data.filter((e) => e.id === each.id)[0]);
          setData(handleChange());
          setOption(data.filter((e) => e.id === each.id)[0]?.selectedOption);
          setIsQuestion(false);
        }}>
        <div className={`${styles.qcontent}`}>
          <p className={`${styles.span_element}`}>
            {/* TODO : Add difficulty lebel */}
            <span>Q{each.id}.</span>
            <span>{each.question.description}</span>
          </p>
        </div>
        {hasAttachment && (
          <Box width={'100%'} display={'flex'} justifyContent={'center'} mb={4}>
            {each.question.attachmentType.includes('image') && (
              <img src={each.question.attachment} alt="image" width="150px" height="90px" />
            )}
            {each.question.attachmentType.includes('video') && (
              <video
                controls
                src={each.question.attachment}
                alt="video"
                width="150px"
                height="90px"
              />
            )}
            {each.question.attachmentType.includes('audio') && (
              <audio
                controls
                src={each.question.attachment}
                alt="audio"
                // width="150px" height="90px"
              />
            )}
          </Box>
        )}
        <section className={`${styles.option_container}`}>
          {each.options.map((option) => (
            <McqOption index={index++} optionData={option} checked={each.selectedOption} />
          ))}
        </section>

        {learnerExamData?.examData?.display_hints && (
          <>
            <span className={`${styles.span_element}`}>Hint:</span>
            <div className={`${styles.hint}`}>{obj.hint}</div>
          </>
        )}
      </div>
    </>
  );
};

export default McqCard;
