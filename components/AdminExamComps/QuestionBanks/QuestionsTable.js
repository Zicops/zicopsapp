import { useRecoilState } from 'recoil';
import { PopUpStatesAtomFamily } from '../../../state/atoms/popUp.atom';
import PopUp from '../../common/PopUp';
import ZicopsTable from '../../common/ZicopsTable';
import McqCard from './McqCard';

// TODO: delete later, temporary data, replaced from backend later
const data = [
  {
    id: 1,
    question: 'Number of primitive datatypes in Java are?',
    type: 'MCQ'
  },
  {
    id: 2,
    question: 'Automatic type conversion is possible in which of the possible cases?',
    type: 'MCQ'
  },
  {
    id: 3,
    question:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam eveniet odit laudantium?',
    type: 'MCQ'
  },
  {
    id: 4,
    question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit?',
    type: 'MCQ'
  },
  {
    id: 5,
    question: 'Automatic type conversion is possible in which of the possible cases?',
    type: 'MCQ'
  },
  {
    id: 6,
    question:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam eveniet odit laudantium?',
    type: 'MCQ'
  },
  {
    id: 7,
    question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit?',
    type: 'MCQ'
  }
];

export default function QuestionsTable({ openEditQuestionMasterTab, isEdit }) {
  // const { pageSize } = useHandlePagesize();
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('viewQuestions'));

  const columns = [
    {
      field: 'question',
      headerName: 'Questions',
      headerClassName: 'course-list-header',
      flex: 5
    },
    {
      field: 'type',
      headerClassName: 'course-list-header',
      headerName: 'Type',
      flex: 0.5
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Display',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {isEdit && (
              <button
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  outline: '0',
                  border: '0'
                }}
                onClick={openEditQuestionMasterTab}>
                <img src="/images/svg/edit-box-line.svg" width={20}></img>
              </button>
            )}
            <button
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0'
              }}
              onClick={() => udpatePopUpState(true)}>
              <img src="/images/svg/eye-line.svg" width={20}></img>
            </button>
          </>
        );
      },
      flex: 0.5
    }
  ];

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={data}
        pageSize={7}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
      />

      <PopUp
        isFooterVisible={false}
        title="Question 1"
        isPopUpOpen={popUpState}
        closeBtn={{ handleClick: () => udpatePopUpState(false) }}>
        <McqCard
          question={'This is a question that you have to answer?'}
          closePopUp={() => udpatePopUpState(false)}
          openEditQuestionMasterTab={
            isEdit
              ? () => {
                  udpatePopUpState(false);
                  openEditQuestionMasterTab();
                }
              : null
          }
        />
      </PopUp>
    </>
  );
}
