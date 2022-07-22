import { useEffect, useRef } from 'react';

// https://www.w3schools.com/howto/howto_js_draggable.asp
export default function useHandleDrag(initalPosition = null) {
  const draggableDivRef = useRef(null);
  const elementPosition = {
    x: initalPosition?.x ? initalPosition?.x : 0,
    y: initalPosition?.y ? initalPosition?.y : 0
  };
  const cursorPosition = { x: 0, y: 0 };

  // set inital position in ui dom
  useEffect(() => {
    const elem = draggableDivRef.current;
    if (!elem) return;

    elem.style.top = `${elementPosition.y}px`;
    elem.style.left = `${elementPosition.x}px`;
  }, []);

  function startDrag(e) {
    e.preventDefault();

    cursorPosition.x = e.clientX;
    cursorPosition.y = e.clientY;

    draggableDivRef.current.onmouseout = preventGoingOutside;
    document.onmouseup = closeDrag;
    document.onmousemove = dragElement;
  }

  function closeDrag(s) {
    console.log(s);
    document.onmouseup = null;
    document.onmousemove = null;
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
    // console.log(elementPosition, e);
  }

  function preventGoingOutside(e) {
    const videoContainer = e.path?.find((elem) => {
      if (!elem?.classList) return false;
      return [...elem?.classList]?.some((cls) => cls?.includes('videoContainer'));
    });
    const elemStyle = draggableDivRef.current;
    // top
    if (parseInt(elemStyle.style.top) < 0) {
      elemStyle.style.top = '0px';
      return closeDrag(1);
    }

    // bottom
    if (parseInt(elemStyle.style.top) + e.target.offsetHeight > videoContainer?.offsetHeight) {
      elemStyle.style.top = `${videoContainer?.offsetHeight - e.target.offsetHeight}px`;
      return closeDrag(2);
    }

    // left
    if (parseInt(elemStyle.style.left) < 0) {
      console.log(parseInt(elemStyle.style.left));
      elemStyle.style.left = '0px';
      return closeDrag(3);
    }

    // right
    if (parseInt(elemStyle.style.left) + e.target.offsetWidth > videoContainer?.offsetWidth) {
      elemStyle.style.left = `${videoContainer?.offsetWidth - e.target.offsetWidth}px`;
      return closeDrag(4);
    }
  }

  return {
    draggableDivRef,
    startDrag,
    dragElement
  };
}
