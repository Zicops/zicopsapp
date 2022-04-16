import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Image from 'next/image';

import { useDropDownSubmenuHandle } from '../Logic/useDropDownSubmenuHandle';

export default function DropDownSubMenu({ subData, menuIcon, submenutext,arrowpositon,submenurowdirection}) {
  const { ref, menuProps, toggleMenu } = useDropDownSubmenuHandle();
  
  
  return (
    <div style={{ width: '100%' }}>
      <div
        className={`${
          submenurowdirection
            ? 'dropdown-submenu-justifycontent-right'
            : 'dropdown-submenu-justifycontent-left'
        }`}
        ref={ref}
        onMouseEnter={() => toggleMenu(true)}
        onMouseLeave={() => toggleMenu(false)}
        onClose={() => toggleMenu(false)}>
        {submenutext}
        <Image src={menuIcon} height="22px" width="20px" />
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
        {subData.map((elements) => {
          const { title, link } = elements;
          return <MenuItem>{title}</MenuItem>;
        })}
      </ControlledMenu>
    </div>
  );
}
