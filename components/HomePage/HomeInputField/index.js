import { customSelectStyles } from '@/components/common/FormComponents/Logic/formComponents.helper';
import ScrollDownAnimation from '@/components/common/ScrollDownAnimation';
import Button from 'common/components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import styles from '../home.module.scss';
import { orgData } from '../Logic/homePage.helper';

const HomeInputField = ({ scrollFn }) => {
  const orgDataOptions = [...orgData].map((d) => ({ label: d.org, value: d.org, ...d }));
  const [options, setOptions] = useState(orgDataOptions || []);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const defaultStyles = customSelectStyles();
  const customStyles = {
    ...defaultStyles,
    container: () => ({
      ...defaultStyles.container,
      margin: '0px auto'
    }),
    control: () => ({
      ...defaultStyles.control(),
      display: 'flex',
      border: 'none',
      height: '100%',
      paddingLeft: '25px',
      background: 'transparent'
    }),
    menuList: () => ({
      ...defaultStyles.menuList()
      // maxHeight: '100px',
      // overflow: 'auto'
    })
  };

  const router = useRouter();
  const locationKey = router?.asPath;
  // console.log(locationKey);
  const timeout = { enter: 500, exit: 500 };

  // console.log(styles['slide-enter']);
  const [selected, setSelected] = useState('');
  // const [isActive, setIsActive] = useState(false);
  const [isOverLay, setIsOverLay] = useState(false);

  const routerConfig = [
    {
      path: '../static/about.html',
      title: 'Corporates'
    },
    {
      path: '../static/features.html',
      title: 'Features'
    },
    {
      path: '../static/content-partners.html',
      title: 'Content Partners'
    },
    {
      path: '../static/contact-us.html',
      title: 'Contact Us'
    }
    // {
    //   path: '/careers',
    //   title: 'Careers'
    // }
  ];

  return (
    <>
      <div className={`${styles.formContainerWrapper}`}>
        {/* <form className={`${styles.formContainer}`}>
          <span>
            <img src="./images/search2.png" alt="not found" />
          </span>

          <div className={`${styles.searchBar}`} onWheel={(e) => e.stopPropagation()}>
            <CreatableSelect
              options={options}
              maxMenuHeight={2}
              placeholder={'Search your Organization'}
              className={`w-100 ${styles.search}`}
              styles={customStyles}
              isSearchable={true}
              isClearable={true}
              classNamePrefix="search"
              menuIsOpen={isMenuVisible}
              onChange={(e) => {
                alert(`Go to ${e.label}`);
              }}
              onInputChange={(e) => {
                setIsMenuVisible(e.length);
              }}
              onCreateOption={(newOption) => {
                alert('Org creation flow');
              }}
            />
          </div>

          <button>GO</button>
        </form> */}
        <div className={`${styles.buttonContainer}`}>
          <Button
            size={'large'}
            clickHandler={() => {
              // router?.push('/create-learning-space');
              router?.push('/static/features.html');
            }}>
            Know More
          </Button>
        </div>
        <ScrollDownAnimation scrollFn={scrollFn} />
      </div>
      <footer className={`${styles.HomeFooter}`}>
        <div className={`${styles.HomeFooterInner}`}>
          {routerConfig.map((item, index) => {
            return (
              <span
                // className={`${styles.homeFooterElement} ${
                //   selected === item?.path ? styles['move_up'] : ''
                // }`}
                className={`${styles.homeFooterElement}`}
                key={index}
                onClick={() => setSelected(item?.path)}
                onTransitionEnd={() => {
                  setIsOverLay(true);
                }}>
                <a href={item?.path}>{item?.title}</a>
              </span>
            );
          })}
        </div>
        <div
          className={`${styles.footerOverlay} ${
            isOverLay ? styles.footerOverlayZoom : styles.footerOverlayNone
          }`}
          onAnimationStart={() => {
            router.prefetch(`${selected}`);
          }}
          onAnimationEnd={() => {
            router.push(`${selected}`);
            setIsOverLay(false);
          }}></div>
      </footer>
    </>
  );
};

export default HomeInputField;
