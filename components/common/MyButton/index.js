import Button from '@mui/material/Button';

const MyButton = ({ id, style, handleClick, handleClose, children }) => {
  return (
    <Button
      disableRipple
      id={id}
      // aria-controls={open ? 'fade-menu' : undefined}
      // aria-haspopup="true"
      // aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      onMouseEnter={handleClick}
      // onMouseLeave={handleClose}
      style={style}>
      {children}
    </Button>
  );
};
 
export default MyButton;