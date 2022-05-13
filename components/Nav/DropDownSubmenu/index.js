import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Image from 'next/image';

import { useDropDownSubmenuHandle } from '../Logic/useDropDownSubmenuHandle';

import styles from '../nav.module.scss'

export default function DropDownSubMenu({ subData, menuIcon, submenutext, arrowpositon, submenurowdirection}) {
  const { ref, menuProps, toggleMenu } = useDropDownSubmenuHandle();

  return (
    <>
      <div style={{ width: '100%' }}>
        <div
          className={`dropdown-submenu-justifycontent-space-between`}
          ref={ref}
          onMouseEnter={() => toggleMenu(true)}
          onMouseLeave={() => toggleMenu(false)}
          onClose={() => toggleMenu(false)}>
          {!submenurowdirection && submenutext}
          <div style={{margin: '4px 0 -4px'}}>
          <Image src={menuIcon} alt="" height={17} width={15} />
          </div>
          {submenurowdirection && submenutext}
        </div>
        <ControlledMenu
          {...subData}
          {...menuProps}
          onMouseEnter={() => toggleMenu(true)}
          onMouseLeave={() => toggleMenu(false)}
          onClose={() => toggleMenu(false)}
          anchorRef={ref}
          align={'start'}
          arrow={true}
          direction={arrowpositon}
          position={'initial'}
          viewScroll={'initial'}
          className={`${styles.dropdown_menu}`}
          >
          {subData.map((elements,index) => {
            const { title, link } = elements;
            const addStyles = styles+index;
            return (
              <MenuItem key={title}
                style={{
                  border: '1px solid var(--primary)',
                  margin: '2px',
                  // background: 'var(--dark_one)'
                }}
                className={`${styles.dropdown_item_1}`}
                >
                {title}
              </MenuItem>
            );
          })}
        </ControlledMenu>
      </div>
      <style jsx>{`
        .dropdown-submenu-justifycontent-space-between {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </>
  );
}
