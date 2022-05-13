import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '@reach/menu-button/styles.css';
import Image from 'next/image';
import LeftArrow from '../../../public/images/bigarrowleft.png';
import DropDownSubMenu from '../DropDownSubmenu/index.js';
import { languages, preferences } from '../Logic/subMenu.helper.js';
import { useDropDownHandle } from '../Logic/useDropDownHandle.js';
import styles from '../nav.module.scss'

export default function RightDropDownMenu() {
  const { anchorEl, handleClick, handleClose, open } = useDropDownHandle();
  let today = new Date();
  let date = new Date().toUTCString().slice(5, 16);


  const{dropdown_menu_right,dropdown_menu_reverse} = styles

  let animationStyle;
  
  if(open === false){
    animationStyle=dropdown_menu_reverse
  }else{
    animationStyle= dropdown_menu_right
  }
  
  return (
    <>
      <Button
        disableRipple
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        onMouseEnter={handleClick}
        style={{
          height: '70px'
        }}>
        <Image src="/images/arrow2.png" alt="" height="20px" width="25px" />
      </Button>
      <Menu
        // {...languages}
        // {...preferences}
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        TransitionComponent={Fade}
        disableScrollLock={true}
        // className={`${styles.dropdown_menu_right}`}
        className={`${animationStyle}`}
        sx={{
          '& .MuiMenu-list': {
            // marginTop : '30px',
            color: 'var(--primary)',
            background: 'var(--header-bg)',
            padding: '2px',
            width: '250px',
            left: '45%'
          },
          '& .MuiMenuItem-root': {
            border: '1px solid var(--primary)',
            margin: '2px',
            justifyContent: 'flex-end',
            // alignItems: 'center',
            '&:hover': {
              background: 'var(--dark_one)',
              color: 'var(--primary)'
            }
          },
          '& .MuiPopover-paper': {
            width: '500px',
            height: '450px',
            background: 'transparent',
            boxShadow: 'none'
          }
        }}>
        <MenuItem
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: 'none',
            fontSize: '10px',
            alignItems: 'flex-end',
            backgroundColor: 'var(--header-bg)'
          }}
          className={`${styles.dropdown_item_1}`}
          >
          <p style={{ color: 'var(--background_body)' }}>{date}</p>
          <h2>Powered by Zicops</h2>
        </MenuItem>
        <MenuItem
        className={`${styles.dropdown_item_2}`}
        >
          {/* submenu for myDetails */}
          <DropDownSubMenu
            subData={languages}
            menuIcon={LeftArrow}
            submenutext="My Profile"
            arrowpositon="left"
            submenurowdirection={true}
          />
        </MenuItem>
        <MenuItem className={`dropdown-submenu-justifycontent-right ${styles.dropdown_item_3}`}>My Certificates</MenuItem>
        <MenuItem className={`dropdown-submenu-justifycontent-right ${styles.dropdown_item_4}`}>My Dashboard</MenuItem>
        <MenuItem
        className={`${styles.dropdown_item_5}`}
        >
          {/* submenu for support */}
          <DropDownSubMenu
            subData={preferences}
            menuIcon={LeftArrow}
            submenutext="Support"
            arrowpositon="left"
            submenurowdirection={true}
          />
        </MenuItem>
        <MenuItem className={`dropdown-submenu-justifycontent-right ${styles.dropdown_item_6}`}>Logout</MenuItem>
      </Menu>
    </>
  );
}
