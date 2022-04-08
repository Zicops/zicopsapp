import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink
} from '@reach/menu-button';
import Image from 'next/image';
import '@reach/menu-button/styles.css';

export default function LeftMenuDropdown({ isAdmin, handleClick }) {
  const { gotoAdmin, gotoUser } = handleClick;

  return (
    <>
      <Menu className="left_menu2">
        <MenuButton style={styles.menuBtnStyles}>
          <span aria-hidden>
            <Image src="/images/menu.png" alt="left menu" width={30} height={20} />
          </span>
        </MenuButton>

        <MenuList style={styles.menuListStyle}>
          <MenuItem
            className="menuitems"
            style={styles.menuItemStyles}
            onSelect={() => alert('Languages')}>
            Language
          </MenuItem>
          <MenuItem
            className="menuitems"
            style={styles.menuItemStyles}
            onSelect={() => alert('Preferences')}>
            Preferences
          </MenuItem>
          <MenuItem
            className="menuitems"
            style={styles.menuItemStyles}
            onSelect={() => (isAdmin ? gotoUser() : gotoAdmin())}>
            {isAdmin ? 'Switch to Learner' : 'Switch to Admin'}
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

const styles = {
  menuBtnStyles: {
    backgroundColor: 'transparent',
    border: 0,
    outline: 0,
    width: '50px'
  },

  menuListStyle: {
    backgroundColor: 'var(--dark_two)',
    marginTop: '20px',
    padding: 0,
    fontSize: '16px',
    width: '250px',
    position: 'absolute',
    zIndex: 9999
  },

  menuItemStyles: {
    color: 'var(--primary)',
    backgroundColor: 'var(--dark_two)',
    border: '1px solid var(--primary)',
    padding: '8px',
    margin: '3px'
  }
};
