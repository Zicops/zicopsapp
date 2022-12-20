import ToolTip from '@/components/common/ToolTip';
import Image from 'next/image';
import Button from '../Button';

export default function ButtonWithBox({
  btnImg = null,
  btnComp = null,
  handleClick,
  isBoxActive = false,
  isDisabled = false,
  boxComponent = null,
  tooltipTitle = ''
}) {
  return (
    <>
      <ToolTip title={tooltipTitle} placement="bottom">
        <div className="position-relative">
          <Button disable={isDisabled}>
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
            {btnComp}
          </Button>

          {/* subtitle and language element */}
          {!!isBoxActive && boxComponent && boxComponent}
        </div>
      </ToolTip>
    </>
  );
}
