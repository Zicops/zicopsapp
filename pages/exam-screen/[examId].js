import { useLazyQuery } from '@apollo/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  GET_EXAM_INSTRUCTION,
  GET_EXAM_META,
  GET_EXAM_SCHEDULE,
  GET_FIXED_QUESTION,
  GET_QB_SECTION_MAPPING_BY_SECTION,
  GET_QUESTION_BANK_QUESTIONS,
  GET_QUESTION_OPTIONS,
  GET_QUESTION_PAPER_META,
  GET_QUESTION_PAPER_SECTION,
  queryClient
} from '../../API/Queries';
import LearnerExamComponent from '../../components/LearnerExamComp';
import ExamInstruction from '../../components/LearnerExamComp/ExamInstructions';
import { toggleFullScreen } from '../../helper/utils.helper';
import { LearnerExamAtom } from '../../state/atoms/exams.atoms';
import styles from "../../components/LearnerExamComp/learnerExam.module.scss";
import {CircularProgress} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const ExamScreen = () => {
  const [loadMaster, { error: loadMasterError }] = useLazyQuery(GET_EXAM_META, {
    client: queryClient
  });
  const [loadPaperMeta, { error: loadMetaError }] = useLazyQuery(GET_QUESTION_PAPER_META, {
    client: queryClient
  });
  const [loadInstructions, { error: loadInsError }] = useLazyQuery(GET_EXAM_INSTRUCTION, {
    client: queryClient
  });
  const [loadSchedule, { error: loadScheduleError }] = useLazyQuery(GET_EXAM_SCHEDULE, {
    client: queryClient
  });
  const [loadPaperSection, { error: loadSectionError }] = useLazyQuery(GET_QUESTION_PAPER_SECTION, {
    client: queryClient
  });
  const [loadQBSectionMapping, { error: loadQBSectionMapError }] = useLazyQuery(
    GET_QB_SECTION_MAPPING_BY_SECTION,
    { client: queryClient }
  );
  const [loadFixedQuestions, { error: errorFixedQuestionsData }] = useLazyQuery(
    GET_FIXED_QUESTION,
    { client: queryClient }
  );
  const [loadQBQuestions, { error: errorQBQuestionsData, refetch }] = useLazyQuery(
    GET_QUESTION_BANK_QUESTIONS,
    { client: queryClient }
  );
  const [loadOptions, { error: errorOptionsData }] = useLazyQuery(GET_QUESTION_OPTIONS, {
    client: queryClient
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const examData = [
    {
      id: 1,
      question: {
        text: 'Wimbledon is the oldest tennis tournament in the world, and is widely considered the most prestigious. It has been always held at the All England Club in Wimbledon, London. In which year was the first championship held?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          text: '1864',
          image: '/images/bg-new.png'
        },
        {
          id: 'b',
          text: '1877'
        },
        {
          id: 'c',
          text: '1894',
          image: '/images/bg-new.png'
        },
        {
          id: 'd',
          text: '1902',
          image: '/images/bg-new.png'
        }
      ]
    },
    {
      id: 2,
      question: {
        text: "He is a former professional ice hockey player who played with the Montreal Canadiens in the National Hockey League (NHL) from 1955 to 1975. He won 11 Stanley Cups, more than any other player in NHL history. He was given the nick name 'Pocket Rocket'. Who was he?"
      },
      options: [
        {
          id: 'a',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image001.png'
        },
        {
          id: 'b',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image002.png'
        },
        {
          id: 'c',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image003.png'
        },
        {
          id: 'd',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image004.png'
        }
      ]
    },
    {
      id: 3,
      question: {
        text: "He became two-time inductee into the Basketball Hall of Fame ? being enshrined in 2002 for his individual career, and again in 2010 as a member of the 'Dream Team'. He was rated the greatest National Basketball Association (NBA) point guard of all time by ESPN in 2007. Who is this legendary basketball player who played for the Lakers?"
      },
      options: [
        {
          id: 'a',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image005.png'
        },
        {
          id: 'b',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image006.png'
        },
        {
          id: 'c',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image007.png'
        },
        {
          id: 'd',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image008.png'
        }
      ]
    },
    {
      id: 4,
      question: {
        text: 'It is a traditional ball game played in Assam. In this game, the players take turns throwing the ball at the opponent to knock them out of the game, while seeking to catch the ball and evade other players. It is a test of speed, stamina, and acrobatic skills. Which game is this? ',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          text: 'Dhopkhel'
        },
        {
          id: 'b',
          text: 'Kith kith'
        },
        {
          id: 'c',
          text: 'Pallankuzhi'
        },
        {
          id: 'd',
          text: 'Satoliya'
        }
      ]
    },
    {
      id: 5,
      question: {
        text: '"Float like a butterfly, sting like a bee. The hands can\'t hit what the eyes can\'t see." To which of the following sportspersons does this memorable quote attributed to?'
      },
      options: [
        {
          id: 'a',
          text: 'Floyd Mayweather Jr'
        },
        {
          id: 'b',
          text: 'Mike Tyson'
        },
        {
          id: 'c',
          text: 'Muhammad Ali'
        },
        {
          id: 'd',
          text: 'Sugar Ray Robinson'
        }
      ]
    },
    {
      id: 6,
      question: {
        text: "This vault is considered the hardest vault performed in women's artistic gymnastics. The first person to complete it successfully in 1999 was a Russian after whom it is named. This vault is also called the 'vault of death' due to its difficulty and likelihood of injury. What is the name of the vault?",
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          text: 'Yurchenko'
        },
        {
          id: 'b',
          text: 'Demidova'
        },
        {
          id: 'c',
          text: 'Produnova'
        },
        {
          id: 'd',
          text: 'Tsukahara'
        }
      ]
    },
    {
      id: 7,
      question: {
        text: 'Which of the following is not a type of sailboats used in competitive sailing?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          text: '49er'
        },
        {
          id: 'b',
          text: 'Tornado'
        },
        {
          id: 'c',
          text: 'Luff'
        },
        {
          id: 'd',
          text: 'Europe'
        }
      ]
    },
    {
      id: 8,
      question: {
        text: 'Which of the following is not a standard international racing distance in the sport canoeing and kayaking?'
      },
      options: [
        {
          id: 'a',
          text: '200m'
        },
        {
          id: 'b',
          text: '500m'
        },
        {
          id: 'c',
          text: '1000m'
        },
        {
          id: 'd',
          text: '2500m'
        }
      ]
    },
    {
      id: 9,
      question: {
        text: 'In a tennis match, the choice of the server in the first game is decided by a coin toss. The player who wins may choose to have the opponent serve first. How many chances to serve does the player who serves get?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          text: '1'
        },
        {
          id: 'b',
          text: '2'
        },
        {
          id: 'c',
          text: '3'
        },
        {
          id: 'd',
          text: '4'
        }
      ]
    },
    {
      id: 10,
      question: {
        text: 'The Queens-berry rules endorsed by the Marquess of Queens-berry in the 19th century is a code of generally accepted rules in the sport of boxing. Which of the following is not one of the accepted Queensberry rules?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          text: 'No wrestling or hugging is allowed.'
        },
        {
          id: 'b',
          text: 'The boxers must wear protective headgear.'
        },
        {
          id: 'c',
          text: 'Fights are divided into 3 minutes rounds, separated by 1 minute rest periods.\n'
        },
        {
          id: 'd',
          text: 'A 10 second count is mandatory if a boxer is knocked down.'
        }
      ]
    },
    {
      id: 11,
      question: {
        text: 'This championship is a domestic first- class cricket championship played in India between teams representing regional cricket associations. The competition is named after first Indian cricketer who played international cricket for England. Who was the player after whom it is named?'
      },
      options: [
        {
          id: 'a',
          text: 'B B Nimbalkar'
        },
        {
          id: 'b',
          text: 'Vijay Merchant'
        },
        {
          id: 'c',
          text: 'K S Ranjitsinhji'
        },
        {
          id: 'd',
          text: 'Mansoor Ali Khan Pataudi'
        }
      ]
    },
    {
      id: 12,
      question: {
        text: 'Who won the 2022 Thomas Cup?',
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          text: 'India'
        },
        {
          id: 'b',
          text: 'Indonesia'
        },
        {
          id: 'c',
          text: 'Japan'
        },
        {
          id: 'd',
          text: 'China'
        }
      ]
    },
    {
      id: 13,
      question: {
        text: "The World Table Tennis Championships have been held since 1926, biennia since 1957. Seven different events presented by different trophies are currently held with individual events in odd numbered years and team events in even-numbered years. Which of the following trophies is awarded to the women's team champion?"
      },
      options: [
        {
          id: 'a',
          text: 'Swaythling Cup'
        },
        {
          id: 'b',
          text: 'Heydusek Cup'
        },
        {
          id: 'c',
          text: 'Iran Cup'
        },
        {
          id: 'd',
          text: 'Corbillon Cup '
        }
      ]
    },
    {
      id: 14,
      question: {
        text: 'This trophy is a biennial world amateur team golf championship for men organized by the International Golf Federation. It is named after the then President of United States when the tournament was first played. Which US President is it named after?'
      },
      options: [
        {
          id: 'a',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image011.png'
        },
        {
          id: 'b',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image012.png'
        },
        {
          id: 'c',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image013.png'
        },
        {
          id: 'd',
          image:
            'https://www.studyadda.com/upload/html_folder/7_Sports_IGKO_Class-10/7_Sports_IGKO_Class-10_files/image014.png'
        }
      ]
    },
    {
      id: 15,
      question: {
        text: "Season 4 of the Pro-kabaddi League in 2016 saw  the launch of first professional woman kabaddi league, Women's Kabaddi Challenge (WKC). Three teams battled it out to be the first ever WKC champions. Which of the following was not one of the participants of the WKC?",
        image: '/images/bg-new.png'
      },
      options: [
        {
          id: 'a',
          text: 'Pink Panthers'
        },
        {
          id: 'b',
          text: 'Fire Birds'
        },
        {
          id: 'c',
          text: 'Ice Divas'
        },
        {
          id: 'd',
          text: 'Storm Queens'
        }
      ]
    }
    // {
    //     id: ,
    //     question: {
    //         text: '',
    //         image: '/images/bg-new.png'
    //     },
    //     options: [
    //         {
    //             id: 'a',
    //             text: '',
    //         },
    //         {
    //             id: 'b',
    //             text: '',
    //         },
    //         {
    //             id: 'c',
    //             text: '',
    //         },
    //         {
    //             id: 'd',
    //             text: '',
    //         },
    //     ]
    // },
  ];

  examData.forEach((each) => {
    each.isVisited = false;
    each.isMarked = false;
    each.selectedOption = null;
  });

  examData[0].isVisited = true;

  const [data, setData] = useState(examData);
  const [questionData, setQuestionData] = useState([]);
  const [current, setCurrent] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(0);
  const [isLearner, setIsLearner] = useState(false);
  const refFullscreen = useRef(null);

  const [learnerExamData, setLearnerExamData] = useRecoilState(LearnerExamAtom);

  useEffect(async () => {
    setLoading(true)
    const examId = router.query?.examId || null;
    if (!examId) return;

    // load master data
    let isError = false;
    const masterRes = await loadMaster({
      variables: { exam_ids: [examId] },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Exam Master load error' });
    });
    if (isError) return;
    const masterData = masterRes?.data?.getExamsMeta[0];
    if (!masterData) return;
    const masterObj = {
      id: masterData.id,
      qpId: masterData.QpId,
      name: masterData.Name,
      description: masterData.Description,
      duration: masterData.Duration,
      scheduleType: masterData.ScheduleType,

      code: masterData.Code,
      type: masterData.Type,
      category: masterData.Category,
      subCategory: masterData.SubCategory,

      status: masterData.Status,
      is_exam_active: masterData.IsActive
    };

    const metaRes = await loadPaperMeta({
      variables: { question_paper_id: [masterObj?.qpId] }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Paper Master load error' });
    });
    if (isError) return;
    const paperMasterData = metaRes.data.getQPMeta[0];

    const paperMaster = {
      category: paperMasterData?.Category,
      subCategory: paperMasterData?.SubCategory,
      description: paperMasterData?.Description,
      section_wise: paperMasterData?.SectionWise,
      difficultyLevel: paperMasterData?.DifficultyLevel,
      suggested_duration: paperMasterData?.SuggestedDuration,
      status: paperMasterData?.Status
    };

    masterObj.category = paperMaster.category;
    masterObj.subCategory = paperMaster.subCategory;

    // load instructions
    const insRes = await loadInstructions({
      variables: { exam_id: examId },
      fetchPolicy: 'no-cache'
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Instructions load error' });
    });
    if (isError) return;
    const insData = insRes?.data?.getExamInstruction[0];
    const insObj = {
      instructionId: insData?.id || null,
      passingCriteria: insData?.PassingCriteria,
      noAttempts: insData?.NoAttempts,
      instructions: insData?.Instructions || '',
      accessType: insData?.AccessType || '',
      is_ins_active: insData?.IsActive || ''
    };

    // load schedule
    let schObj = {};
    if (masterObj.scheduleType === 'scheduled') {
      const schRes = await loadSchedule({
        variables: { exam_id: examId },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Schedule load error' });
      });
      if (isError) return;
      const schData = schRes?.data?.getExamSchedule[0];

      schObj = {
        scheduleId: schData?.id || null,
        examStart: new Date(+schData?.Start * 1000),
        examEnd: +schData?.End ? new Date(+schData?.End * 1000) : null,
        bufferTime: schData?.BufferTime || 0,
        is_schedule_active: schData?.IsActive || false
      };
    }

    const questionPaperId = masterObj?.qpId;

    // load section data and qb mappings
    const sectionData = [];
    const quesData = [];
    let mappedQb = [];
    let totalQuestions = 0;
    let totalMarks = 0;

    // load sections
    const sectionRes = await loadPaperSection({
      variables: { question_paper_id: questionPaperId }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Section load error' });
    });
    if (isError) return;

    // parse and set section data
    const sections = sectionRes?.data?.getQuestionPaperSections || [];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      sectionData.push({
        id: section.id,
        qpId: section.QpId,
        name: section.Name,
        description: section.Description,
        type: section.Type,
        difficulty_level: section.DifficultyLevel,
        total_questions: section.TotalQuestions
      });

      // load qb section maping by section id
      const mappingRes = await loadQBSectionMapping({
        variables: { section_id: section.id },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'QB Section Mapping load error' });
      });
      if (isError) return setToastMsg({ type: 'danger', message: 'QB Section Map load error' });

      mappedQb = [
        ...mappedQb,
        ...mappingRes?.data?.getQPBankMappingBySectionId?.map((qbMappings) => {
          return {
            id: qbMappings.id,
            qbId: qbMappings.QbId,
            difficulty_level: qbMappings.DifficultyLevel,
            sectionId: qbMappings.SectionId,
            is_active: qbMappings.IsActive,
            question_marks: qbMappings.QuestionMarks,
            question_type: qbMappings.QuestionType,
            retrieve_type: qbMappings.RetrieveType,
            total_questions: qbMappings.TotalQuestions
          };
        })
      ];
    }

    // loop to get fixed questions
    for (let i = 0; i < mappedQb.length; i++) {
      const mapping = mappedQb[i];

      // get fixed question for each mapping
      const fixedRes = await loadFixedQuestions({
        variables: { mapping_id: mapping.id },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'fixed load error' });
      });
      if (isError) return;

      const fixedData = fixedRes?.data?.getSectionFixedQuestions[0];
      const allQuestionIds = fixedData?.QuestionId?.split(',') || [];

      if (!allQuestionIds?.length) {
        totalQuestions += mapping?.total_questions;
        totalMarks += mapping?.question_marks * mapping?.total_questions || 0;
        continue;
      }

      // load all bank questions which is mapped in every mapping
      const questionRes = await loadQBQuestions({
        variables: { question_bank_id: mapping.qbId },
        fetchPolicy: 'no-cache'
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        setToastMsg({ type: 'danger', message: 'QB Questions load error' });
      });
      if (isError) continue;

      // filter question from all question bank questions
      const questions = questionRes?.data?.getQuestionBankQuestions
        ?.filter((q) => {
          return allQuestionIds.includes(q.id);
        })
        ?.map((q) => {
          return {
            id: q.id,
            description: q.Description,
            type: q.Type,
            difficulty: q.Difficulty,
            attachment: q.Attachment,
            attachmentType: q.AttachmentType,
            hint: q.Hint,
            qbmId: q.QbmId,
            question_marks: mapping?.question_marks
          };
        });

      if (!questions?.length) continue;

      // load all options for all questions
      for (let j = 0; j < allQuestionIds.length; j++) {
        for (let k = 0; k < questions.length; k++) {
          const question = questions[k];
          const allOptions = [];
          const optionsRes = await loadOptions({
            variables: { question_id: question.id },
            fetchPolicy: 'no-cache'
          }).catch((err) => {
            console.log(err);
            isError = !!err;
            setToastMsg({ type: 'danger', message: 'Options load error' });
          });
          if (isError) continue;

          if (optionsRes?.data?.getOptionsForQuestions[0]?.options) {
            optionsRes?.data?.getOptionsForQuestions[0].options.map((option) => {
              allOptions.push({
                id: option.id,
                qmId: option.QmId,
                description: option.Description,
                isCorrect: option.IsCorrect,
                attachmentType: option.AttachmentType,
                attachment: option.Attachment
              });
            });

            questions[k].options = allOptions;
          }
        }
      }

      const sectionIndex = sectionData.findIndex((section) => section.id === mapping.sectionId);
      if (sectionIndex < 0) continue;

      if (!sectionData[sectionIndex]?.questions) sectionData[sectionIndex].questions = [];

      questions.forEach((q) => {
        quesData.push({
          id: quesData?.length + 1,
          question: q,
          options: q?.options,

          isVisited: quesData?.length === 0,
          isMarked: false,
          selectedOption: null
        });
        sectionData[sectionIndex].questions.push(q?.id);
      });
      totalQuestions += questions?.length || 0;
      totalMarks += mapping?.question_marks * questions?.length || 0;
    }

    console.log(sectionData, quesData, mappedQb, totalQuestions, totalMarks);

    setQuestionData(quesData);
    setCurrent(quesData[0]);

    setLearnerExamData({
      ...learnerExamData,
      examData: {
        ...masterObj,
        ...insObj,
        ...schObj,
        totalMarks: totalMarks || '0'
      },
      landingPageData: {
        testSeries: 'PMP Test Series',
        testSequence: 'M1A4',
        isProctoring: 'No',
        totalQuestions: totalQuestions || '0',
        isNegativeMarking: 'No',
        expertiseLevel: paperMaster?.difficultyLevel
      },
      insPageData: {
        examTimeStandard: 'IST',
        attempts: '0'
      },
      sectionData: sectionData
    });
    setLoading(false)
  }, [router.query]);

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
  }, []);

  async function loadQuestionsAndOptions() {}
  return (
    <div ref={refFullscreen}>
      {
        loading ? (
            <div className={styles.loadingExamScreen}>
              <ThemeProvider
                  theme={createTheme({
                    palette: {
                      primary: {
                        main: '#6bcfcf'
                      }
                    }
                  })}>
                <CircularProgress />
              </ThemeProvider>

            </div>
        ) : (
            isLearner ? (
                <LearnerExamComponent
                    data={questionData}
                    setData={setQuestionData}
                    current={current}
                    setCurrent={setCurrent}
                    isFullScreen={isFullScreen}
                    setIsFullScreen={setIsFullScreen}
                />
            ) : (
                // <ExamLandingPage setIsLearner={setIsLearner} />
                <ExamInstruction
                    setIsLearner={setIsLearner}
                    isFullScreen={isFullScreen}
                    setIsFullScreen={setIsFullScreen}
                />
            )
        )
      }
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          display: 'flex',
          gap: '10px',
          marginLeft: '40px'
        }}>
        <div onClick={() => setIsFullScreen(toggleFullScreen(refFullscreen.current))}>
          {isFullScreen ? (
            <Image src="/images/svg/fullscreen_exit.svg" height={30} width={30} />
          ) : (
            <Image src="/images/svg/fullscreen.svg" height={30} width={30} />
          )}
        </div>
        <div onClick={() => router.push('/exam')}>
          <Image src="/images/svg/clear.svg" height={30} width={30} />
        </div>
      </div>
    </div>
  );
};

export default ExamScreen;
