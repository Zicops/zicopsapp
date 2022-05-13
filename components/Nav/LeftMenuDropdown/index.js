import Image from 'next/image';
import '@reach/menu-button/styles.css';
import { useDropDownHandle } from '../Logic/useDropDownHandle.js';

import Button from '@mui/material/Button';
import MyButton from '../../common/MyButton/index.js';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import { useContext } from 'react';
import { userContext } from '../../../state/contexts/UserContext';

import DropDownSubMenu from '../DropDownSubmenu/index.js';
import { languages, preferences } from '../Logic/subMenu.helper.js';
import RightArrow from '../../../public/images/bigarrowright.png';
import styles from '../nav.module.scss';

export default function LeftMenuDropdown({ navmenuicon }) {
  const { isAdmin, makeAdmin } = useContext(userContext);
  const { anchorEl, handleClick, handleClose, open, gotoAdmin, gotoUser } = useDropDownHandle(
    isAdmin,
    makeAdmin
  );

  const time = new Date();
  return (
    <>
      <MyButton id="fade-button" style={{ height: '70px' }} handleClick={handleClick}>
        <Image src={navmenuicon} alt="" height="20px" width="30px" />
      </MyButton>
      {/* <Button
      // {...navmenuicon}
        disableRipple
        // id="fade-button"
        // aria-controls={open ? 'fade-menu' : undefined}
        // aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        onMouseEnter={handleClick}
        style={{
          height: '70px'
        }}>
        <Image src={navmenuicon} alt="" height="20px" width="30px" />
      </Button> */}
      <Menu
        {...languages}
        {...preferences}
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        TransitionComponent={Fade}
        disableScrollLock={true}
        className={`${styles.dropdown_menu}`}
        sx={{
          '& .MuiMenu-list': {
            // marginTop : '30px',
            color: 'var(--primary)',
            background: 'var(--dark_two)',
            padding: '2px',
            width: '250px'
          },
          '& .MuiMenuItem-root': {
            border: '1px solid var(--primary)',
            margin: '2px',
            justifyContent: 'space-between',
            alignItems: 'center',
            '&:hover': {
              background: 'var(--dark_one)',
              color: 'var(--primary)'
            }
          },
          '& .MuiPopover-paper': {
            width: '500px',
            height: '400px',
            background: 'transparent',
            boxShadow: 'none'
          }
        }}>
        <MenuItem onSelect={() => alert('Languages')} className={`${styles.dropdown_item_1}`}>
          {/* Language */}
          <DropDownSubMenu
            subData={languages}
            menuIcon={RightArrow}
            submenutext="Language"
            arrowpositon="right"
            submenurowdirection={false}
          />
        </MenuItem>
        <MenuItem onSelect={() => alert('Preferences')} className={`${styles.dropdown_item_2}`}>
          <DropDownSubMenu
            subData={preferences}
            menuIcon={RightArrow}
            submenutext="Preferences"
            arrowpositon="right"
            submenurowdirection={false}
          />
        </MenuItem>
        <MenuItem
          as="a"
          href={!isAdmin ? '/' : '/admin'}
          onClick={!isAdmin ? gotoAdmin : gotoUser}
          style={{
            border: '1px solid var(--primary)',
            margin: '2px'
          }}
          className={`${styles.LeftDropdownR_admin} ${styles.dropdown_item_3}`}>
          {!isAdmin ? 'Switch to Admin' : 'Switch to Learner'}
        </MenuItem>
      </Menu>
    </>
  );
}
