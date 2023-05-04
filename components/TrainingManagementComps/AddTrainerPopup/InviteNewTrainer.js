import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown/index.js';
import MultiEmailInput from '@/components/common/FormComponents/MultiEmailInput.js';
import useHandleMarketYard from '@/components/VendorComps/Logic/useHandleMarketYard.js';
import { TrainerDataAtom } from '@/state/atoms/trainingManagement.atoms.js';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userOptions } from '../trainingManagement.helper.js';
import styles from './../trainingComps.module.scss';
import TrainingProfileAccordian from './TrainingProfileAccordian';

export default function InviteNewTrainer() {
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);

  const [emails, setEmails] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  const { getLspVendors } = useHandleMarketYard();

  const names = vendorList.map(({ name }) => name);

  const vendorFinalList = names?.map((val) => ({
    label: val,
    value: val,
  }));

  useEffect(() => {
    const _trainerData = structuredClone(trainerData);
    _trainerData.inviteEmails = emails?.[0]?.props?.children?.[0];
    setTrainerData(_trainerData);
  }, [emails]);

  useEffect(() => {
    const lspId = sessionStorage.getItem('lsp_id');
    getLspVendors(lspId, null, true).then((resp) => setVendorList(resp));
  }, []);

  return (
    <div>
      <div className={`${styles.userTypeAndEmail}`}>
        <div className={`${styles.userType}`}>
          <label>User Type:</label>
          <LabeledDropdown
            dropdownOptions={{
              inputName: 'userType',
              placeholder: 'Select User Type',
              value: {
                label: trainerData?.tag,
                value: trainerData?.tag,
              },
              options: userOptions,
              //   isDisabled: isViewPage
            }}
            changeHandler={(e) => {
              setTrainerData((prev) => ({ ...prev, tag: e.value }));
            }}
            styleClass={styles.dropDownMain}
            hideSelectedOptions={false}
          />
        </div>

        {trainerData?.tag === 'External' && (
          <div className={`${styles.vendorDropdown}`}>
            <label>Vendor: </label>
            <LabeledDropdown
              dropdownOptions={{
                inputName: 'vendorDropdown',
                options: vendorList?.map((vendor, index) => ({
                  label: vendor?.name,
                  value: vendor?.vendorId,
                  ...vendor,
                })),
                placeholder: 'Select Vendor',
                value: {
                  label: trainerData?.vendorName,
                  value: trainerData?.vendorName,
                },
              }}
              changeHandler={(e) => {
                setTrainerData((prev) => ({ ...prev, vendorId: e.vendorId, vendorName: e.name }));
              }}
              styleClass={`${styles.dropdown}`}
            />
          </div>
        )}
        {trainerData?.tag !== 'External' && (
          <div className={`${styles.email}`}>
            <label>Email: </label>
            <MultiEmailInput
              items={emails}
              setItems={setEmails}
              isDisabled={emails?.length === 1}
              type={trainerData?.tag}
            />
          </div>
        )}
      </div>

      {trainerData?.tag === 'External' && (
        <div className={`${styles.emailExternal}`}>
          <label>Email: </label>
          <MultiEmailInput
            items={emails}
            setItems={setEmails}
            isDisabled={emails?.length === 1}
            type={trainerData?.tag}
          />
        </div>
      )}

      <div className={`${styles.trainingProfile}`}>
        <h3>Training Profile</h3>
        <TrainingProfileAccordian />
      </div>
    </div>
  );
}
