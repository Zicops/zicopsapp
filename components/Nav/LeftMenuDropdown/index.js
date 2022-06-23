import Image from 'next/image';
import '@reach/menu-button/styles.css';
import { useDropDownHandle } from '../Logic/useDropDownHandle.js';
import { MenuList, Paper } from '@mui/material';

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
  const menuItemList = [
    { id: 1, class: 'dropdown-submenu-justifycontent-right', name: 'My Certificates' },
    { id: 2, class: 'dropdown-submenu-justifycontent-right', name: 'My Dashboard' },
    {
      id: 3,
      comp: (
        <DropDownSubMenu
          subData={preferences}
          menuIcon={RightArrow}
          submenutext="Support"
          arrowpositon="right"
          submenurowdirection={true}
        />
      )
    },
    { id: 4, class: 'dropdown-submenu-justifycontent-right', name: 'Logout' }
  ];
  const time = new Date();
  return (
    <>
      <MyButton
        id="fade-button"
        style={{ height: '70px' }}
        handleClick={handleClick}
        handleClose={handleClose}>
        <Image src={navmenuicon} alt="" height="15px" width="20px" />
      </MyButton>

      <Menu
        // {...languages}
        // {...preferences}
        // id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onMouseLeave={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        TransitionComponent={Fade}
        disableScrollLock={true}
        sx={{
          '& .MuiMenu-list': {
            // marginTop : '30px',
            color: 'var(--primary)',
            background: 'transparent',
            padding: '2px',
            width: '250px'
          },
          '& .MuiMenuItem-root': {
            border: '1px solid var(--primary)',
            // margin: '2px',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
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
        <MenuItem onSelect={() => alert('Languages')} className={`${styles[`dropdown_item_1`]}`}>
          <DropDownSubMenu
            subData={languages}
            menuIcon={RightArrow}
            submenutext="Language"
            arrowpositon="right"
            submenurowdirection={false}
          />
        </MenuItem>
        <MenuItem onSelect={() => alert('Preferences')} className={`${styles[`dropdown_item_2`]}`}>
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
            padding: '7px 10px'
          }}
          className={`${styles.LeftDropdownR_admin} ${styles[`dropdown_item_3`]}`}>
          {!isAdmin ? 'Switch to Admin' : 'Switch to Learner'}
        </MenuItem>
      </Menu>
      {/* <MenuList
        autoFocusItem={open}
        id="composition-menu"
        aria-labelledby="composition-button"
        style={{ padding: 0 }}
        onMouseLeave={handleClose}
        onKeyDown={handleClick}>
        {menuItemList.map((item) => {
          return (
            <MenuItem
              key={item.id}
              sx={{
                '&.MuiMenuItem-root': {
                  border: '1px solid var(--primary)',
                  margin: '2px',
                  backgroundColor: 'var(--header-bg)',
                  justifyContent: 'flex-end',
                  padding: '0px'
                }
              }}
              style={item.styles ? item.styles : {}}
            className={`${item.class} ${styles[`dropdown_item_${item.id}`]}`}
            >
              {item.name ? item.name : item.comp}
            </MenuItem>
          );
        })}
      </MenuList> */}
    </>
  );
}
