import { INVITE_USERS, userClient } from '@/api/UserMutations';
import { isEmail } from '@/helper/common.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersEmailIdAtom, UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { read, utils } from 'xlsx';
import UploadForm from '../common/FormComponents/UploadForm';

export default function BulkUpload() {
  const [inviteUsers, { data, loading }] = useMutation(INVITE_USERS, {
    client: userClient
  });

  const [emails, setEmails] = useRecoilState(UsersEmailIdAtom);
  const [userOrgData, setUserOrgData] = useRecoilState(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    if (!emails?.length) setFileData(null);
  }, [emails]);

  async function CSV_XLSX_File_Selected_Event(files) {
    if (!files.length) return;

    const file = files[0];
    setFileData(file);
    const reader = new FileReader();

    reader.onloadend = async function (event) {
      const arrayBuffer = reader.result;
      const options = { type: 'array' };
      const workbook = read(arrayBuffer, options);

      const sheetName = workbook.SheetNames;
      const sheet = workbook.Sheets[sheetName];
      const results = utils?.sheet_to_json(sheet) || [];

      const uniqueEmails = [];
      console.log(results);

      results?.forEach((row) => {
        const email = row?.__EMPTY;
        const isEmailValid = isEmail(email);
        if (isEmailValid && !uniqueEmails?.includes(email)) {
          uniqueEmails.push(email);
        }
      });

      if (!uniqueEmails?.length) {
        setFileData(null);
        return setToastMsg({ type: 'warning', message: 'Add at least one email!' });
      }

      setEmails(uniqueEmails);
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <>
      <UploadForm
        filePath="/templates/user-invite-template.xlsx"
        fileName="Bulk Invite Template"
        acceptedTypes=".xlsx, .csv"
        handleRemove={() => {
          setFileData(null);
          setEmails([]);
        }}
        handleFileUpload={(e) => CSV_XLSX_File_Selected_Event(e.target.files)}
      />

      <div style={{ textAlign: 'right', marginTop: '20px' }}>{fileData?.name}</div>
    </>
  );
}
