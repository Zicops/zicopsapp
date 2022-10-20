import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SiteMapAtom } from '../../../state/atoms/sitemap.atom';
import styles from './missionControl.module.scss';
import Sitemap from '../../common/AdminHeader/Sitemap';
import PopUp from '../../common/PopUp';
import ToolTip from '@/components/common/ToolTip';
import { ProductTourVisible } from '@/state/atoms/productTour.atom';
import Dropdown from '@/components/common/Dropdown';

export default function MissionControlHeader() {
  const [showSitemap, setShowSitemap] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const siteMap = useRecoilValue(SiteMapAtom);
  const router = useRouter();
  const [viewButtons, setViewButtons] = useState(false);
  const [viewProductTour, setViewProductTour] = useRecoilState(ProductTourVisible);

  const handleClick = () => {
    setViewProductTour(true);
  };

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: '50%'
      // boxShadow: state.isFocused ? '0px 0px 10px 0px var(--primary)' : 'none'
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--dark_two)',
      border:
        !state.isFocused && !state.hasValue
          ? '2px solid var(--dark_three)'
          : '2px solid var(--primary)',
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: '14px',
      '&:hover': {
        borderWidth: '2px'
      }
    }),
    input: (provided, state) => ({ ...provided, color: 'var(--white)' }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none !important'
    }),
    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
      borderRadius: 0,
      maxHeight: '200px',
      /* width */
      '&::-webkit-scrollbar': {
        width: '5px',
        borderRadius: '0px',
        cursor: 'pointer'
      },
      /* Track */
      '&::-webkit-scrollbar-track': {
        background: '#2a2e31',
        borderRadius: '7px'
      },
      /* Handle */
      '&::-webkit-scrollbar-thumb': {
        background: '#969a9d',
        borderRadius: '7px',
        /* Handle on hover */
        '&:hover': {
          background: '#555'
        }
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'var(--black)' : 'var(--dark_two)',
      color: state.isSelected ? 'var(--white)' : 'var(--dark_three)',
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'var(--black)'
      }
    }),
    singleValue: (provided, state) => ({ ...provided, color: 'var(--white)' }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--primary)'
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: 'var(--dark_one)',
      fontSize: '14px',
      padding: '5px'
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: 'var(--dark_one)',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'var(--primary)'
      }
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      borderRadius: '0',
      backgroundColor: 'var(--dark_two)',
      color: 'var(--dark_three)',
      fontSize: '14px'
    })
  };

  return (
    <>
      <div className="mission_control_header">
        <div className="icons">
          {/* <div className={`rightside_icon first_icon ${styles.searchBar}`}>
            {showSearch && (
              <Select
                options={siteMap.map((val) => {
                  return { value: val.route, label: val.displayName, ...val };
                })}
                filterOption={(option, searchQuery) => {
                  if (!searchQuery?.trim()) return false;

                  return option.label?.toLowerCase()?.includes(searchQuery?.toLowerCase().trim());
                }}
                placeholder="Search"
                onChange={(e) => router.push(e.value)}
                className="w-100"
                styles={customStyles}
                isSearchable={true}
                isClearable={false}
                onBlur={() => setShowSearch(false)}
                ref={(elem) => elem?.focus()}
                noOptionsMessage={({ inputValue }) => (inputValue ? 'No Options' : 'Start Typing')}
              />
            )}

            <Image
              src="/images/magnifier.png"
              className="rightside_icon"
              alt=""
              height={'40px'}
              width={'40px'}
              onClick={() => setShowSearch(true)}
            />
          </div> */}
          <div className="rightside_icon">
            <ToolTip
              title="Click here to know everythng about Admin Controls"
              placement="left-start">
              <span>
                <Image
                  src="/images/svg/dvr.svg"
                  className="rightside_icon"
                  alt=""
                  height={'40px'}
                  width={'40px'}
                  onClick={() => setViewButtons(!viewButtons)}
                />
              </span>
            </ToolTip>
            {viewButtons && (
              <div className={styles.productTour_btn}>
                <button onClick={handleClick}>Admin Tour</button>
                <button>Documentation</button>
                {/* <Dropdown
                  options={floorOptions}
                  handleChange={(e) => setFloor(e)}
                  value={floor}
                  customStyles={{ width: '100%' }}
                /> */}
              </div>
            )}
          </div>
          <ToolTip title="Settings" placement="top-start">
            <div className="rightside_icon">
              <Image
                src="/images/cog.png"
                className="rightside_icon"
                alt=""
                height={'40px'}
                width={'40px'}
              />
            </div>
          </ToolTip>
          <ToolTip title="Sitemap" placement="right-start">
            <div className="rightside_icon">
              <Image
                src="/images/hiararchy.png"
                className="rightside_icon"
                alt=""
                height={'40px'}
                width={'50px'}
                onClick={() => setShowSitemap(true)}
              />
            </div>
          </ToolTip>
        </div>
      </div>

      {/* sitemap pop up */}
      <PopUp
        isFooterVisible={false}
        title="Sitemap"
        popUpState={[showSitemap, setShowSitemap]}
        size="large"
        positionLeft="50%">
        <Sitemap />
      </PopUp>
      <style jsx>
        {`
          .mission_control_header {
            padding: 20px 90px;
          }
          .icons {
            display: flex;
            justify-content: flex-end;
          }
          .rightside_icon {
            margin: 20px;
            display: inline-block;
            cursor: pointer;
          }
          .first_icon {
            display: flex;
          }
        `}
      </style>
    </>
  );
}
