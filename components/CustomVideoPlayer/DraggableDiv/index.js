import { useEffect, useRef } from 'react';
import styles from '../customVideoPlayer.module.scss';
import useHandleDrag from '../Logic/useHandleDrag';

export default function DraggableDiv({ children }) {
  const { draggableDivRef, startDrag } = useHandleDrag();

  return (
    <>
      <div className={`${styles.draggableDiv}`} ref={draggableDivRef} onMouseDown={startDrag}>
        {children}
      </div>
    </>
  );
}
