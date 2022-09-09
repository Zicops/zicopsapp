import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'var(--dark_one)',
    color: 'var(--white)',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1,
    padding: '20px',
    width: '2480px'
  },
  sectionTop: {},
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'center'
  }
  //   section: {
  //     margin: 10,
  //     padding: 10,
  //     flexGrow: 1
  //   }
});

// Create Document Component
export default function AnswerKeyPDF({ data }) {
  //   console.log(data);
  data = {
    examData: {
      id: 'cc09gafr4060ktms24k0',
      qpId: 'cbd4mr37r06hehdkhj0g',
      name: 'HTML Exam',
      description: 'Test',
      duration: 2,
      scheduleType: 'anytime',
      code: '',
      type: '',
      category: 'Development',
      subCategory: 'HTML',
      status: 'SAVED',
      is_exam_active: true,
      instructionId: 'cc09gafr4060ktms24kg',
      passingCriteria: '10-Marks',
      noAttempts: '-1',
      instructions: '<p>1. Test 2. Test</p>',
      accessType: '',
      is_ins_active: true,
      configId: null,
      shuffle: false,
      display_hints: false,
      show_result: false,
      show_answer: false,
      is_config_active: false,
      totalMarks: 8
    },
    landingPageData: {
      testSeries: '',
      testSequence: '',
      isProctoring: false,
      totalQuestions: '',
      isNegativeMarking: false,
      expertiseLevel: ''
    },
    insPageData: {
      examTimeStandard: '',
      attempts: ''
    },
    sectionData: [
      {
        id: 'cbd4nab7r06hehdkhj10',
        qpId: 'cbd4mr37r06hehdkhj0g',
        name: 'Default',
        description: '',
        type: '',
        difficulty_level: '',
        total_questions: 0,
        questions: [
          {
            id: 1,
            question: {
              id: 'cbd3mfr7r06hehdkhieg',
              description: 'What tag is used to render an image on a webpage?',
              type: 'MCQ',
              difficulty: 3,
              attachment:
                'https://storage.googleapis.com/courses-zicops-one/question_banks/cbd3fgb7r06hehdkhic0/cbd3mfr7r06hehdkhieg/kasturi-karma.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=zicops-cc%40zicops-one.iam.gserviceaccount.com%2F20220909%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20220909T100847Z&X-Goog-Expires=86399&X-Goog-Signature=c924ed329b34d498e337c765933727347611c32b283573e77265bdfba4285c780ce10dba6f6127fe4f266bc98db8667934b2dcab09fdbaf7f2a6f1a016af25167793ba685d1780894f9ea0cf12a3de667b86a5cf2c84ddefb1a03e371496aa9130e393a110bacedc4c8d4ae4ddf9744e5254760726b1abafc6ae4c215edbb29407bb31dac28566ac3a5c419c7bb365b54674b21e01dd331995d02b4a6d690c1e7b32ba12aaf3ab02ece8145b2605715bd72fb0c8056164571cac76b0edf224ca49e4fc0b7d5bb45653a2ed87c25c8a48c3cc933d8f6550d7cb859245ad6bd62fb329ab030c7f71cc64a9f114709f3a51791abcf9cd4da86840e26ae31d4ace41&X-Goog-SignedHeaders=host',
              attachmentType: 'image/jpeg',
              hint: null,
              qbmId: 'cbd3fgb7r06hehdkhic0',
              question_marks: '1',
              selectedOption: 'cbd3mgb7r06hehdkhifg',
              options: []
            },
            options: [],
            isVisited: true,
            isMarked: true,
            selectedOption: 'cbd3mgb7r06hehdkhifg'
          },
          {
            id: 2,
            question: {
              id: 'cbd3gd37r06hehdkhicg',
              description: ' What does the abbreviation HTML stand for ?   ',
              type: 'MCQ',
              difficulty: 2,
              attachment: null,
              attachmentType: null,
              hint: 'No hint',
              qbmId: 'cbd3fgb7r06hehdkhic0',
              question_marks: '1',
              selectedOption: 'cbd3gd37r06hehdkhidg',
              options: []
            },
            options: [],
            isVisited: true,
            isMarked: false,
            selectedOption: 'cbd3gd37r06hehdkhidg'
          },
          {
            id: 3,
            question: {
              id: 'cbd3pvr7r06hehdkhilg',
              description: 'Which property is used to set colors in HTML?',
              type: 'MCQ',
              difficulty: 7,
              attachment: null,
              attachmentType: null,
              hint: 'NO HINT',
              qbmId: 'cbd3fgb7r06hehdkhic0',
              question_marks: '1',
              selectedOption: 'cbd3pvr7r06hehdkhim0',
              options: []
            },
            options: [],
            isVisited: true,
            isMarked: false,
            selectedOption: 'cbd3pvr7r06hehdkhim0'
          },
          {
            id: 4,
            question: {
              id: 'cbd3rar7r06hehdkhip0',
              description: '  Which attribute is used to provide a unique name to an HTML element?',
              type: 'MCQ',
              difficulty: 5,
              attachment: null,
              attachmentType: null,
              hint: null,
              qbmId: 'cbd3fgb7r06hehdkhic0',
              question_marks: '1',
              selectedOption: 'cbd3rar7r06hehdkhipg',
              options: []
            },
            options: [],
            isVisited: true,
            isMarked: false,
            selectedOption: 'cbd3rar7r06hehdkhipg'
          },
          {
            id: 5,
            question: {
              id: 'cbd3snj7r06hehdkhirg',
              description: 'what is <br> tag?',
              type: 'MCQ',
              difficulty: 6,
              attachment: null,
              attachmentType: null,
              hint: null,
              qbmId: 'cbd3fgb7r06hehdkhic0',
              question_marks: '1',
              selectedOption: 'cbd3snj7r06hehdkhisg',
              options: []
            },
            options: [],
            isVisited: true,
            isMarked: false,
            selectedOption: 'cbd3snj7r06hehdkhisg'
          },
          {
            id: 6,
            question: {
              id: 'cbd3mgj7r06hehdkhih0',
              description:
                '  Apart from <i> tag, which of the following tag is used to render a text in italics?',
              type: 'MCQ',
              difficulty: 8,
              attachment: null,
              attachmentType: null,
              hint: null,
              qbmId: 'cbd3fgb7r06hehdkhic0',
              question_marks: '1',
              selectedOption: 'cbd3mgj7r06hehdkhii0',
              options: []
            },
            options: [],
            isVisited: true,
            isMarked: false,
            selectedOption: 'cbd3mgj7r06hehdkhii0'
          },
          {
            id: 7,
            question: {
              id: 'cbd3odr7r06hehdkhij0',
              description: 'Colors are defined in HTML using?',
              type: 'MCQ',
              difficulty: 9,
              attachment: null,
              attachmentType: null,
              hint: null,
              qbmId: 'cbd3fgb7r06hehdkhic0',
              question_marks: '1',
              selectedOption: 'cbd3oe37r06hehdkhil0',
              options: []
            },
            options: [],
            isVisited: true,
            isMarked: false,
            selectedOption: 'cbd3oe37r06hehdkhil0'
          },
          {
            id: 8,
            question: {
              id: 'cbd3q037r06hehdkhin0',
              description: 'Which HTML element is used to define description data?',
              type: 'MCQ',
              difficulty: 8,
              attachment: null,
              attachmentType: null,
              hint: null,
              qbmId: 'cbd3fgb7r06hehdkhic0',
              question_marks: '1',
              selectedOption: 'cbd3q037r06hehdkhio0',
              options: []
            },
            options: [],
            isVisited: true,
            isMarked: true,
            selectedOption: 'cbd3q037r06hehdkhio0'
          }
        ]
      }
    ],
    resultData: {
      examScore: null,
      isPassed: false
    }
  };

  return (
    <Document pageMode="fullScreen">
      <Page size="A4" style={styles.page}>
        {data?.sectionData?.map((section, i) => {
          return (
            <View style={styles.sectionTop}>
              <View>
                <Text style={styles.title}>{section?.name}</Text>
              </View>
              <View>
                <Text>{section?.description}</Text>
              </View>
              <View>
                <Text>
                  Questions: {section?.total_questions || section?.questions?.length || 0}
                </Text>
              </View>

              {section?.questions?.map((each) => {
                if (!each) return;

                return (
                  <View>
                    <Text>{each?.question?.description}</Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </Page>
    </Document>
  );
}

//   <div className={`${styles.questionPaper}`} ref={resultsRef}>
//     {attemptedQuestions?.sectionData?.map((section, i) => {
//       return (
//         <Fragment key={i}>
//           <Accordion isOpen={true} title={section?.name} customClass={`${styles.accordion}`}>
//             <div className={`${styles.questionTop}`}>
//               <p>{section?.description}</p>
//               <p>
//                 Questions:{' '}
//                 <span>{section?.total_questions || section?.questions?.length || 0}</span>
//               </p>
//             </div>

//             {section?.questions?.map((each) => {
//               // const each = questionOptionData?.filter((q) => q?.question?.id === id)[0];

//               if (!each) return null;

//               return (
//                 <div className={`${styles.questionCard}`} key={each?.id}>
//                   <QuestionOptionView
//                     questionCount={each.id}
//                     questionData={each.question}
//                     optionData={attemptedQuestions?.examData?.show_answer ? null : each.options}
//                     compareCorrect={attemptedQuestions?.examData?.show_answer}
//                     showAnswer={attemptedQuestions?.examData?.show_answer}
//                     selectedAnswerId={each?.selectedOption}
//                     showType={
//                       attemptedQuestions?.examData?.show_answer ? 'marksObtained' : 'marks'
//                     }
//                     showHints={attemptedQuestions?.examData?.display_hints || true}
//                   />
//                 </div>
//               );
//             })}
//           </Accordion>
//         </Fragment>
//       );
//     })}
//   </div>;
