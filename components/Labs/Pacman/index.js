import styles from '../labs.module.scss';
import { board, roomData } from '../Logic/labs.helper';
import usePacman from '../Logic/usePacman';
import Board from './Board';
import Controls from './Controls';

const PACMAN_HEIGHT_WIDTH = 35;

export default function Pacman() {
  const data = usePacman(PACMAN_HEIGHT_WIDTH, board, roomData);

  return (
    <div className={styles.pacmanContainer}>
      <Controls {...data} />
      <Board {...data} />
    </div>
  );
}
