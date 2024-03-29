import {
  ADD_USER_PREFERENCE,
  UPDATE_USER,
  UPDATE_USER_LEARNINGSPACE_MAP,
  UPDATE_USER_ORGANIZATION_MAP,
  UPDATE_USER_PREFERENCE,
  UPDATE_USER_ROLE,
  userClient
} from '@/api/UserMutations';
import { getUserData } from '@/helper/loggeduser.helper';
import { UserDataAtom } from '@/state/atoms/global.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import {
  getUserObject,
  getUserOrgObject,
  UsersOrganizationAtom,
  UserStateAtom
} from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import useCommonHelper from './common.helper';

export default function useHandleUserUpdate() {
  // const { getUserPreferences } = useCommonHelper();
  const [userDataGlobal,setUserDataGlobal] = useRecoilState(UserDataAtom);
  const [updateAbout, { error: createError }] = useMutation(UPDATE_USER, {
    client: userClient
  });

  const [updateOrg, { error: createOrgError }] = useMutation(UPDATE_USER_ORGANIZATION_MAP, {
    client: userClient
  });

  const [updateLsp, { error: createLspError }] = useMutation(UPDATE_USER_LEARNINGSPACE_MAP, {
    client: userClient
  });

  const [updateRole, { error: createRoleError }] = useMutation(UPDATE_USER_ROLE, {
    client: userClient
  });

  const [updatePreference, { error: updatePreferenceError , loading : prefLoading }] = useMutation(UPDATE_USER_PREFERENCE, {
    client: userClient
  });

  const [addPreference, { error: createPreferenceError }] = useMutation(ADD_USER_PREFERENCE, {
    client: userClient
  });


  //recoil states
  const userDataAbout = useRecoilValue(UserStateAtom);
  const [userDataOrgLsp, setUserDataOrgLsp] = useRecoilState(UsersOrganizationAtom);

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  // local state
  const [userAboutData, setUserAboutData] = useState(getUserObject());
  const [userOrgData, setUserOrgData] = useState(getUserOrgObject());
  const [_isSubmitDisable , setIsSubmitDisable] = useState(false);

  useEffect(() => {
    setUserAboutData(getUserObject(userDataAbout));
    setUserOrgData(getUserOrgObject(userDataOrgLsp));
  }, [userDataAbout, userDataOrgLsp]);

  // useEffect(()=>{
  //   if(prefLoading) return setIsSubmitDisable(true);
  //   return setIsSubmitDisable(false)
  // },[prefLoading])

  async function updateUserLearningSpaceDetails() {
    const sendLspData = {
      user_id: userDataAbout?.id,
      user_lsp_id: userOrgData?.user_lsp_id,
      lsp_id: userOrgData?.lsp_id,
      status: 'Active'
    };

    console.log(sendLspData, 'addUserLearningSpaceDetails');

    let isError = false;
    const res = await updateLsp({ variables: sendLspData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User LSP Error' });
    });

    //updating atom after first mutation call
    const data = res?.data?.addUserLspMap[0];

    setUserDataOrgLsp((prevValue) => ({ ...prevValue, ...data }));

    setTimeout(sessionStorage.setItem('userAccountSetupData', JSON.stringify(userOrgData)), 200);
  }

  async function updateUserOrganizationDetails() {
    const sendOrgData = {
      user_id: userDataAbout?.id,
      employee_id: userOrgData?.employee_id,

      user_organization_id: userOrgData?.user_organization_id,
      user_lsp_id: userOrgData?.user_lsp_id,
      organization_id: userOrgData?.organization_id || 'Zicops',
      organization_role: userOrgData?.organization_role,

      is_active: userOrgData?.org_is_active || true
    };

    let isError = false;
    const res = await updateOrg({ variables: sendOrgData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Update User Org Error' });
    });

    //updating atom after first mutation call
    const data = res?.data?.updateUserOrganizationMap[0];
    setUserDataOrgLsp((prevValue) => ({ ...prevValue, ...data }));

    setTimeout(sessionStorage.setItem('userAccountSetupData', JSON.stringify(userOrgData)), 200);

    console.log(res, userDataOrgLsp);
  }

  async function updatePreferences(sub_categories = [], base_sub_category) {
    setIsSubmitDisable(true);
    const { id } = getUserData();
    const preferenceData =  userDataGlobal?.preferences;

    // if(!preferenceData?.length) return setToastMsg({type:'danger' , message:'error while updating preferences'})

    const user_lsp_id = sessionStorage?.getItem('user_lsp_id');
    const _userPreference = preferenceData?.filter((pref) => pref?.user_lsp_id === user_lsp_id);
    const userPreferences = _userPreference?.map((item) => {
      return { ...item, name: item?.sub_category, category: item?.catData?.Name, isSelected: false };
    }) 

    const selectedSubcartegory = sub_categories;

    // console.log(selectedSubcartegory);
    for (let i = 0; i < userPreferences?.length; i++) {
      const a = selectedSubcartegory.filter((ele) => ele?.name === userPreferences[i].name);

      if (!a[0]?.user_preference_id && a.length) {
        a[0].user_preference_id = userPreferences[i]?.user_preference_id;
        a[0].user_id = userPreferences[i]?.user_id;
        a[0].user_lsp_id = userPreferences[i]?.user_lsp_id;
      }
    }

    // console.log(selectedSubcartegory);
    //delete preferences that are deselected
    let sub_categoriesArr;
    if (userPreferences?.length) {
      const newArr = sub_categories.map((item) => item?.name);
      // console.log(newArr);
      sub_categoriesArr = userPreferences.filter((item) => {
        return !newArr.includes(item?.name);
      });
      // console.log(userPreferences, sub_categoriesArr);
    }
    if (sub_categoriesArr?.length) {
      for (let i = 0; i < sub_categoriesArr.length; i++) {
        let sendData = {
          user_preference_id: sub_categoriesArr[i]?.user_preference_id,
          user_id: sub_categoriesArr[i]?.user_id,
          user_lsp_id: sub_categoriesArr[i]?.user_lsp_id,
          sub_category: sub_categoriesArr[i]?.sub_category,
          is_base: false,
          is_active: false
        };
        // console.log(sendData);
        const res = await updatePreference({ variables: sendData }).catch((err) =>
          console.log(err)
        );
        
      }
    }

    // console.log(sub_categories);
    //temp way need to be delete later
    // const { user_lsp_id } = JSON.parse(sessionStorage.getItem('lspData'));

    for (let i = 0; i < selectedSubcartegory?.length; i++) {
      let is_base = selectedSubcartegory[i]?.name === base_sub_category ? true : false;
      if (selectedSubcartegory[i]?.user_preference_id) {
        let sendData = {
          user_preference_id: selectedSubcartegory[i]?.user_preference_id,
          user_id: id,
          user_lsp_id: selectedSubcartegory[i]?.user_lsp_id,
          sub_category: selectedSubcartegory[i]?.name,
          is_base: is_base,
          is_active: true
        };
        console.log(sendData);
        const res = await updatePreference({ variables: sendData }).catch((err) =>
          console.log(err)
        );
      } else {
        let sendData = {
          user_id: id,
          user_lsp_id: user_lsp_id,
          sub_category: selectedSubcartegory[i]?.name,
          is_base: is_base,
          is_active: true
        };
        console.log(sendData);
        const res = await addPreference({ variables: { input: sendData } }).catch((err) =>
          console.log(err)
        );
      }
    }
    setUserDataGlobal((prev)=>({...prev , isPrefUpdated:true})) ;
     return setIsSubmitDisable(false)
  }
  return { updateUserLearningSpaceDetails, updateUserOrganizationDetails, updatePreferences , _isSubmitDisable };
}
