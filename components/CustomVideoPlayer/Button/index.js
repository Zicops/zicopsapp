import { btn } from '../ControlBar/controlbar.module.scss';

export default function Button({ handleClick = function () {}, disable, styleClass, children }) {
  return (
    <button className={`${btn} ${styleClass}`} onClick={handleClick} disabled={disable}>
      {children}
    </button>
  );
}
