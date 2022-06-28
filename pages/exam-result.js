import { LearnerExamAtom } from '@/state/atoms/exams.atoms';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Congratulations from '../components/Congratulations';

export default function ExamResult() {
  // const answerData = [
  //   {
  //     id: 1,
  //     correctAnswer: 'b'
  //   },
  //   {
  //     id: 2,
  //     correctAnswer: 'a'
  //   },
  //   {
  //     id: 3,
  //     correctAnswer: 'a'
  //   },
  //   {
  //     id: 4,
  //     correctAnswer: 'a'
  //   },
  //   {
  //     id: 5,
  //     correctAnswer: 'c'
  //   },
  //   {
  //     id: 6,
  //     correctAnswer: 'c'
  //   },
  //   {
  //     id: 7,
  //     correctAnswer: 'c'
  //   },
  //   {
  //     id: 8,
  //     correctAnswer: 'd'
  //   },
  //   {
  //     id: 9,
  //     correctAnswer: 'b'
  //   },
  //   {
  //     id: 10,
  //     correctAnswer: 'b'
  //   },
  //   {
  //     id: 11,
  //     correctAnswer: 'c'
  //   },
  //   {
  //     id: 12,
  //     correctAnswer: 'a'
  //   },
  //   {
  //     id: 13,
  //     correctAnswer: 'd'
  //   },
  //   {
  //     id: 14,
  //     correctAnswer: 'c'
  //   },
  //   {
  //     id: 15,
  //     correctAnswer: 'a'
  //   }
  // ];
  // let result = '';
  // useEffect(() => {
  //   const temp = localStorage.getItem('exam/1');
  //   result = JSON.parse(temp);
  // }, []);

  // const handleScore = () => {
  //   let score = 0;
  //   let i = 0;
  //   while (i < result.length) {
  //     if (result[i].selectedOption === answerData[i].correctAnswer) score++;
  //     i++;
  //   }
  //   return score;
  // };

  const learnerExamData = useRecoilValue(LearnerExamAtom);
  const isShowResult = learnerExamData?.examData?.show_result || false;

  let result = 2;
  if (isShowResult) result = learnerExamData?.resultData?.isPassed ? 1 : 0;

  return (
    <>
      {/* <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        width={'100vw'}
        height={'100vh'}
        // fontWeight={600}
        // fontSize={'44px'}
        backgroundColor={'var(--dark_one)'}>
        //You have scored {handleScore()} out of {result.length}
      </Box> */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--dark_one)'
        }}>
        <Congratulations result={result} />
      </div>
    </>
  );
}
