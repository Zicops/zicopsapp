import { btn } from '../controlbar.module.scss';

export default function Button({ handleClick = function () {}, styleClass, children }) {
  return (
    <button className={`${btn} ${styleClass}`} onClick={handleClick}>
      {children}
    </button>
  );
}
