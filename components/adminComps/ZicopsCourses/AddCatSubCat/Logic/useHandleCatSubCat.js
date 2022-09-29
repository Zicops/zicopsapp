import { ADD_CAT_MAIN, ADD_SUB_CAT_MAIN, mutationClient } from '@/api/Mutations';
import { GET_CATS_MAIN, GET_SUB_CATS_MAIN } from '@/api/Queries';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { isNameDuplicateAdvanced } from '@/helper/data.helper';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCatSubCatData } from './addCatSubCat.helper';

export default function useHandleCatSubCat(isSubCat) {
  const [addNewCategory, { error: addCategoryErr }] = useMutation(ADD_CAT_MAIN, {
    client: mutationClient
  });
  const [addNewSubCategory, { error: addSubCategoryErr }] = useMutation(ADD_SUB_CAT_MAIN, {
    client: mutationClient
  });

  // recoil state
  const userOrg = useRecoilValue(UsersOrganizationAtom);
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const [isPopUpDataPresent, setIsPopUpDataPresent] = useRecoilState(IsDataPresentAtom);
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addCatSubCat'));

  // local state
  const [catSubCatData, setCatSubCatData] = useState(getCatSubCatData());
  const [isAddReady, setIsAddReady] = useState(false);
  const [catoptions, setCatOptions] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const catRes = await loadQueryDataAsync(GET_CATS_MAIN);
      console.log(catRes);
      setCatOptions(catRes?.allCatMain?.map((cat) => ({ label: cat?.Name, value: cat?.id })));
    }
    loadCategories();
  }, []);

  useEffect(() => {
    setCatSubCatData({ ...catSubCatData, isSubCat: isSubCat, LspId: userOrg?.lsp_id });
  }, [isSubCat]);

  // disable submit if data not complete
  useEffect(() => {
    setIsAddReady(
      catSubCatData?.Name &&
        catSubCatData?.Description &&
        (catSubCatData?.File || catSubCatData?.ImageUrl) &&
        (catSubCatData?.isSubCat ? catSubCatData?.CatId : true)
    );

    setIsPopUpDataPresent(
      catSubCatData?.Name ||
        catSubCatData?.Description ||
        catSubCatData?.File ||
        (catSubCatData?.isSubCat ? catSubCatData?.CatId : false)
    );
  }, [catSubCatData]);

  function handleFileInput(e) {
    const acceptedType = ['image/jpg', 'image/jpeg', 'image/png'];

    if (e.target.files && acceptedType.includes(e.target.files[0]?.type)) {
      setCatSubCatData({
        ...catSubCatData,
        File: e.target.files[0]
      });
    }

    e.target.value = '';
  }

  // set local state to selected edit question bank
  // useEffect(() => {
  //   setCatSubCatData(getQuestionBankObject(selectedQB));
  // }, [selectedQB]);

  // error notification
  useEffect(() => {
    if (addCategoryErr) return setToastMsg({ type: 'danger', message: 'Add Category Error' });
    if (addSubCategoryErr)
      return setToastMsg({ type: 'danger', message: 'Add Sub Category Error' });
  }, [addCategoryErr, addSubCategoryErr]);

  async function addCategory() {
    // duplicate name check
    if (await isNameDuplicateAdvanced(GET_CATS_MAIN, {}, catSubCatData?.Name, 'allCatMain')) {
      return setToastMsg({ type: 'danger', message: 'Category with same name already exist' });
    }

    const sendData = {
      Name: catSubCatData?.Name,
      Description: catSubCatData?.Description,
      ImageFile: catSubCatData?.File,
      Code: catSubCatData?.Code,
      IsActive: catSubCatData?.IsActive,
      LspId: catSubCatData?.LspId
    };

    console.log(sendData);

    let isError = false;
    // const res = await addNewCategory({ variables: sendData }).catch((err) => {
    //   console.log(err);
    //   isError = !!err;
    //   return setToastMsg({ type: 'danger', message: 'Add Category Error' });
    // });
    // console.log(res);

    if (isError) return;

    setIsPopUpDataPresent(false);
    udpatePopUpState(false);
  }

  async function addSubCategory() {
    // duplicate name check
    if (
      await isNameDuplicateAdvanced(GET_SUB_CATS_MAIN, {}, catSubCatData?.Name, 'allSubCatMain')
    ) {
      return setToastMsg({ type: 'danger', message: 'Category with same name already exist' });
    }

    const sendData = {
      CatId: catSubCatData?.CatId,
      Name: catSubCatData?.Name,
      Description: catSubCatData?.Description,
      ImageFile: catSubCatData?.File,
      Code: catSubCatData?.Code,
      IsActive: catSubCatData?.IsActive,
      LspId: catSubCatData?.LspId
    };

    console.log(sendData);

    let isError = false;
    // const res = await addNewSubCategory({ variables: sendData }).catch((err) => {
    //   console.log(err);
    //   isError = !!err;
    //   return setToastMsg({ type: 'danger', message: 'Add Sub Category Error' });
    // });
    // console.log(res);

    if (isError) return;

    setIsPopUpDataPresent(false);
    udpatePopUpState(false);
  }

  return {
    catSubCatData,
    setCatSubCatData,
    isAddReady,
    handleFileInput,
    addCategory,
    addSubCategory,
    catoptions
  };
}
