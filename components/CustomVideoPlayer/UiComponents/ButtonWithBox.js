import Image from 'next/image';
import Button from '../Button';
import { BOX } from '../Logic/customVideoPlayer.helper';

export default function ButtonWithBox({
  btnImg = null,
  btnComp = null,
  handleClick,
  isBoxActive = false,
  boxComponent = null
}) {
  return (
    <>
      <div className="position-relative">
        <Button>
          {btnImg && (
            <Image
              src={btnImg}
              alt=""
              height="30px"
              width="30px"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(e);
              }}
            />
          )}
          {btnComp}
        </Button>

        {/* subtitle and language element */}
        {!!isBoxActive && boxComponent && boxComponent}
      </div>
    </>
  );
}
