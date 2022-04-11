import Image from 'next/image';
import '@reach/menu-button/styles.css';
import { useDropDownHandle } from '../Logic/useDropDownHandle.js';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import { useContext } from 'react';

import { userContext } from '../../../state/contexts/UserContext';

import LeftDropDownSubMenu from '../LeftDropDownSubmenu/index.js';

import { languages, preferences } from '../Logic/subMenu.helper.js';

export default function LeftMenuDropdown() {
  const { isAdmin, makeAdmin } = useContext(userContext);
  const { anchorEl, handleClick, handleClose, open, gotoAdmin, gotoUser } = useDropDownHandle(
    isAdmin,
    makeAdmin
  );

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
        <Image src="/images/menu.png" alt="" height="20px" width="30px" />
      </Button>
      <Menu
        {...languages}
        {...preferences}
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
        <MenuItem onSelect={() => alert('Languages')}>
          Language
          <LeftDropDownSubMenu subData={languages} />
        </MenuItem>
        <MenuItem onSelect={() => alert('Preferences')}>
          Preferences
          <LeftDropDownSubMenu subData={preferences} />
        </MenuItem>
        <MenuItem
          as="a"
          href={!isAdmin ? '/' : '/admin'}
          onClick={!isAdmin ? gotoAdmin : gotoUser}
          style={{
            border: '1px solid var(--primary)',
            margin: '2px'
          }}
          className="LeftDropdownR-admin">
          {!isAdmin ? 'Switch to Admin' : 'Switch to Learner'}
        </MenuItem>
      </Menu>
    </>
  );
}
