import { useEffect, useRef, useState } from 'react';
import styles from '../labs.module.scss';

export default function usePacman(PACMAN_HEIGHT_WIDTH) {
  const pacmanRef = useRef(null);
  const [activeRoom, setActiveRoom] = useState(null);
  const [activeBtn, setActiveBtn] = useState(null);

  // 0 is room
  // 1 is path
  // 2 is wall blocks
  // 3 is room entrance
  // 4 is door so that entrace cell is visible
  const board = [
    [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 3, 0, 2, 2, 2, 2, 0, 0, 3, 0, 1, 2, 2, 2, 2, 1, 0, 0, 3, 0, 2, 2, 2, 2, 0, 0, 3, 0],
    [1, 1, 4, 1, 2, 2, 2, 2, 1, 1, 4, 1, 1, 2, 2, 2, 2, 1, 1, 1, 4, 1, 2, 2, 2, 2, 1, 1, 4, 1],
    [2, 2, 2, 1, 1, 1, 1, 4, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 4, 1, 1, 1, 2, 2, 2],
    [2, 2, 2, 1, 1, 0, 0, 3, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 0, 1, 1, 2, 2, 2],
    [2, 2, 2, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 1, 2, 2, 2],
    [2, 2, 2, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 1, 2, 2, 2],
    [2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 2],
    [1, 1, 4, 1, 2, 2, 2, 2, 1, 1, 4, 1, 1, 2, 2, 2, 2, 1, 1, 1, 4, 1, 2, 2, 2, 2, 1, 1, 4, 1],
    [0, 0, 3, 0, 2, 2, 2, 2, 0, 0, 3, 0, 1, 2, 2, 2, 2, 1, 0, 0, 3, 0, 2, 2, 2, 2, 0, 0, 3, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0]
  ];

  const roomData = [
    { id: 0, img: '/images/dnd1.jpg', route: '/c', x: 2, y: 2 },
    { id: 1, img: '/images/dnd2.jpg', route: '/css', x: 2, y: 10 },
    { id: 2, img: '/images/dnd1.jpg', route: '/blizJs', x: 2, y: 20 },
    { id: 3, img: '/images/dnd3.jpg', route: '/redwoodJs', x: 2, y: 28 },
    { id: 4, img: '/images/dnd1.jpg', route: '/golang', x: 5, y: 7 },
    { id: 5, img: '/images/dnd2.jpg', route: '/c++', x: 5, y: 23 },
    { id: 6, img: '/images/dnd1.jpg', route: '/rust', x: 10, y: 2 },
    { id: 7, img: '/images/dnd3.jpg', route: '/angularJs', x: 10, y: 10 },
    { id: 8, img: '/images/dnd1.jpg', route: '/reactJs', x: 10, y: 20 },
    { id: 9, img: '/images/dnd3.jpg', route: '/php', x: 10, y: 28 }
  ];

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

  // activate keydown evt listner
  useEffect(() => {
    if (!pacmanRef.current) return;

    document.addEventListener('keydown', (e) => {
      if (e.key.includes('Arrow')) e.preventDefault();

      if (e.key === 'ArrowUp') updateState(-1, 0, -PACMAN_HEIGHT_WIDTH, 0, 0);
      if (e.key === 'ArrowDown') updateState(1, 0, PACMAN_HEIGHT_WIDTH, 0, 2);
      if (e.key === 'ArrowLeft') updateState(0, -1, 0, -PACMAN_HEIGHT_WIDTH, 1);
      if (e.key === 'ArrowRight') updateState(0, 1, 0, PACMAN_HEIGHT_WIDTH, 3);

      if (e.key === 'Enter' && pacmanRef.current?.activeRoom)
        alert(pacmanRef.current?.activeRoom?.route);
    });
  }, []);

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

  function removePreviousDirections() {
    pacmanRef.current?.classList.remove(styles.up);
    pacmanRef.current?.classList.remove(styles.down);
    pacmanRef.current?.classList.remove(styles.left);
    pacmanRef.current?.classList.remove(styles.right);

    pacmanRef.current?.classList.add(styles.animate);

    setTimeout(() => pacmanRef.current?.classList.remove(styles.animate), 500);
  }

  // update the pacman location and other related states
  function updateState(aX = 0, aY = 0, aTop = 0, aLeft = 0, index) {
    setPacmanData((prev) => {
      const { top, left, x, y } = prev;

      removePreviousDirections();
      if (x < x + aX) pacmanRef.current?.classList.add(styles.down);
      if (x > x + aX) pacmanRef.current?.classList.add(styles.up);
      if (y < y + aY) pacmanRef.current?.classList.add(styles.right);
      if (y > y + aY) pacmanRef.current?.classList.add(styles.left);

      if (x + aX < 0 || x + aX >= rows) return prev;
      if (y + aY < 0 || y + aY >= cols) return prev;

      const boardValue = board[x + aX][y + aY];
      if (![1, 3, 4].includes(boardValue)) return prev;

      if (boardValue === 3) {
        const room = roomData.filter((room) => room.x === x + aX && room.y === y + aY)[0];
        setActiveRoom(room);
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

  return { board, rows, cols, pacmanRef, pacmanData, roomData, activeRoom, handleClick, activeBtn };
}
