import Image from 'next/image';
import '@reach/menu-button/styles.css';
import { useDropDownHandle } from '../Logic/useDropDownHandle.js';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import styles from '../nav.module.scss';

import DropDownSubMenu from '../DropDownSubmenu/index.js';

import { languages, preferences } from '../Logic/subMenu.helper.js'; 

import LeftArrow from '../../../public/images/bigarrowleft.png'

import LeftMenuDropdown from '../LeftMenuDropdown/index.js'

import DownArrowIcon from '../../../public/images/arrow2.png'

export default function RightDropDownMenu() {

  const { anchorEl, handleClick, handleClose, open } = useDropDownHandle();
  let today = new Date();
  let date = new Date().toUTCString().slice(5, 16); 

  return (
    <>
      {/* <LeftMenuDropdown navmenuicon={DownArrowIcon} /> */}

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
            // justifyContent: 'space-between',
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
        }}
        >
        <MenuItem
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: 'none',
            fontSize: '10px',
            alignItems: 'flex-end',
            backgroundColor: 'var(--header-bg)'
          }}>
          <p style={{ color: 'var(--background_body)' }}>{date}</p>
          <h2>Powered by Zicops</h2>
        </MenuItem>
        <MenuItem>
        {/* submenu for myDetails */}
          <DropDownSubMenu
            subData={languages}
            menuIcon={LeftArrow}
            submenutext="My Profile"
            arrowpositon="left"
            submenurowdirection={true}
          />
        </MenuItem>
        <MenuItem className="dropdown-submenu-justifycontent-right">My Certificates</MenuItem>
        <MenuItem className="dropdown-submenu-justifycontent-right">My Dashboard</MenuItem>
        <MenuItem>
        {/* submenu for support */}
          <DropDownSubMenu
            subData={preferences}
            menuIcon={LeftArrow}
            submenutext="Support"
            arrowpositon="left"
            submenurowdirection={true}
          />
        </MenuItem>
        <MenuItem className="dropdown-submenu-justifycontent-right">Logout</MenuItem>
      </Menu>
    </>
  );
}
