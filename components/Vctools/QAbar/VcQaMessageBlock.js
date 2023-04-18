import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import style from './vcQA.module.scss';
import moment from 'moment';
const VcQaMessageBlock = ({ isReply, isLeft, message }) => {
  const userDetails = useRecoilValue(UserStateAtom);

  return (
    <>
      {/* <div className={`${isLeft ? style.chat_Main_left : style.chat_Main}`}>
        <div className={`${style.user_image2}`}>
          {!isLeft ? (
            <img src={userDetails?.photo_url} alt="" />
          ) : (
            <img src="/images/svg/11.svg" alt="" />
          )}
        </div>
        <div
          className={`${isLeft ? style.chat_container : style.chat_container2} ${isReply ? (isLeft ? style.left_reply_container : style.right_reply_container) : ''
            }`}>
          <p className={`${style.message} ${isLeft ? style.left_message : ''}`}>
            {message?.content}

          </p>
        </div>
      </div> */}
      <div className={`${style.chatBox}`}>
        <div className={`${style.messageHead}`}>
          <div className={`${style.iconName}`}>
            <div className={`${style.profileImg}`}>
              {/* {!isLeft ? (
                <img src={userDetails?.photo_url} alt="" />
              ) : (
                <img src="/images/svg/vctool/profile-Icon" alt="" />
              )} */}
              {userDetails?.photo_url == null ? (
                <img src="/images/svg/vctool/profile-Icon.svg" />
              ) : (
                <img src={userDetails?.photo_url} alt="" />
              )}
            </div>
            <div className={`${style.personName}`}>
              {userDetails.first_name == '' ? 'john' : userDetails?.first_name}
            </div>
          </div>

          <div className={`${style.messageTime}`}>{moment(message.time * 1000).format('LT')}</div>
        </div>
        <div className={`${style.mainMessage}`}>
          <div>{message?.body}</div>
        </div>
      </div>
    </>
  );
};

export default VcQaMessageBlock;
