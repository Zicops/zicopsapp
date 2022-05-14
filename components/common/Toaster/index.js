import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ToastMsgAtom } from '../../../state/atoms/toast.atom';
import styles from './toaster.module.scss';

export default function Toaster() {
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const MAXIMUM_TOASTER_DISPLAYED = 5;
  const FADE_OUT_IN_SECONDS = 3;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const msg = [...toastMsg];
      msg.pop();
      setToastMsg(msg);
    }, FADE_OUT_IN_SECONDS * 1000);

    return () => clearTimeout(timeout);
  }, [toastMsg]);

  return (
    <div className={`${styles.toasterContainer}`}>
      {toastMsg.slice(-MAXIMUM_TOASTER_DISPLAYED).map(({ type, message }, index) => (
        <div className={`${styles.toaster}`} key={index}>
          <div
            className={`${styles.crossBtn}`}
            onClick={function () {
              const updatedMsg = [...toastMsg];
              updatedMsg.splice(index, 1);
              setToastMsg(updatedMsg);
            }}>
            X
          </div>
          <h3 className={`${styles[type]}`}>
            <span className={`${styles.imgContainer}`}></span>
            {type}
          </h3>

          <p>{message}</p>
        </div>
      ))}
    </div>
  );
}
