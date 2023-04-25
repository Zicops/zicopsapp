import { UserStateAtom } from '@/state/atoms/users.atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import style from './vcChat.module.scss';
import moment from 'moment';

const ChatMessageBlock = ({ isReply, message, setParentId }) => {
  const userDetails = useRecoilValue(UserStateAtom);

  return (
    <>
      <div
        className={`${style.chatBox}`}
        style={message?.parent_id && { marginLeft: '35px', width: '260px' }}>
        {!message?.parent_id && (
          <div
            className={`${style.replyBox}`}
            onClick={() => {
              setParentId(message?.id);
            }}>
            <img src="/images/svg/reply.svg" alt="reply" />
          </div>
        )}
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

          <div className={`${style.messageTime}`}>{moment(message.time * 1000).format('LT')}</div>
        </div>
        <div className={`${style.mainMessage}`}>
          <div>{message?.body}</div>
        </div>
        <div className={`${style.replyBar}`}>
          {!message?.parent_id && <div>{message.responses || 0} {message.responses < 2 ? "Reply" : "Replies"}</div>}
        </div>
      </div>
    </>
  );
};

export default ChatMessageBlock;
