import { customReactSelectMenu, addNewTrainerButton } from '../formComponents.module.scss';
import IconButton from '@/components/common/IconButton';

export default function CustomMenu({ innerRef, innerProps, isDisabled, children }) {
  return (
    <div ref={innerRef} {...innerProps} className={`${customReactSelectMenu}`}>
      {children}
      <hr style={{ width: '100%', opacity: '0.5' }} />
      <IconButton
        text="Add New Trainer"
        styleClass={`${addNewTrainerButton}`}
        imgUrl="/images/svg/add_circle.svg"
        // handleClick={() => {
        //   setExpertisePopupState(true);
        // }}
        // isDisabled={isViewPage || !data?.isApplicable}
      />
    </div>
  );
}
