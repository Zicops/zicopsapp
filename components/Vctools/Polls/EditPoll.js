import { ActiveClassroomTopicIdAtom } from '@/state/atoms/module.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useLoadClassroomData from '../Logic/useLoadClassroomData';
import styles from '../vctoolMain.module.scss';
import PollOption from './PollOption';

const EditPoll = ({ pollData, goToCreatePoll, ShowPoll }) => {
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollName, setPollName] = useState('');
  const [options, setOptions] = useState([]);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const { addUpdatePolls } = useLoadClassroomData();

  function optionInputHandler(e, index) {
    e.preventDefault();
    let tempArr = structuredClone(options);
    if (e.target.value === '') {
      if (index > -1) {
        tempArr.splice(index, 1);
      }
    } else {
      tempArr[index] = e.target.value;
    }
    setOptions(tempArr);
  }

  useEffect(() => {
    setPollQuestion(pollData?.pollQuestion);
    setPollName(pollData?.pollName);
    setOptions(pollData?.options.length ? pollData?.options : []);
  }, [pollData]);

  async function updatePoll() {
    if (pollName !== '' && pollQuestion !== '' && options.length > 1) {
      const activeClassroomCourseId = window?.location.href.split('/').pop();

      const obj = {
        pollId: pollData?.pollId,
        pollName: pollName,
        meetingId: activeClassroomTopicId,
        courseId: activeClassroomCourseId,
        topicId: activeClassroomTopicId,
        question: pollQuestion,
        options: options,
        status: 'saved',
      };

      await addUpdatePolls(obj);

      ShowPoll();
    }
  }
  return (
    <div className={`${styles.pollQA}`}>
      <p>Edit Poll</p>
      <div className={`${styles.pollQaScreen}`}>
        <div className={`${styles.pollQuestion}`}>
          <div className={`${styles.pollName}`}>
            <p>Poll Name :</p>
            <input
              type="text"
              placeholder="Enter poll name"
              value={pollName}
              onChange={(e) => {
                setPollName(e.target.value);
              }}
            />
          </div>
          <PollOption
            option={'Question'}
            placeholder={'Enter question here'}
            optionValue={pollQuestion}
            onChangeHandler={(e) => {
              setPollQuestion(e.target.value);
            }}
          />
        </div>
        <p className={`${styles.pollOptionLabel}`}>Options</p>
        <div className={`${styles.pollOptionContainer}`}>
          {options.map((option, index) => {
            return (
              <PollOption
                optionValue={option}
                option={`Option ${index + 1}`}
                placeholder={`Enter option ${index + 1}`}
                onChangeHandler={(e) => optionInputHandler(e, index)}
              />
            );
          })}
        </div>
        <button
          className={`${styles.pollAddOptionBtn}`}
          onClick={() => {
            setOptions([
              ...options,
              // {
              //   seq: options.length + 1,
              //   value: '',
              //   imgUrl: '',
              // },
              '',
            ]);
          }}>
          <div>+</div> Add Option
        </button>

        <div className={`${styles.pollSaveBtns}`}>
          <button
            className={`${styles.pollCancelBtn}`}
            onClick={() => {
              goToCreatePoll();
            }}>
            Cancel
          </button>
          <button className={`${styles.pollSaveBtn}`} onClick={updatePoll}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPoll;
