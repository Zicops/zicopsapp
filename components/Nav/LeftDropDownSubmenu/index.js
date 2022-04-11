import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Image from 'next/image';

import { useDropDownSubmenuHandle } from '../Logic/useDropDownSubmenuHandle';

export default function LeftDropDownSubMenu({subData}) {

    const {ref, menuProps, toggleMenu} = useDropDownSubmenuHandle()

    

  return (
    <div>
      <div
        ref={ref}
        onMouseEnter={() => toggleMenu(true)}
        onMouseLeave={() => toggleMenu(false)}
        onClose={() => toggleMenu(false)}>
        <Image src="/images/bigarrowright.png" height="22px" width="20px" />
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
        direction={'right'}
        position={'initial'}
        viewScroll={'initial'}>
        {
          // console.log(subData)
          subData.map((elements) => {
            const {title,link} = elements
            return <MenuItem>{title}</MenuItem>;
          })
        }
        
      </ControlledMenu>
    </div>
  );
}
