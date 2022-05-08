import QuestionMasterRadioButton from '../QuestionMasterRadioButton';
import {
  examRadioButton,
  qBankNameAtom,
  qBankDescAtom,
  categoryAtom,
  subCategoryAtom
} from '../../../state/atoms/exams.atoms';
import QuestionBankCard from '../QuestionBankCard';
import UploadNewQuestionBank from '../UploadNewQuestionBank';

import { useRecoilState } from 'recoil';
import QuizOptionInput from '../QuizOptionInput';

const ExamPageOne = ({ inputHandler, handleChange }) => {
  const [radioButton, setRadioButton] = useRecoilState(examRadioButton);
  function onRadioChanged(e) {
    setRadioButton(e.target.value);
  }
  const [name, setName] = useRecoilState(qBankNameAtom);
  const [desc, setDesc] = useRecoilState(qBankDescAtom);
  const [category, setCategory] = useRecoilState(categoryAtom);
  const [subCat, setSubcat] = useRecoilState(subCategoryAtom);

  function inputHandler(e) {
    console.log(e.target.value);
    // setName(e.target.value);
    const Name = setName(e.target.value);
    console.log(Name);
    const Description = setDesc(e.target.value);
    console.log(Description);
  }
  function handleChange(e) {
    // const cat = setCategory(e.target.value);
    // console.log(e.target.value);
    console.log(category);
    var cate = setCategory(e.target.value);
    console.log(cate);
    // const subCat = setSubcat(e.target.value);
    // console.log(subCat);
  }

  return (
    <>
      <QuestionMasterRadioButton onRadioChanged={onRadioChanged} />
      {radioButton === 'create' && (
        <div style={{ paddingTop: '50px' }}>
          <QuizOptionInput />
        </div>
        // <QuestionBankCard title={'Add'} inputHandler={inputHandler} handleChange={handleChange} />
      )}
      {radioButton === 'upload' && <UploadNewQuestionBank />}
    </>
  );
};

export default ExamPageOne;
