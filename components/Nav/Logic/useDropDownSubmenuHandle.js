import { useRef } from 'react';
import { useMenuState } from '@szhsin/react-menu';
import { useRouter } from 'next/router';

export function useDropDownSubmenuHandle() {
  const ref = useRef(null);
  const [menuProps, toggleMenu] = useMenuState({ transition: true });
  const router = useRouter();

  function goToRoute(link) {
    router.push(link);
  }

  return { ref, menuProps, toggleMenu, goToRoute };
}
