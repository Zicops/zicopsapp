import { useState } from 'react';
import Image from 'next/image';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";



export default function FadeMenu() {

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>

      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        onMouseEnter={handleClick}
        style={{
            height: '70px'
          }}
      >
        {/* <MenuIcon /> */}
        <Image src='/images/menu.png' alt='' height='20px' width='30px'/>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        TransitionComponent={Fade}
        sx={{
          '& .MuiMenu-list': {
            // marginTop : '30px',
            color: 'var(--primary)',
            background: 'var(--dark_two)',
            padding: '2px',
            width: '250px'
          },
          '& .MuiMenuItem-root': {
            border: "1px solid var(--primary)",
            margin: "2px",
            '&:hover': {
              background: 'var(--dark_one)',
              color: 'var(--primary)'
            }
          }
        }}
      >
        <MenuItem onClick={handleClose} >
          Language
        </MenuItem>
        <MenuItem onClick={handleClose} >
          Preferences
        </MenuItem>
        <MenuItem onClick={handleClose} >
          {0 ? "Switch to Admin" : "Switch to Learner"}
        </MenuItem>
      </Menu>

    </>
  );
}
