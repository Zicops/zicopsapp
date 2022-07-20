import { customSelectStyles } from '@/components/common/FormComponents/Logic/formComponents.helper';
import ScrollDownAnimation from '@/components/common/ScrollDownAnimation';
import { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import styles from '../home.module.scss';
import { orgData } from '../Logic/homePage.helper';

const HomeInputField = () => {
  const orgDataOptions = [...orgData].map((d) => ({ label: d.org, value: d.org, ...d }));
  const [options, setOptions] = useState(orgDataOptions || []);
  const [isMenuVisible, setIsMenuVisible] = useState(true);

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

  return (
    <>
      <div className={`${styles.formContainerWrapper}`}>
        <form className={`${styles.formContainer}`}>
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
        </form>
        <ScrollDownAnimation />
      </div>
      <footer className={`${styles.HomeFooter}`}>
        <div className={`${styles.HomeFooterInner}`}>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
          <a href="/home">Zicops About</a>
        </div>
      </footer>
    </>
  );
};

export default HomeInputField;
