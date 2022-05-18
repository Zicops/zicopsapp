import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { QuestionBankAtom } from '../../../state/atoms/exams.atoms';
import { PopUpStatesAtomFamily } from '../../../state/atoms/popUp.atom';
import PopUp from '../../common/PopUp';
import ZicopsTable from '../../common/ZicopsTable';
import AddQuestionBank from './AddQuestionBank';

// TODO: delete later, temporary data, replaced from backend later
const data = [
  {
    id: 'c9vi5778u0hjj4gm4c00',
    name: 'Question Bank 2',
    category: 'Design',
    sub_category: 'UI Design',
    noOfQuestions: 200,
    as: 1
  },
  {
    id: 2,
    name: 'Effective Communication',
    category: 'Soft Skill',
    sub_category: 'Communication',
    noOfQuestions: 200
  },
  {
    id: 3,
    name: 'Core Java Fundamentals',
    category: 'IT Development',
    sub_category: 'Java',
    noOfQuestions: 200
  },
  {
    id: 4,
    name: 'Design Basics',
    category: 'Design',
    sub_category: 'UI Design',
    noOfQuestions: 200
  },
  {
    id: 5,
    name: 'Effective Communication',
    category: 'Soft Skill',
    sub_category: 'Communication',
    noOfQuestions: 200
  },
  {
    id: 6,
    name: 'Core Java Fundamentals',
    category: 'IT Development',
    sub_category: 'Java',
    noOfQuestions: 200
  },
  {
    id: 7,
    name: 'Effective Communication',
    category: 'Soft Skill',
    sub_category: 'Communication',
    noOfQuestions: 200
  },
  {
    id: 8,
    name: 'Design Basics',
    category: 'Design',
    sub_category: 'UI Design',
    noOfQuestions: 200
  }
];
export default function QuestionBankTable({ isEdit = false }) {
  // const { pageSize } = useHandlePagesize();
  const router = useRouter();
  const [editQuestionBankId, setEditQuestionBankId] = useState(null);
  const [questionBank, setQuestionBank] = useRecoilState(QuestionBankAtom);
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('editQuestionBank'));

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'course-list-header',
      flex: 1.5
    },
    {
      field: 'category',
      headerClassName: 'course-list-header',
      headerName: 'Category',
      flex: 1
    },
    {
      field: 'sub_category',
      headerClassName: 'course-list-header',
      headerName: 'Sub-category',
      flex: 1
    },
    {
      field: 'noOfQuestions',
      headerClassName: 'course-list-header',
      headerName: 'No. of Questions',
      flex: 1
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
                onClick={() => {
                  setEditQuestionBankId(params.row.id);
                  udpatePopUpState(true);
                }}>
                <img src="/images/edit-icon.png" width={20}></img>
              </button>
            )}

            <button
              style={{
                cursor: 'pointer',
                backgroundColor: 'transparent',
                outline: '0',
                border: '0'
              }}
              onClick={() => router.push(router.asPath + `/${params.row.id}`)}>
              <img src="/images/svg/eye-line.svg" width={20}></img>
            </button>
          </>
        );
      },
      flex: 0.5
    }
  ];

  const closeBtn = {
    handleClick: () => udpatePopUpState(false)
  };

  // TODO: remove this later or replace with api get query
  useEffect(() => {
    setQuestionBank([...questionBank, ...data]);
  }, []);

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={questionBank}
        pageSize={7}
        rowsPerPageOptions={[3]}
        tableHeight="70vh"
      />

      {/* add question bank pop up */}
      {/* edit id: "c9vi5778u0hjj4gm4c00" */}
      <PopUp
        title="Edit Question Bank"
        isPopUpOpen={popUpState}
        closeBtn={closeBtn}
        isFooterVisible={false}>
        <AddQuestionBank
          isEdit={true}
          editQuestionBankId={editQuestionBankId}
          closePopUp={() => udpatePopUpState(false)}
        />
      </PopUp>
    </>
  );
}
