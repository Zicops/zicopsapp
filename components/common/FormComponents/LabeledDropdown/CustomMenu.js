import { AddTrainerAtom } from '@/state/atoms/trainingManagement.atoms';
import { useRecoilState } from 'recoil';
import { buttonDiv, customReactSelectMenu } from '../formComponents.module.scss';

export default function CustomMenu({ innerRef, innerProps, isDisabled, children }) {
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useRecoilState(AddTrainerAtom);

  return (
    <div ref={innerRef} {...innerProps} className={`${customReactSelectMenu}`}>
      {children}
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
