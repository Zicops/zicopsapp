import { useEffect, useRef } from 'react';
import styles from '../customVideoPlayer.module.scss';
import useHandleDrag from '../Logic/useHandleDrag';

export default function DraggableDiv({ initalPosition = null, children }) {
  const { draggableDivRef, startDrag } = useHandleDrag(initalPosition);

  return (
    <>
      <div className={`${styles.draggableDiv}`} ref={draggableDivRef} onMouseDown={startDrag}>
        {children}
      </div>
      {/* <div
        className={`${styles.draggableDiv}`}
        ref={draggableDivRef}
        draggable={true}
        onDragStart={(e) => console.log(e)}
        onDragEnd={(e) => {
          if (draggableDivRef.current) {
            console.log(draggableDivRef.current.style);
            draggableDivRef.current.style.position = 'absolute';
            draggableDivRef.current.style.top = e.clientX;
          }
          console.log(e);
        }}>
        {children}
      </div> */}
    </>
  );
}
