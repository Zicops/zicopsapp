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
                  className={`${styles.cell} ${cell === 0 ? styles.room : ''} 
                  ${[1, 4].includes(cell) ? styles.path : ''} 
                  ${cell === 2 ? styles.blocked : ''} 
                  ${cell === 3 ? styles.imgContainer : ''} 
                  ${cell === 5 ? styles.squareImgContainer : ''} 
                  ${cell === 6 ? styles.rectImgContainer : ''} 
                  ${cell === 7 ? styles.smallSquareImgContainer : ''} 
                  ${cell === 4 ? styles.roomDoor : ''} 
                  ${
                    [1, 4].includes(cell) &&
                    ([0, rows - 1].includes(i) || [0, cols - 1].includes(j))
                      ? styles.edgeCell
                      : ''
                  }`}
                  key={`${i}-${j}`}>
                  {/* render room image */}
                  {[3].includes(cell) && (
                    <div
                      className={`${styles.container} 
                      ${styles.roomBorder}

                      ${i < 5 ? styles.topSide : ''}
                      ${j < 5 ? styles.leftSide : ''}

                      ${j > row?.length - 5 ? styles.rightSide : ''}
                      ${i > board?.length - 5 ? styles.bottomSide : ''}
                      
                      ${activeRoom?.id === index ? styles.activeRoom : ''}
                      ${i === 5 ? styles.longImg : ''}`}
                      onClick={() => {
                        alert(roomData[index].route);
                      }}>
                      {roomData[roomIndex]?.img && <img src={roomData[roomIndex].img} alt="" />}

                      {/* on hover  */}
                      <div className={styles.overlay}></div>
                    </div>
                  )}

                  {/* render square empty rooms */}
                  {[5].includes(cell) && (
                    <div
                      className={`${styles.img} ${styles.roomBorder} ${i < 5 ? styles.topSide : ''} 
                      ${i > board?.length - 5 ? styles.bottomSide : ''}`}></div>
                  )}

                  {/* render rect empty rooms */}
                  {[6].includes(cell) && (
                    <div className={`${styles.img} ${styles.roomBorder}`}></div>
                  )}

                  {/* render small square empty rooms */}
                  {[7].includes(cell) && (
                    <div className={`${styles.img} ${styles.roomBorder}`}></div>
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
