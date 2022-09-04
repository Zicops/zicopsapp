import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { data } from '../Logic/exam.helper';
import styles from './examAllQuestion.module.scss';

const ExamAllQuestions = ({ current }) => {
  let learnerExamData = useRecoilValue(LearnerExamAtom);
  if (!learnerExamData?.examData?.id) learnerExamData = data;

  const hasAttachment = !!current.question?.attachment;
  const [showHint, setShowHint] = useState(false);

  return (
    <>
      <Box
        bgcolor={'#040404'}
        color={'#FFF'}
        width={'100%'}
        height={'220px'}
        pt={1}
        px={3}
        pb={4}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Box mb={1} color={'#868f8f'} fontSize={'2rem'}>
            {current.id}.
          </Box>
          <Grid container spacing={2} sx={{ px: 1 }}>
            <Grid
              item
              lg={hasAttachment ? 8 : 12}
              md={hasAttachment ? 8 : 12}
              sm={hasAttachment ? 8 : 12}
              xs={hasAttachment ? 8 : 12}>
              <Box>{current.question?.description}</Box>
            </Grid>
            {hasAttachment && (
              <Grid item lg={4} md={4} sm={4} xs={4} sx={{ mt: -2 }}>
                <Box width={'100%'} height={'150px'} display={'flex'} justifyContent={'flex-end'}>
                  {current.question.attachmentType.includes('image') && (
                    <img src={current.question.attachment} alt="image" />
                  )}
                  {current.question.attachmentType.includes('video') && (
                    <video controls src={current.question.attachment} alt="video" />
                  )}
                  {current.question.attachmentType.includes('audio') && (
                    <audio controls src={current.question.attachment} alt="audio" />
                  )}
                </Box>
              </Grid>
            )}
          </Grid>
        </div>

        {!!current?.question?.hint && learnerExamData?.examData?.display_hints && (
          <span className={styles.hintBtn} onClick={() => setShowHint(!showHint)}>
            <span>Hint </span>: {showHint && current?.question?.hint}
          </span>
        )}
      </Box>
    </>
  );
};

export default ExamAllQuestions;
