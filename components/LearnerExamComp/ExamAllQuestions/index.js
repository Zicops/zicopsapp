import styles from './examAllQuestion.module.scss';
import Image from 'next/image';
import { Box, Grid } from '@mui/material';

const ExamAllQuestions = ({ current }) => {
  const hasAttachment = !!current.question?.attachment;

  return (
    <>
      <Box bgcolor={'#040404'} color={'#FFF'} width={'100%'} height={'220px'} pt={1} px={3} pb={4}>
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
      </Box>
    </>
  );
};

export default ExamAllQuestions;
