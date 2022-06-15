import styles from '../labs.module.scss';

export default function Board(props) {
  const {
    board,
    rows,
    cols,
    activeRoom,
    pacmanRef,
    roomData,
    pacmanData: { top, left }
  } = props;

  let roomIndex = -1;

  return (
    <>
      <div className={styles.board} style={{ gridTemplateColumns: `repeat(${rows}, auto)` }}>
        {/* pacman spirit */}
        <div
          ref={pacmanRef}
          className={`${styles.pacman}`}
          style={{ top: `${top}px`, left: `${left}px` }}></div>

        {board.map((row, i) => (
          <div key={i} className={`${styles.row}`} style={{ gridColumnEnd: rows }}>
            {row.map((cell, j) => {
              if (cell === 3) roomIndex++;

              // saved locally so that scoped variable will refer to this value and not global value
              const index = roomIndex;

              return (
                <div
                  className={`${styles.cell} ${cell === 0 ? styles.room : ''} ${
                    [1, 4].includes(cell) ? styles.path : ''
                  } ${cell === 2 ? styles.blocked : ''} ${cell === 3 ? styles.imgContainer : ''} ${
                    cell === 4 ? styles.roomDoor : ''
                  } ${
                    [1, 4].includes(cell) &&
                    ([0, rows - 1].includes(i) || [0, cols - 1].includes(j))
                      ? styles.edgeCell
                      : ''
                  }`}
                  key={`${i}-${j}`}>
                  {/* render image */}
                  {cell === 3 && (
                    <div
                      className={`${styles.container} ${i < 5 ? styles.fromBottom : ''} ${
                        activeRoom?.id === index ? styles.activeRoom : ''
                      }`}
                      onClick={() => {
                        alert(roomData[index].route);
                      }}>
                      <img src={roomData[roomIndex].img} alt="" />

                      {/* on hover  */}
                      <div className={styles.overlay}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}
