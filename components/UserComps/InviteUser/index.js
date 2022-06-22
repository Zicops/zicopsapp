import { useEffect, useState } from 'react';
import MultiEmailInput from './MultiEmailInput';

export default function InviteUser({ userType }) {
  const [emailIds, setEmailIds] = useState([]);

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
