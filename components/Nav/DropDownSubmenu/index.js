import { ControlledMenu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../nav.module.scss';

import { USER_LSP_ROLE } from '@/helper/constants.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom';
import { useRecoilValue } from 'recoil';
import { useDropDownSubmenuHandle } from '../Logic/useDropDownSubmenuHandle';

export default function DropDownSubMenu({
  subData,
  menuIcon,
  submenutext,
  arrowpositon,
  submenurowdirection
}) {
  const { ref, menuProps, toggleMenu, goToRoute } = useDropDownSubmenuHandle();
  const router = useRouter();
  const { isDev, isDemo } = useRecoilValue(FeatureFlagsAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

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
            const { title, link, asUrl } = elements;
            let customStyles = {
              border: '1px solid var(--primary)',
              margin: `${index === 0 ? '1px 2px 0 2px' : '0 2px'}`
              // background: 'var(--dark_one)'
            };
            if (elements.customStyle) {
              customStyles = { ...customStyles, ...elements.customStyle };
            }

            let pageRoute = link;
            if (elements?.isDisabled || elements?.isDemo || elements?.isDev) pageRoute = null;
            if (isDemo && elements?.isDemo) pageRoute = link;
            if (isDev && elements?.isDev) pageRoute = link;
            if (isVendor && !elements.roleAccess?.includes(USER_LSP_ROLE.vendor)) pageRoute = null;

            return (
              <MenuItem
                key={title}
                className={`${styles.subMenuItem} ${!pageRoute ? styles.disabled : ''} ${
                  elements.customStyle ? elements.customClass : styles[`dropdown_item_${index + 1}`]
                } ${title?.length > 16 ? styles.fontSizeSmall : ''}`}
                style={customStyles}
                onClick={(e) => {
                  // e.stopPropagation();
                  e?.syntheticEvent?.stopPropagation();
                  if (!pageRoute) return;

                  if (!elements?.isPreferenceCentre) {
                    const route =
                      arrowpositon === 'right'
                        ? `search-page?subCat=${link}&isPref=true`
                        : `${link}?tabName=${title}`;
                    const maskUrl = elements?.asUrl ? elements?.asUrl : link;
                    router.push(route, maskUrl);
                  } else router.push(link, asUrl);
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
