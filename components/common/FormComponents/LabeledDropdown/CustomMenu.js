import { customReactSelectMenu, buttonDiv } from '../formComponents.module.scss';
import { useState } from 'react';
import AddTrainerPopup from '@/components/TrainingManagementComps/AddTrainerPopup/AddTrainerPopup';
import { useRecoilState } from 'recoil';
import { AddTrainerAtom } from '@/state/atoms/trainingManagement.atoms';

export default function CustomMenu({ innerRef, innerProps, isDisabled, children }) {
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useRecoilState(AddTrainerAtom);

  console.info(isAddTrainerOpen);

  return (
    <div ref={innerRef} {...innerProps} className={`${customReactSelectMenu}`}>
      {children}
      <hr style={{ width: '100%', opacity: '0.3' }} />
      <div className={`${buttonDiv}`}>
        <img src="/images/svg/add_circle.svg" />
        <button
          onClick={() => {
            setIsAddTrainerOpen(true);
          }}>
          Add New Trainer
        </button>
      </div>
    </div>
  );
}
