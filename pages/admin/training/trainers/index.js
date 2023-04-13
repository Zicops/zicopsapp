import { useState } from 'react';
import AdminHeader from '@/components/common/AdminHeader';
import MainBody from '@/components/common/MainBody';
import MainBodyBox from '@/components/common/MainBodyBox';
import Sidebar from '@/components/common/Sidebar';
import { trainerSideBarData } from '@/components/common/Sidebar/Logic/sidebar.helper';
import MyVendor from '@/components/VendorComps/MyVendor';
import AddVendor from '@/components/VendorComps/AddVendor';
import { useRouter } from 'next/router';
import { changeHandler } from '@/helper/common.helper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getVendorObject, VendorStateAtom } from '@/state/atoms/vendor.atoms';
import { USER_LSP_ROLE, VENDOR_MASTER_TYPE } from '@/helper/constants.helper';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import MyTrainers from '@/components/TrainingManagementComps/MyTrainers';
import AddTrainerPopup from '@/components/TrainingManagementComps/AddTrainerPopup/AddTrainerPopup';
import Button from '@/components/common/Button';
import useHandleTrainerData from '@/components/TrainingManagementComps/Logic/useHandleTrainerData';
import { TrainerDataAtom, getTrainerDataObj } from '@/state/atoms/trainingManagement.atoms';
export default function Trainers() {
  const [vendorData, setVendorData] = useRecoilState(VendorStateAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);
  const router = useRouter();
  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  const { addUpdateTrainer } = useHandleTrainerData();
  const [isOpen, setIsOpen] = useState(false);
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);

  return (
    <>
      <Sidebar sidebarItemsArr={trainerSideBarData} />
      <MainBody>
        <AdminHeader
          title="Trainers"
          isAddShown={true}
          handleClickForPlus={() => {
            setIsOpen(true);

            const currentLsp = sessionStorage?.getItem('lsp_id');

            setTrainerData(getTrainerDataObj({ lspId: currentLsp }));
          }}
          isProductTooltip={false}
        />
        <MainBodyBox>
          <MyTrainers />
          <AddTrainerPopup popUpState={[isOpen, setIsOpen]} />
        </MainBodyBox>
      </MainBody>
    </>
  );
}
