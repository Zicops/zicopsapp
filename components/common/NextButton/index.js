import Image from 'next/image';
import { nextBtn } from './nextButton.module.scss';

export default function NextButton({ clickHandler }) {
  return (
    <div className="row" style={{ display: 'inline-block' }}>
      <div className="col_75"></div>
      <div className="col_25"></div>
      <button type="button" className={nextBtn} onClick={clickHandler}>
        <span>Next</span>
        <Image src="/images/bigarrowright.png" alt="" height={20} width={20} />
      </button>
    </div>
  );
}
