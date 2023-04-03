import styles from '../learnerSideScreen.module.scss';
import ParticipantPollBox from './ParticipantPollBox';
const ParticipantPollScreen = () => {
  const array=[{
    pollName:"sandeep",
    pollOptions:[
      {
        seq:1,
        value:"a",
      },
      {
        seq:1,
        value:"b",
      },
      {
        seq:1,
        value:"c",
      },
      {
        seq:1,
        value:"d",
      }
    ],
    pollQuetions:"what is my name "
  }]
  return (
    <div className={`${styles.participantPollContainer}`}>
      <div className={`${styles.activePoll}`}>
       <p className={`${styles.activePollHead}`}>Active</p>
      {
        array.map((data,index)=>
        {
          return((data.pollName !== '' && data.pollQuetions !== '')&&
            <ParticipantPollBox pollNumber={`Poll  ${index+1}`} options={array[index].pollOptions} pollQuestion={data.pollQuetions}/>
          )
        })
      }
      </div>
      <div className={`${styles.endedPoll}`}>
      <p className={`${styles.endedPollHead}`}>Ended</p>
      </div>
    </div>
  );
};
export default ParticipantPollScreen;
