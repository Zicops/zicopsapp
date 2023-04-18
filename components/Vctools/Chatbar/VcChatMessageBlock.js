import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import style from './vcChat.module.scss';
import moment from 'moment';

const ChatMessageBlock = ({ isReply, message }) => {
  const userDetails = useRecoilValue(UserStateAtom);

  return (
    <>
      <div className={`${style.chatBox}`}>
        <div className={`${style.messageHead}`}>
          <div className={`${style.iconName}`}>
            <div className={`${style.profileImg}`}>
              {userDetails?.photo_url == null ? (
                <img src="/images/svg/vctool/profile-Icon.svg" />
              ) : (
                <img src={userDetails?.photo_url} alt="userName" />
              )}
            </div>
            <div className={`${style.personName}`}>
              {userDetails.first_name == '' ? 'john' : userDetails?.first_name}
            </div>
          </div>

          <div className={`${style.messageTime}`}>
            {moment(message.time * 1000).format('LT')}
            {}
          </div>
        </div>
        <div className={`${style.mainMessage}`}>
          <div>{message?.body}</div>
        </div>
      </div>
    </>
  );
};

export default ChatMessageBlock;
