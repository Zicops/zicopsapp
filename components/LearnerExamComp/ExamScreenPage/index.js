import ExamAlertPopupOne from '@/components/ExamAlertPopup/ExamAlertPopupOne';
import { toggleFullScreen } from '@/helper/utils.helper';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import LearnerExamComponent from '..';
import ExamInstructions from '../ExamInstructions';
import styles from '../learnerExam.module.scss';

export default function ExamScreenPage({
  isSampleTest = false,
  isLoading = false,
  isLearner,
  questionData,
  setQuestionData,
  current,
  setCurrent,
  calculateResult = () => {},
  syncDataWithBackend = () => {},
  handleExamStart = () => {},
  startExam = '',
  handlePopUpClose = () => {},
  handleContinue = () => {},
  handleNewAttempt = () => {}
}) {
  const router = useRouter();
  const examId = router.query?.examId || null;
  const courseId = router.query?.courseId || null;

  const refFullscreen = useRef(null);

  const [isFullScreen, setIsFullScreen] = useState(0);

  // update full screen state
  useEffect(() => {
    window.addEventListener('resize', () => {
      setIsFullScreen(
        !!(
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement
        )
      );
    });

    return ()=> toggleFullScreen(document.body)
  }, []);

  function backToCourse() {
    if (isSampleTest) return router.push(`${localStorage?.getItem('sampleTestStartLink') || '/'}`);

    router.push(`/course/${courseId}?activateExam=${examId}`, `/course/${courseId}`);
  }

  // loader screen till loading
  if (isLoading) {
    return (
      <div className={styles.loadingExamScreen}>
        <ThemeProvider theme={createTheme({ palette: { primary: { main: '#6bcfcf' } } })}>
          <CircularProgress />
        </ThemeProvider>
      </div>
    );
  }

  return (
    <>
      <div ref={refFullscreen}>
        {isLearner ? (
          <LearnerExamComponent
            data={questionData}
            setData={setQuestionData}
            current={current}
            setCurrent={setCurrent}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            calculateResult={calculateResult}
            syncDataWithBackend={syncDataWithBackend}
          />
        ) : (
          // <ExamLandingPage setIsLearner={setIsLearner} />
          <ExamInstructions
            handleStart={handleExamStart}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
            handleBackBtn={backToCourse}
          />
        )}

        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            display: 'flex',
            gap: '10px',
            marginLeft: '40px'
          }}>
          <div
            onClick={() => setIsFullScreen(toggleFullScreen(document.body))}
            style={{ cursor: 'pointer' }}>
            {isFullScreen ? (
              <Image src="/images/svg/fullscreen_exit.svg" height={30} width={30} />
            ) : (
              <Image src="/images/svg/fullscreen.svg" height={30} width={30} />
            )}
          </div>

          <div onClick={backToCourse} style={{ cursor: 'pointer' }}>
            <Image src="/images/svg/clear.svg" height={30} width={30} />
          </div>
        </div>

        {startExam?.includes('alertOne') && (
          <ExamAlertPopupOne
            handleClose={handlePopUpClose}
            handleContinue={handleContinue}
            handleNewAttempt={handleNewAttempt}
            isLastAttempt={startExam?.includes('alertOneLast')}
          />
        )}
        {/* <ExamAlertPopupTwo /> */}
      </div>
    </>
  );
}
