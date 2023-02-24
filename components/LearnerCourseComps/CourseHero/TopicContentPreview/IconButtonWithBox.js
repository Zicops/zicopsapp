import ToolTip from '@/components/common/ToolTip';
import Image from 'next/image';
import ButtonWithNoStyles from '../../common/ButtonWithNoStyles';
import styles from '../../learnerCourseComps.module.scss';

export default function IconButtonWithBox({
  btnImg = null,
  handleClick,
  isBoxActive = false,
  isDisabled = false,
  boxComponent = null,
  tooltipTitle = '',
}) {
  return (
    <>
      <ToolTip title={tooltipTitle} placement="bottom">
        <div className={`position-relative ${styles.iconBtnWithBox}`}>
          <ButtonWithNoStyles disable={isDisabled} styleClass={styles.iconBtn}>
            {btnImg && (
              <Image
                src={btnImg}
                alt=""
                height="30px"
                width="30px"
                onClick={(e) => {
                  e.stopPropagation();

                  if (isDisabled) return;
                  handleClick(e);
                }}
              />
            )}
          </ButtonWithNoStyles>

          {/* subtitle and language element */}
          {!!isBoxActive && boxComponent && <div className={styles.boxComp}>{boxComponent}</div>}
        </div>
      </ToolTip>
    </>
  );
}
