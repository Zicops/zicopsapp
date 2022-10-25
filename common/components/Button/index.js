import React from 'react';
import styles from './orgButton.module.scss';

const Button = ({
  children,
  isLoading,
  isDisabled,
  isError,
  styleClass,
  clickHandler,
  size = 'small',
  theme = 'light',
  isBold
}) => {
  const customStyle = {};
  if (size === 'small') customStyle.width = '25%';
  if (size === 'medium') customStyle.width = '75%';
  if (size === 'large') customStyle.width = '100%';
  if (isBold === 'bold') customStyle.fontWeight = 600;

  return (
    <button
      style={customStyle}
      onClick={clickHandler}
      disabled={isDisabled}
      className={`${styles.basicButton} ${
        theme.toLowerCase() === 'dark' ? styles?.btnDark : styles?.btnPrimary
      }`}>
      {children}
    </button>
  );
};

export default Button;
