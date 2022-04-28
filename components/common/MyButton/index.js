import Button from '@mui/material/Button';

const MyButton = ({id, style, handleClick, children}) => {
    return (
      <Button
        disableRipple
        id={id}
        // aria-controls={open ? 'fade-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        onMouseEnter={handleClick}
        style={style}>
        {children}
      </Button>
    );
}
 
export default MyButton;