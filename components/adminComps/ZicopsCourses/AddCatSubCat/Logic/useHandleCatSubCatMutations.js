// components\adminComps\ZicopsCourses\AddCatSubCat\Logic\useHandleCatSubCatMutations.js

import {
  ADD_CAT_MAIN,
  ADD_SUB_CAT_MAIN,
  mutationClient,
  UPDATE_CATS_MAIN,
  UPDATE_SUB_CATS_MAIN
} from '@/api/Mutations';
import { GET_CATS_MAIN, GET_SUB_CATS_MAIN } from '@/api/Queries';
import { IsDataPresentAtom } from '@/components/common/PopUp/Logic/popUp.helper';
import { loadAndCacheDataAsync } from '@/helper/api.helper';
import { COMMON_LSPS } from '@/helper/constants.helper';
import { handleCacheUpdate } from '@/helper/data.helper';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCatSubCatData } from './addCatSubCat.helper';

export default function useHandleCatSubCatMutations(isSubCat = false) {
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

    loadCategories();

    async function loadCategories() {
      const zicopsLspData =
        zicopsLsp !== _lspId
          ? await loadAndCacheDataAsync(GET_CATS_MAIN, { lsp_ids: [zicopsLsp] })
          : {};
      const currentLspData = await loadAndCacheDataAsync(GET_CATS_MAIN, { lsp_ids: [_lspId] });

      const data = [];

      // add lsp id to the list as backend is not sending the lsp id and we need it for displaying actions on lsp cats
      const updatedCatList =
        currentLspData?.allCatMain?.map((cat) => ({ ...cat, LspId: _lspId })) || [];

      data.push(...updatedCatList);
      data.push(...(zicopsLspData?.allCatMain || []));

      setCatOptions(data?.map((cat) => ({ label: cat?.Name, value: cat?.id })));
    }
  }, [userOrg?.lsp_id]);

  // update the state based on props
  useEffect(() => {
    let _catSubCatData = structuredClone(catSubCatData);

    _catSubCatData.isSubCat = isSubCat;
    if (userOrg?.lsp_id) _catSubCatData.LspId = userOrg?.lsp_id;
    if (popUpState?.id) _catSubCatData = { ..._catSubCatData, ...popUpState };

    setCatSubCatData(_catSubCatData);
  }, [popUpState?.id, userOrg?.lsp_id, isSubCat]);

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
  }, [
    catSubCatData?.Name,
    catSubCatData?.Description,
    catSubCatData?.File,
    catSubCatData?.ImageUrl,
    catSubCatData?.isSubCat,
    catSubCatData?.CatId
  ]);

  // error notification
  useEffect(() => {
    if (addCategoryErr) return setToastMsg({ type: 'danger', message: 'Add Category Error' });
    if (addSubCategoryErr)
      return setToastMsg({ type: 'danger', message: 'Add Sub Category Error' });
    if (updateCategoryErr) return setToastMsg({ type: 'danger', message: 'Update Category Error' });
    if (updateSubCategoryErr)
      return setToastMsg({ type: 'danger', message: 'Update Sub Category Error' });
  }, [addCategoryErr, addSubCategoryErr, updateCategoryErr, updateSubCategoryErr]);

  function handleFileInput(e) {
    const acceptedType = ['image/jpg', 'image/jpeg', 'image/png'];

    if (e.target.files && acceptedType.includes(e.target.files[0]?.type)) {
      setCatSubCatData({ ...catSubCatData, File: e.target.files[0] });
    }

    e.target.value = '';
  }

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

      await updateCategory({
        variables: { catMainInput: sendData },
        update: (_, { data }) => {
          handleCacheUpdate(GET_CATS_MAIN, { lsp_ids: [userOrg?.lsp_id] }, (cachedData) => {
            const _cachedData = structuredClone(cachedData?.allCatMain);
            const _updatedCache = _cachedData?.map((cat) => {
              const isCurrentSubCat = cat?.id === data?.updateCatMain?.id;
              if (isCurrentSubCat) return { ...cat, ...data?.updateCatMain };

              return cat;
            });

            return { allCatMain: _updatedCache };
          });
        }
      }).catch((err) => {
        console.log(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Category Error' });
      });

      if (isError) return;

      setIsPopUpDataPresent(false);
      udpatePopUpState(false);
      setToastMsg({ type: 'success', message: 'Category Updated' });
      return;
    }

    const res = await addNewCategory({
      variables: sendData,
      update: (_, { data }) => {
        handleCacheUpdate(GET_CATS_MAIN, { lsp_ids: [userOrg?.lsp_id] }, (cachedData) => {
          const _cachedData = structuredClone(cachedData?.allCatMain);
          const _updatedCache = data?.addCatMain?.[0]
            ? [data?.addCatMain?.[0], ..._cachedData]
            : _cachedData;

          return { allCatMain: _updatedCache };
        });
      }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Category Error' });
    });

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

    const sendData = {
      CatId: catSubCatData?.CatId,
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

      await updateSubCategory({
        variables: { subCatMainInput: sendData },
        update: (_, { data }) => {
          handleCacheUpdate(GET_SUB_CATS_MAIN, { lsp_ids: [userOrg?.lsp_id] }, (cachedData) => {
            const _cachedData = structuredClone(cachedData?.allSubCatMain);
            const _updatedCache = _cachedData?.map((subCat) => {
              const isCurrentSubCat = subCat?.id === data?.updateSubCatMain?.id;
              if (isCurrentSubCat) return { ...subCat, ...data?.updateSubCatMain };

              return subCat;
            });

            return { allSubCatMain: _updatedCache };
          });
        }
      }).catch((err) => {
        console.error(err);
        isError = !!err;
        return setToastMsg({ type: 'danger', message: 'Update Sub Category Error' });
      });

      if (isError) return;

      setIsPopUpDataPresent(false);
      udpatePopUpState(false);
      setToastMsg({ type: 'success', message: 'Sub Category Updated' });
      return;
    }

    const res = await addNewSubCategory({
      variables: sendData,
      update: (_, { data }) => {
        handleCacheUpdate(GET_SUB_CATS_MAIN, { lsp_ids: [userOrg?.lsp_id] }, (cachedData) => {
          const _cachedData = structuredClone(cachedData?.allSubCatMain);
          const _updatedCache = data?.addSubCatMain?.[0]
            ? [data?.addSubCatMain?.[0], ..._cachedData]
            : _cachedData;

          return { allSubCatMain: _updatedCache };
        });
      }
    }).catch((err) => {
      console.log(err);
      isError = !!err;
      return setToastMsg({ type: 'danger', message: 'Add Sub Category Error' });
    });

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
