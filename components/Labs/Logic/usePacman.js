import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styles from '../labs.module.scss';

export default function usePacman(PACMAN_HEIGHT_WIDTH, board, roomData) {
  const pacmanRef = useRef(null);
  const [activeRoom, setActiveRoom] = useState(null);
  const [activeBtn, setActiveBtn] = useState(null);

  const router = useRouter();

  // pac man positions,  should be multiples of PACMAN_HEIGHT_WIDTH constant
  const firstRowValueIndex = board.findIndex((row, i) => row[0] === 1);
  const firstColValueIndex = board[firstRowValueIndex].findIndex((row) => row === 1);

  // x is coordinate from top
  // y is coordinate from left
  // top is width from top in pixels which should be multiple of PACMAN_HEIGHT_WIDTH constant
  // left is width from left in pixels which should be multiple of PACMAN_HEIGHT_WIDTH constant
  const [pacmanData, setPacmanData] = useState({
    x: firstRowValueIndex,
    y: firstColValueIndex,
    top: firstRowValueIndex * PACMAN_HEIGHT_WIDTH,
    left: firstColValueIndex * PACMAN_HEIGHT_WIDTH
  });

  // number of rows and cols of board grid
  const rows = board.length;
  const cols = board[0].length;

  // save active room in ref so that latest state value is available in callback function instead of stale state
  useEffect(() => {
    if (!pacmanRef.current) return;

    pacmanRef.current.activeRoom = activeRoom;
  }, [activeRoom]);

  // reset display none to ''
  useEffect(() => {
    if (!pacmanRef?.current?.style?.display) return;

    setTimeout(() => {
      pacmanRef.current.style.display = '';
    }, 0);
  }, [pacmanData]);

  // activate keydown evt listner
  useEffect(() => {
    if (!pacmanRef.current) return;

    function movePacman(e) {
      if (e.key.includes('Arrow')) e.preventDefault();

      if (e.key === 'ArrowUp') updateState(-1, 0, -PACMAN_HEIGHT_WIDTH, 0, 0);
      if (e.key === 'ArrowDown') updateState(1, 0, PACMAN_HEIGHT_WIDTH, 0, 2);
      if (e.key === 'ArrowLeft') updateState(0, -1, 0, -PACMAN_HEIGHT_WIDTH, 1);
      if (e.key === 'ArrowRight') updateState(0, 1, 0, PACMAN_HEIGHT_WIDTH, 3);

      if (e.key === 'Enter' && pacmanRef.current?.activeRoom) onRoomClick();
    }

    document.addEventListener('keydown', movePacman);

    return () => document?.removeEventListener('keydown', movePacman);
  }, [pacmanRef.current]);

  // reset active btn state to null after few seconds
  useEffect(() => {
    if (activeBtn == null) return;
    let timer = null;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setActiveBtn(null);
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeBtn]);

  function onRoomClick(route = null) {
    if (!route) route = pacmanRef?.current?.activeRoom?.route;
    if (route?.includes('html')) return router.push(route);

    alert(route);
  }

  function removePreviousDirections() {
    pacmanRef.current?.classList.remove(styles.up);
    pacmanRef.current?.classList.remove(styles.down);
    pacmanRef.current?.classList.remove(styles.left);
    pacmanRef.current?.classList.remove(styles.right);

    pacmanRef.current?.classList.add(styles.animate);

    setTimeout(() => pacmanRef.current?.classList.remove(styles.animate), 500);
  }

  function teleport(_x, _y, prev) {
    const isLeft = _y < 0;
    const isRight = _y === cols;

    const isTop = _x < 0;
    const isBottom = _x === rows;

    if (!(isLeft || isRight || isBottom || isTop)) return null;

    let newData = { ...prev };
    pacmanRef.current.style.display = 'none';
    if (isLeft) {
      newData.y = cols - 1;
      newData.left = PACMAN_HEIGHT_WIDTH * (cols - 1);
    }
    if (isTop) {
      newData.x = rows - 1;
      newData.top = PACMAN_HEIGHT_WIDTH * (rows - 1);
    }
    if (isRight) {
      newData.y = 0;
      newData.left = 0;
    }
    if (isBottom) {
      newData.x = 0;
      newData.top = 0;
    }

    return { ...prev, ...newData };
  }

  // update the pacman location and other related states
  function updateState(aX = 0, aY = 0, aTop = 0, aLeft = 0, index) {
    setPacmanData((prev) => {
      const { top, left, x, y } = prev;

      // udpate the pacman face direction
      removePreviousDirections();
      if (x < x + aX) pacmanRef.current?.classList.add(styles.down);
      if (x > x + aX) pacmanRef.current?.classList.add(styles.up);
      if (y < y + aY) pacmanRef.current?.classList.add(styles.right);
      if (y > y + aY) pacmanRef.current?.classList.add(styles.left);

      // corner wall teleportation
      const isTeleporting = teleport(x + aX, y + aY, prev);
      if (isTeleporting) return isTeleporting;

      if (x + aX < 0 || x + aX >= rows) return prev;
      if (y + aY < 0 || y + aY >= cols) return prev;

      const boardValue = board[x + aX][y + aY];
      if (![1, 4].includes(boardValue)) return prev;

      if (boardValue === 4) {
        const room = roomData.filter((room) => room.x === x + aX && room.y === y + aY)[0];
        setActiveRoom(room);

        // face pacman towards the room image
        removePreviousDirections();
        pacmanRef.current?.classList.add(x + aX < 4 ? styles.up : styles.down);
      } else {
        setActiveRoom(null);
      }

      return { ...prev, x: x + aX, y: y + aY, top: top + aTop, left: left + aLeft };
    });

    setActiveBtn(index);
  }

  // set updateState on btn click
  function handleClick(e, index) {
    if (index === 0) updateState(-1, 0, -PACMAN_HEIGHT_WIDTH, 0, index);
    if (index === 2) updateState(1, 0, PACMAN_HEIGHT_WIDTH, 0, index);
    if (index === 1) updateState(0, -1, 0, -PACMAN_HEIGHT_WIDTH, index);
    if (index === 3) updateState(0, 1, 0, PACMAN_HEIGHT_WIDTH, index);
  }

  return {
    board,
    rows,
    cols,
    pacmanRef,
    pacmanData,
    roomData,
    activeRoom,
    handleClick,
    activeBtn,
    onRoomClick
  };
}
