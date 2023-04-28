import { pollArray } from '@/state/atoms/vctool.atoms';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import PollOption from './PollOption';
import styles from '../vctoolMain.module.scss';
import { ActiveClassroomTopicIdAtom, TopicClassroomAtom } from '@/state/atoms/module.atoms';
import useLoadClassroomData from '../Logic/useLoadClassroomData';

const PollQA = ({ ShowPoll, goToCreatePoll }) => {
  const [pollInfo, setPollInfo] = useRecoilState(pollArray);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollName, setPollName] = useState('');
  const [options, setOptions] = useState([]);
  const activeClassroomTopicId = useRecoilValue(ActiveClassroomTopicIdAtom);
  const { addUpdatePolls } = useLoadClassroomData();

  function optionInputHandler(e, index) {
    e.preventDefault();
    let tempArr = structuredClone(options);
    tempArr[index].value = e.target.value;
    setOptions(tempArr);
  }

  const addPollAndClearInputs = async () => {
    if (pollName !== '' && pollQuestion !== '' && options.length > 1) {

      const activeClassroomCourseId = window?.location.href.split('/').pop();

      const simplePollOptions = options.map((o)=>o.value);

      const obj = {
        pollName: pollName,
        meetingId: activeClassroomTopicId,
        courseId: activeClassroomCourseId,
        topicId: activeClassroomTopicId,
        question: pollQuestion,
        options: simplePollOptions,
        status: 'saved',
      };

      await addUpdatePolls(obj);

      setPollName('');
      setPollQuestion('');
      setOptions([]);
      ShowPoll();
    }
  };

  return (
    <div className={`${styles.pollQA}`}>
      <p>Create Poll</p>
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
                optionValue={option?.value}
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
              {
                seq: options.length + 1,
                value: '',
                imgUrl: '',
              },
            ]);
          }}>
          <div>+</div> Add Option
        </button>

        <div className={`${styles.pollSaveBtns}`}>
          <button
            className={`${styles.pollCancelBtn}`}
            onClick={() => {
              goToCreatePoll();
              // setOptions([])
              // if(options.length===0)
              // {
              //  goToCreatePoll()
              // }
            }}>
            Cancel
          </button>
          <button
            className={`${styles.pollSaveBtn}`}
            // onClick={() => {
            //   if (pollName !== '' && pollQuestion !== '' && options.length > 1) {
            //     setPollInfo([
            //       ...pollInfo,
            //       {
            //         pollName: pollName,
            //         pollQuestion: pollQuestion,
            //         pollOptions: options,
            //       },
            //     ]);
            //   }
            //   setPollName('');
            //   setPollQuestion('');
            //   setOptions([]);
            //   ShowPoll();
            // }}
            onClick={addPollAndClearInputs}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
export default PollQA;
