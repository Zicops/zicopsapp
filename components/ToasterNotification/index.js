import styles from './toasterNotification.module.scss';
import Toast from './Toast';
import { useState } from 'react';
import { BUTTON_PROPS } from './Logic/ToasterNotification.helper';
import Button from './Button';

const ToasterNotification = () => {
  const [list, setList] = useState([]);
  let toastProperties;

  const showToast = (type) => {
    const id = Math.floor(Math.random() * 101 + 1);

    switch (type) {
      case 'success':
        toastProperties = {
          id,
          title: 'Success',
          description: 'This is a success toast component'
        };
        break;
      case 'danger':
        toastProperties = {
          id,
          title: 'Danger',
          description: 'This is a error toast component'
        };
        break;
      case 'info':
        toastProperties = {
          id,
          title: 'Info',
          description: 'This is an info toast component'
        };
        break;
      case 'warning':
        toastProperties = {
          id,
          title: 'Warning',
          description: 'This is a warning toast component'
        };
        break;

      default:
        setList([]);
    }

    setList([...list, toastProperties]);
  };
  return (
    <>
      <div className={`${styles.toast_buttons}`}>
        {BUTTON_PROPS.map((item) => (
          <Button
            key={item.id}
            className={`${item.className}`}
            label={item.label}
            handleClick={() => showToast(item.type)}
          />
        ))}
      </div>
      <Toast toastList={list} />
    </>
  );
};

export default ToasterNotification;
