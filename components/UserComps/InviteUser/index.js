import { UsersEmailIdAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { INVITE_USERS, userClient } from 'API/UserMutations';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import MultiEmailInput from './MultiEmailInput';

export default function InviteUser({ userType }) {
  const [emailIds, setEmailIds] = useState([]);

  const [userEmailIDs, setUserEmailIDs] = useRecoilState(UsersEmailIdAtom);

  useEffect(() => {
    setEmailIds([]);
  }, [userType]);

  useEffect(() => {
    setUserEmailIDs([...emailIds]);
  }, [emailIds]);

  useEffect(()=>{
    console.log('called')
  if(userEmailIDs === null){
    setEmailIds([]);
    setUserEmailIDs([]);
  }
  return;
  },[userEmailIDs])

  return (
    <>
      To:
      <MultiEmailInput type={userType} items={emailIds} setItems={setEmailIds} />
    </>
  );
}
