import {
  ADD_CAT_MAIN,
  ADD_SUB_CAT_MAIN,
  mutationClient,
  UPDATE_CATS_MAIN,
  UPDATE_SUB_CATS_MAIN
} from '@/api/Mutations';
import { GET_CATS_MAIN } from '@/api/Queries';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCatSubCatData } from './addCatSubCat.helper';

export default function useHandleAddCatSubCat(isSubCat) {
  const [addNewCategory, { error: addCategoryErr }] = useMutation(ADD_CAT_MAIN, {
    client: mutationClient
  });
  const [addNewSubCategory, { error: addSubCategoryErr }] = useMutation(ADD_SUB_CAT_MAIN, {
    client: mutationClient
  });
  const [updateCategory, { error: updateCategoryErr }] = useMutation(UPDATE_CATS_MAIN, {
    client: mutationClient
  });
  const [updateSubCategory, { error: updateSubCategoryErr }] = useMutation(UPDATE_SUB_CATS_MAIN, {
    client: mutationClient
  });

  const { catSubCat } = useHandleCatSubCat();

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
    const _lspId = userOrg?.lsp_id;
    const zicopsLsp = COMMON_LSPS.zicops;
    if (!_lspId) return;

    async function loadCategories() {
      const zicopsLspData =
        zicopsLsp !== _lspId
          ? await loadQueryDataAsync(GET_CATS_MAIN, { lsp_ids: [zicopsLsp] })
          : {};
      const currentLspData = await loadQueryDataAsync(GET_CATS_MAIN, { lsp_ids: [_lspId] });

      const data = [];

      const updatedCatList =
        currentLspData?.allCatMain?.map((cat) => ({ ...cat, LspId: _lspId })) || [];

      data.push(...updatedCatList);
      data.push(...(zicopsLspData?.allCatMain || []));

      // console.log(catRes);
      setCatOptions(data?.map((cat) => ({ label: cat?.Name, value: cat?.id })));
    }
    loadCategories();
  }, [userOrg?.lsp_id]);

  useEffect(() => {
    setCatSubCatData({ ...catSubCatData, isSubCat: isSubCat, LspId: userOrg?.lsp_id });
  }, [isSubCat]);

  useEffect(() => {
    if (!popUpState?.id) return;

    setCatSubCatData({
      ...catSubCatData,
      isSubCat: isSubCat,
      LspId: userOrg?.lsp_id,
      ...popUpState
    });
  }, [popUpState]);

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
    if (updateCategoryErr) return setToastMsg({ type: 'danger', message: 'Update Category Error' });
    if (updateSubCategoryErr)
      return setToastMsg({ type: 'danger', message: 'Update Sub Category Error' });
  }, [addCategoryErr, addSubCategoryErr, updateCategoryErr, updateSubCategoryErr]);

  async function addCategory() {
    setIsAddReady(false);
    // duplicate name check
    if (
      catSubCat?.cat?.some((cat) => {
        if (cat?.id === popUpState?.id) return false;

        return cat?.Name?.toLowerCase()?.trim() === catSubCatData?.Name?.toLowerCase()?.trim();
      })
    )
      return setToastMsg({ type: 'danger', message: 'Category with same name already exist' });

    // if (
    //   await isNameDuplicateAdvanced(
    //     GET_CATS_MAIN,
    //     {},
    //     catSubCatData?.Name,
    //     'allCatMain',
    //     queryClient,
    //     popUpState?.id
    //   )
    // ) {
    //   return setToastMsg({ type: 'danger', message: 'Category with same name already exist' });
    // }

    const sendData = {
      Name: catSubCatData?.Name?.trim(),
      Description: catSubCatData?.Description?.trim(),
      ImageFile: catSubCatData?.File,
      Code: catSubCatData?.Code?.trim(),
      IsActive: catSubCatData?.IsActive || true,
      LspId: catSubCatData?.LspId
    };

    let isError = false;
    if (popUpState?.id) {
      sendData.id = popUpState?.id;
      console.log(sendData);

      await updateCategory({ variables: { catMainInput: sendData } }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Category Error' });
      });
      // console.log(res);

      if (isError) return;

      setIsPopUpDataPresent(false);
      udpatePopUpState(false);
      setToastMsg({ type: 'success', message: 'Category Updated' });
      return;
    }

    // console.log(sendData);

    const res = await addNewCategory({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Category Error' });
    });
    // console.log(res);

    if (isError) return;

    setIsPopUpDataPresent(false);
    udpatePopUpState(false);
  }

  async function addSubCategory() {
    setIsAddReady(false);
    // duplicate name check

    if (
      catSubCat?.subCat?.some((subcat) => {
        if (subcat?.id === popUpState?.id) return false;

        return subcat?.Name?.toLowerCase()?.trim() === catSubCatData?.Name?.toLowerCase()?.trim();
      })
    )
      return setToastMsg({ type: 'danger', message: 'Sub-Category with same name already exist' });

    // if (
    //   await isNameDuplicateAdvanced(
    //     GET_SUB_CATS_MAIN,
    //     {},
    //     catSubCatData?.Name,
    //     'allSubCatMain',
    //     queryClient,
    //     popUpState?.id
    //   )
    // ) {
    //   return setToastMsg({ type: 'danger', message: 'Sub-Category with same name already exist' });
    // }

    const sendData = {
      CatId: catSubCatData?.CatId,
      Name: catSubCatData?.Name?.trim(),
      Description: catSubCatData?.Description?.trim(),
      ImageFile: catSubCatData?.File,
      Code: catSubCatData?.Code?.trim(),
      IsActive: catSubCatData?.IsActive || true,
      LspId: catSubCatData?.LspId
    };

    // console.log(sendData);

    let isError = false;

    if (popUpState?.id) {
      sendData.id = popUpState?.id;
      console.log(sendData);

      await updateSubCategory({ variables: { subCatMainInput: sendData } }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Sub Category Error' });
      });
      // console.log(res);

      if (isError) return;

      setIsPopUpDataPresent(false);
      udpatePopUpState(false);
      setToastMsg({ type: 'success', message: 'Sub Category Updated' });
      return;
    }

    const res = await addNewSubCategory({ variables: sendData }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Sub Category Error' });
    });
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
