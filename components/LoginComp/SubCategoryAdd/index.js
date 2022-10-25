import AddCatSubCat from '@/components/adminComps/ZicopsCourses/AddCatSubCat';
import PopUp from '@/components/common/PopUp';
import {
  
    Button,

  } from '@mui/material';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styles from '../ProfilePreferences/profilePreferences.module.scss';

export default function SubCategoryAdd() {
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addCatSubCat'));
  const [catState, setCatState] = useState(false);
  const [subCatState, setSubCatState] = useState(false);

  function closePopUp() {
      udpatePopUpState(false);
      if(!subCatState) return setCatState(false);
      if(!catState) return setSubCatState(false);
  }
  return (
    <>
      <div>
        You don't have categories and sub-categories in learning space. Atleast add five of them or
        skip for now.
      </div>
      <Button
        variant={'contained'}
          className={`${styles.transform_text}`}
        onClick={() => {
          setCatState(true);
          udpatePopUpState(true);
        }}>
        Select Category
      </Button>
      <Button
        variant={'contained'}
          className={`${styles.transform_text}`}
        onClick={() => {
          setSubCatState(true);
          udpatePopUpState(true);
        }}>
        Select Sub-Category
      </Button>
      <PopUp
        title={catState? "Add New Category" : "Add New Sub Category"}
        popUpState={[popUpState, udpatePopUpState]}
        closeBtn={closePopUp}
        isFooterVisible={false}>
        {catState && <AddCatSubCat closePopUp={closePopUp} />}
        {subCatState && <AddCatSubCat isSubCat={true} closePopUp={closePopUp} />}
      </PopUp>
    </>
  );
}
