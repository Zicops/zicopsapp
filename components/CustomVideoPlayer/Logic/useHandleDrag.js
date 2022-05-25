import { useRef } from 'react';

// https://www.w3schools.com/howto/howto_js_draggable.asp
export default function useHandleDrag() {
  const draggableDivRef = useRef(null);
  const elementPosition = { x: 0, y: 0 };
  const cursorPosition = { x: 0, y: 0 };

  function startDrag(e) {
    e.preventDefault();

    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;

    document.onmouseup = closeDrag;
    document.onmousemove = dragElement;
  }

  function dragElement(e) {
    e.preventDefault();
    // update element position
    elementPosition.x = cursorPosition.x - e.clientX;
    elementPosition.y = cursorPosition.y - e.clientY;

    // update cursor position
    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;

    // reflect position in ui dom
    const elem = draggableDivRef.current;
    elem.style.top = `${elem.offsetTop - elementPosition.y}px`;
    elem.style.left = `${elem.offsetLeft - elementPosition.x}px`;
    console.log(elementPosition, e);
  }

  function closeDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  return {
    draggableDivRef,
    startDrag,
    dragElement
  };
}
