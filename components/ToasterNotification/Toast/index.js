import styles from './toast.module.scss';
import { useState, useEffect } from 'react';

const Toast = (props) => {
  const { toastList } = props;
  const [list, setList] = useState(toastList);

  function deleteItem(id) {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  }

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  return (
    <>
      <div className={`${styles.toasterContainer} ${styles.bottom_left}`}>
        {list.map((item, i) => (
          <div className={`${styles.toasterInnerContainer} ${styles.bottom_left}`} key={i}>
            <div className={`${styles.t_container}`}>
              <div className={`${styles.toasterTitle}`}>{item.title}</div>
              <div className={`${styles.toasterText}`}>{item.description}</div>
            </div>

            <button onClick={() => deleteItem(i)}>X</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Toast;
