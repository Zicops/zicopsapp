import { useMutation } from '@apollo/client';
import { INVITE_USERS, userClient } from 'API/UserMutations';
import { useEffect, useState } from 'react';

import MultiEmailInput from './MultiEmailInput';

export default function InviteUser({ userType }) {
  const [emailIds, setEmailIds] = useState([]);

  const [inviteUsers, { error: inviteError }] = useMutation(INVITE_USERS, {
    client: userClient
  });

  useEffect(() => {
    setEmailIds([]);
  }, [userType]);

  return (
    <>
      To:
      <MultiEmailInput type={userType} items={emailIds} setItems={setEmailIds} />
    </>
  );
}
