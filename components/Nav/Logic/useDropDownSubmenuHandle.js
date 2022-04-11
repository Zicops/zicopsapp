import {  useRef } from 'react';
import { useMenuState } from '@szhsin/react-menu';


export function useDropDownSubmenuHandle() {
  const ref = useRef(null);
  const [menuProps, toggleMenu] = useMenuState({ transition: true });


  return {ref, menuProps, toggleMenu}
}
