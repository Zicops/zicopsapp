import { MenuList, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import '@reach/menu-button/styles.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import LeftArrow from '../../../public/images/bigarrowleft.png';
import DropDownSubMenu from '../DropDownSubmenu/index.js';
import { languages, preferences, userProfile } from '../Logic/subMenu.helper.js';
import { useDropDownHandle } from '../Logic/useDropDownHandle.js';
import styles from '../nav.module.scss';

export default function RightDropDownMenu() {
  const { anchorEl, handleClick, handleClose, open } = useDropDownHandle();
  let date = new Date().toUTCString().slice(5, 16);
  const router = useRouter();

  const menuItemList = [
    {
      id: 1,
      styles: {
        display: 'flex',
        flexDirection: 'column',
        border: 'none',
        fontSize: '10px',
        alignItems: 'flex-end',
        backgroundColor: 'var(--header-bg)',
        padding: '15px 10px'
      },
      comp: (
        <>
          <p style={{ color: 'var(--background_body)' }}>{date}</p>
          <h2>Powered by Zicops</h2>
        </>
      )
    },
    {
      id: 2,
      comp: (
        <DropDownSubMenu
          subData={userProfile}
          menuIcon={LeftArrow}
          submenutext="My Profile"
          arrowpositon="left"
          submenurowdirection={true}
        />
      ),
      onClick: () => {
        router.push('/my-profile?tabName=About', '/my-profile');
      }
    },
    { id: 3, class: 'dropdown-submenu-justifycontent-right', name: 'My Certificates' },
    { id: 4, class: 'dropdown-submenu-justifycontent-right', name: 'My Dashboard' },
    {
      id: 5,
      comp: (
        <DropDownSubMenu
          subData={preferences}
          menuIcon={LeftArrow}
          submenutext="Support"
          arrowpositon="left"
          submenurowdirection={true}
        />
      )
    },
    { id: 6, class: 'dropdown-submenu-justifycontent-right', name: 'Logout' }
  ];

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
        onMouseLeave={handleClose}
        style={{
          height: '70px'
        }}>
        <Image src="/images/arrow2.png" alt="" height="20px" width="25px" />
      </Button>

      {anchorEl && (
        <Paper
          sx={{
            position: 'absolute',
            top: '70px',
            right: '5px',
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
                      justifyContent: 'flex-end',
                      padding: '0px'
                    }
                  }}
                  onClick={item?.onClick ? item.onClick : () => {}}
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
            // background: 'var(--header-bg)',
            padding: '2px',
            width: '250px',
            left: '45%'
          },
          '& .MuiMenuItem-root': {
            border: '1px solid var(--primary)',
            // margin: '2px',
            backgroundColor: 'var(--header-bg)',
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
            boxShadow: 'none',
            paddingTop: '70px',
            top: '0px !important'
          }
        }}>
      <MenuItem
          className={`${styles.dropdown_item_1}`}
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
        <MenuItem className={`${styles.dropdown_item_2}`}>
          <DropDownSubMenu
            subData={languages}
            menuIcon={LeftArrow}
            submenutext="My Profile"
            arrowpositon="left"
            submenurowdirection={true}
          />
        </MenuItem>
        <MenuItem className={`dropdown-submenu-justifycontent-right ${styles.dropdown_item_3}`}>
          My Certificates
        </MenuItem>
        <MenuItem className={`dropdown-submenu-justifycontent-right ${styles.dropdown_item_4}`}>
          My Dashboard
        </MenuItem>
        <MenuItem className={`${styles.dropdown_item_5}`}>
          <DropDownSubMenu
            subData={preferences}
            menuIcon={LeftArrow}
            submenutext="Support"
            arrowpositon="left"
            submenurowdirection={true}
          />
        </MenuItem>
        <MenuItem className={`dropdown-submenu-justifycontent-right ${styles.dropdown_item_6}`}>
          Logout
        </MenuItem>
      </Menu> */}
    </>
  );
}
