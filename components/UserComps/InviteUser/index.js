import { usersEmailId } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { INVITE_USERS, userClient } from 'API/UserMutations';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import MultiEmailInput from './MultiEmailInput';

export default function InviteUser({ userType }) {
  const [emailIds, setEmailIds] = useState([]);

  const [userEmailIDs, setUserEmailIDs] = useRecoilState(usersEmailId);

  useEffect(() => {
    setEmailIds([]);
  }, [userType]);

  useEffect(() => {
    setUserEmailIDs([...emailIds]);
  }, [emailIds]);

  return (
    <>
      To:
      <MultiEmailInput type={userType} items={emailIds} setItems={setEmailIds} />
    </>
  );
}
