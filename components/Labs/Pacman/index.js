import { useRouter } from 'next/router';
import { useState } from 'react';
import LabsPageScreen from 'screens/LabsPageScreen';
import styles from '../labs.module.scss';
import { board, roomData } from '../Logic/labs.helper';
import usePacman from '../Logic/usePacman';
import Board from './Board';
import Controls from './Controls';

const PACMAN_HEIGHT_WIDTH = 35;

export default function Pacman() {
  const [showDoor, setShowDoor] = useState(0);
  const [goto, setGoto] = useState(0);
  const router = useRouter();

  const openLab = (route) => {
    setShowDoor(1);
    setGoto(route);
  };
  const closeLab = () => {
    setShowDoor(0);
    if (goto?.includes('html')) return router.push(goto);
    alert(goto);
  };

  const data = usePacman(PACMAN_HEIGHT_WIDTH, board, roomData, openLab);

  return (
    <>
      {showDoor ? <LabsPageScreen login={closeLab} /> : ''}
      <div className={styles.pacmanContainer}>
        <Controls {...data} />
        <Board {...data} />
      </div>
    </>
  );
}
