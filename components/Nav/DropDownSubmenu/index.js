import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Image from 'next/image';
import styles from '../nav.module.scss';

import { useDropDownSubmenuHandle } from '../Logic/useDropDownSubmenuHandle';

export default function DropDownSubMenu({
  subData,
  menuIcon,
  submenutext,
  arrowpositon,
  submenurowdirection
}) {
  const { ref, menuProps, toggleMenu } = useDropDownSubmenuHandle();

  return (
    <>
      <div style={{ width: '100%' }}>
        <div
          className={`${styles.menuItem}`}
          ref={ref}
          onMouseLeave={() => toggleMenu(false)}
          onMouseEnter={() => toggleMenu(true)}>
          {!submenurowdirection && submenutext}

          <div style={{ margin: '4px 0 -4px' }}>
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
          viewScroll={'initial'}>
          {subData.map((elements, index) => {
            const { title, link } = elements;
            return (
              <MenuItem
                key={title}
                className={`${styles.subMenuItem} ${styles[`dropdown_item_${index + 1}`]}`}
                style={{
                  border: '1px solid var(--primary)',
                  margin: '0px 2px'
                  // background: 'var(--dark_one)'
                }}>
                {title}
              </MenuItem>
            );
          })}
        </ControlledMenu>
      </div>
    </>
  );
}
