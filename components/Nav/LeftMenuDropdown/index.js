import '@reach/menu-button/styles.css';
import Image from 'next/image';
import { useDropDownHandle } from '../Logic/useDropDownHandle.js';

import { MenuList, Paper } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import { USER_LSP_ROLE } from '@/helper/constants.helper.js';
import useUserCourseData from '@/helper/hooks.helper.js';
import { UserDataAtom } from '@/state/atoms/global.atom.js';
import { UsersOrganizationAtom } from '@/state/atoms/users.atom.js';
import { useContext, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import RightArrow from '../../../public/images/bigarrowright.png';
import { userContext } from '../../../state/contexts/UserContext';
import DropDownSubMenu from '../DropDownSubmenu/index.js';
import { languages } from '../Logic/subMenu.helper.js';
import styles from '../nav.module.scss';
export default function LeftMenuDropdown({ isOnLearnerSide }) {
  const { isAdmin } = useContext(userContext);
  const { anchorEl, handleClick, handleClose, open, gotoAdmin, gotoUser } = useDropDownHandle();
  const { getUserPreferences } = useUserCourseData();
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState([]);
  const [userGlobalData, setUserGlobalData] = useRecoilState(UserDataAtom);
  const userOrgData = useRecoilValue(UsersOrganizationAtom);

  const isVendor = userOrgData.user_lsp_role?.toLowerCase()?.includes(USER_LSP_ROLE.vendor);

  useEffect(async () => {
    if (!userGlobalData?.isPrefAdded) {
      loadUserPreferences();
      return;
    }
    if (!userGlobalData?.preferences?.length) {
      loadUserPreferences();
      return;
    }
    if (userGlobalData?.isPrefUpdated) {
      loadUserPreferences();
      setUserGlobalData((prevValue) => ({ ...prevValue, isPrefUpdated: false }));
      return;
    }
    const activePreferences = userGlobalData?.preferences?.filter((item) => item?.is_active);
    const prefArray = [];

    // base pref
    const basePref = activePreferences?.find((pref) => pref?.is_base);
    prefArray.unshift({
      title: basePref?.sub_category,
      asUrl: '/search-page',
      link: `${basePref?.sub_category}`,
      customStyle: {
        backgroundColor: 'var(--primary)',
        color: 'var(--black)'
      },
      customClass: styles['selectedSubMenuItem']
    });

    let prefCount = 0;
    for (let i = 0; i < activePreferences?.length; i++) {
      ++prefCount;
      if (prefCount > 4) break;
      if (activePreferences[i]?.is_base) {
        --prefCount;
        // prefArray.unshift({
        //   title: activePreferences[i]?.sub_category,
        //   asUrl: '/search-page',
        //   link: `${activePreferences[i]?.sub_category}`,
        //   customStyle: {
        //     backgroundColor: 'var(--primary)',
        //     color: 'var(--black)'
        //   },
        //   customClass: styles['selectedSubMenuItem']
        // });
      } else {
        prefArray.push({
          title: activePreferences[i]?.sub_category,
          link: `${activePreferences[i]?.sub_category}`,
          asUrl: '/search-page'
        });
      }
    }
    // console.log(prefArray,'prefArray');
    prefArray.push({
      title: (
        <>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 14V16H6V14H0ZM0 2V4H10V2H0ZM10 18V16H18V14H10V12H8V18H10ZM4 6V8H0V10H4V12H6V6H4ZM18 10V8H8V10H18ZM12 6H14V4H18V2H14V0H12V6Z"
              fill="#C4C4C4"
            />
          </svg>
          Preference Center
        </>
      ),
      link: '/my-profile?basepref=' + basePref?.sub_category,
      asUrl: '/my-profile',
      isPreferenceCentre: true,
      customStyle: {
        backgroundColor: 'var(--black)',
        color: 'var(--white)',
        borderColor: 'var(--white)',
        fontSize: '13px'
      },
      customClass: `${styles['dropdown_item_5']} ${styles.preferenceCentreMenuItem} `
    });
    setPreferences([...prefArray], setLoading(false));
    return;
  }, []);

  async function loadUserPreferences() {
    const userPreferences = await getUserPreferences();
    if (!userPreferences?.length) {
      setUserGlobalData((prevValue) => ({ ...prevValue, preferences: [], isPrefAdded: true }));
      return setLoading(false);
    }
    const activePreferences = userPreferences?.filter((item) => item?.is_active);
    const prefArray = [];

    // base pref
    const basePref = activePreferences?.find((pref) => pref?.is_base);
    prefArray.unshift({
      title: basePref?.sub_category,
      asUrl: '/search-page',
      link: `${basePref?.sub_category}`,
      customStyle: {
        backgroundColor: 'var(--primary)',
        color: 'var(--black)'
      },
      customClass: styles['selectedSubMenuItem']
    });

    let prefCount = 0;
    for (let i = 0; i < activePreferences?.length; i++) {
      ++prefCount;
      if (prefCount > 4) break;
      if (activePreferences[i]?.is_base) {
        --prefCount;
        // prefArray.unshift({
        //   title: activePreferences[i]?.sub_category,
        //   asUrl: '/search-page',
        //   link: `${activePreferences[i]?.sub_category}`,
        //   customStyle: {
        //     backgroundColor: 'var(--primary)',
        //     color: 'var(--black)'
        //   },
        //   customClass: styles['selectedSubMenuItem']
        // });
      } else {
        prefArray.push({
          title: activePreferences[i]?.sub_category,
          link: `${activePreferences[i]?.sub_category}`,
          asUrl: '/search-page'
        });
      }
    }
    // console.log(prefArray,'prefArray');
    prefArray.push({
      title: (
        <>
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 14V16H6V14H0ZM0 2V4H10V2H0ZM10 18V16H18V14H10V12H8V18H10ZM4 6V8H0V10H4V12H6V6H4ZM18 10V8H8V10H18ZM12 6H14V4H18V2H14V0H12V6Z"
              fill="#C4C4C4"
            />
          </svg>
          Preference Center
        </>
      ),
      link: '/my-profile?basepref=' + basePref?.sub_category,
      asUrl: '/my-profile',
      isPreferenceCentre: true,
      customStyle: {
        backgroundColor: 'var(--black)',
        color: 'var(--white)',
        borderColor: 'var(--white)',
        fontSize: '13px'
      },
      customClass: `${styles[`dropdown_item_${activePreferences?.length + 1}`]} ${
        styles.preferenceCentreMenuItem
      } `
    });
    setPreferences([...prefArray], setLoading(false));
  }
  // useEffect(()=>{
  //  if(!userOrgData?.sub_categories?.length) return setLoading(false);

  // },[userOrgData])

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
          subData={loading ? [{ title: 'Loading...', link: '/' }] : preferences}
          menuIcon={RightArrow}
          submenutext="Preferences"
          arrowpositon="right"
          submenurowdirection={false}
        />
      ),
      isHidden: isVendor
    },
    {
      id: 3,
      styles: {
        display: 'flex',
        flexDirection: 'column',
        border: 'solid 1px var(--primary)',
        fontSize: '16px',
        alignItems: 'flex-start',
        backgroundColor: 'var(--header-bg)',
        padding: '7px 8px'
      },
      onClick: isOnLearnerSide ? gotoAdmin : gotoUser,
      comp: <div>{isOnLearnerSide ? 'Switch to Admin' : 'Switch to Learner'}</div>,
      isAdmin: true
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
            onMouseEnter={handleClick}
            onKeyDown={handleClick}>
            {menuItemList.map((item) => {
              if (item.isAdmin && !isAdmin) return null;
              if (item?.isHidden) return null;

              return (
                <MenuItem
                  key={item.id}
                  sx={{
                    '&.MuiMenuItem-root': {
                      border: '1px solid var(--primary)',
                      color: 'var(--primary)',
                      // margin: '2px',
                      backgroundColor: 'var(--header-bg)',
                      justifyContent: 'flex-start',
                      padding: '0px'
                    }
                  }}
                  onClick={() => {
                    item?.onClick && item?.onClick();
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
