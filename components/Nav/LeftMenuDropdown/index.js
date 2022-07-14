import '@reach/menu-button/styles.css';
import Image from 'next/image';
import { useDropDownHandle } from '../Logic/useDropDownHandle.js';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { MenuList, Paper } from '@mui/material';

import { useContext } from 'react';
import RightArrow from '../../../public/images/bigarrowright.png';
import { userContext } from '../../../state/contexts/UserContext';
import DropDownSubMenu from '../DropDownSubmenu/index.js';
import { languages, preferences } from '../Logic/subMenu.helper.js';
import styles from '../nav.module.scss';
export default function LeftMenuDropdown() {
  const { isAdmin } = useContext(userContext);
  const { anchorEl, handleClick, handleClose, open, gotoAdmin, gotoUser } = useDropDownHandle();

  const menuItemList = [
    {
      id: 1,
      comp: (
        <DropDownSubMenu
          subData={languages}
          menuIcon={RightArrow}
          submenutext="Language"
          arrowpositon="right"
          submenurowdirection={false}
        />
      )
    },
    {
      id: 2,
      comp: (
        <DropDownSubMenu
          subData={preferences}
          menuIcon={RightArrow}
          submenutext="Preferences"
          arrowpositon="right"
          submenurowdirection={false}
        />
      )
    },
    {
      id: 3,
      styles: {
        display: 'flex',
        flexDirection: 'column',
        border: 'solid 1px #6bcfcf',
        fontSize: '16px',
        alignItems: 'flex-start',
        backgroundColor: 'var(--header-bg)',
        padding: '10px 10px'
      },
      comp: (
        <Link href={!isAdmin ? '/' : '/admin'}>
          <a onClick={!isAdmin ? gotoAdmin : gotoUser}>
            {!isAdmin ? 'Switch to Admin' : 'Switch to Learner'}
          </a>
        </Link>
      )
    }
  ];

  return (
    <>
      {/* <MyButton
        id="fade-button"
        style={{ height: '70px' }}
        handleClick={handleClick}
        handleClose={handleClose}>
        <Image src={navmenuicon} alt="" height="15px" width="20px" />
      </MyButton> */}

      <Button
        disableRipple
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        onMouseEnter={handleClick}
        onMouseLeave={handleClose}
        style={{
          height: '70px'
        }}>
        <Image src="/images/menu.png" alt="" height="20px" width="25px" />
      </Button>

      {anchorEl && (
        <Paper
          sx={{
            position: 'absolute',
            top: '70px',
            left: '20px',
            padding: '0px',
            background: 'transparent'
          }}>
          <MenuList
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
                      // margin: '2px',
                      backgroundColor: 'var(--header-bg)',
                      justifyContent: 'flex-start',
                      padding: '0px'
                    }
                  }}
                  style={item.styles ? item.styles : {}}
                  className={`${item.class} ${styles[`dropdown_item_${item.id}`]}`}>
                  {item.name ? item.name : item.comp}
                </MenuItem>
              );
            })}
          </MenuList>
        </Paper>
      )}

      {/* <Menu
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
      </Menu> */}
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
