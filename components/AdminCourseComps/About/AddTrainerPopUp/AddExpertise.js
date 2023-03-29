import LabeledDropdown from '@/components/common/FormComponents/LabeledDropdown';
import styles from './addTrainer.module.scss';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Grid,
  Grow,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { GridSearchIcon } from '@mui/x-data-grid';
import Loader from '@/components/common/Loader';
import SearchBar from '@/components/common/FormComponents/SearchBar';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { isWordIncluded } from '@/helper/utils.helper';
const AddExpertise = () => {
  const [expertise, setExpertise] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const { catSubCat } = useHandleCatSubCat();
  const handleExpretiseSelection = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedExpertise([...(selectedExpertise || []), value]);
    } else {
      setSelectedExpertise(selectedExpertise?.filter((lang) => lang !== value));
    }
  };
  const cardContainerRef = useRef(null);
  const [isShowAll, setIsShowAll] = useState(false);
  const [cardSizeData, setCardSizeData] = useState({
    cardWidth: 300,
    cardCount: 1
  });
  useEffect(() => {
    if (!cardContainerRef.current) return;

    const sidePadding = 50;
    const gap = 20;
    // const screenWidth = window.screen.width; //////
    const screenWidth = cardContainerRef.current?.offsetWidth;
    window.c = cardContainerRef.current;

    let cardCount = cardSizeData.cardCount;

    if (screenWidth > 1600) cardCount = 6;
    if (screenWidth > 1500) cardCount = 5;
    if (screenWidth > 1400) cardCount = 5;

    const cardWidth = (screenWidth - (cardCount - 1) - gap * (cardCount - 1)) / cardCount;

    setCardSizeData({ cardCount, cardWidth });
  }, []);
  return (
    <div className={`${styles.expertiseContainer}`}>

      <div className={`${styles.expertiseBox}`}>
        <SearchBar
          inputDataObj={{
            inputOptions: {
              inputName: 'filter',
              placeholder: 'Search...'
              // value: expertiseValue
            },
            changeHandler: (e) => setExpertise(e.target.value)
          }}
          styleClass={`${styles.expertiseSearch}`}
        />
        <div className={`${styles.expertiseList}`} ref={cardContainerRef}>
          {Object.values(catSubCat?.subCatGrp)?.map((obj) => {
            const filteredSubcat = obj?.subCat?.filter((sc) => isWordIncluded(sc?.Name));
            if (!filteredSubcat.length) return;
            return (
              <div className={`${styles.expertise1}`}>
                <div className={`${styles.seeMoreLess}`}>
                  <h3>{obj?.cat?.Name}</h3>
                  <div></div>
                  <button
                    className={isShowAll ? `${styles.seeAllBtn}` : `${styles.seeLessBtn} `}
                    onClick={() => setIsShowAll(!isShowAll)}>
                    See {isShowAll ? 'Less' : 'All'}
                    {/* <img src={`/images/arrow2.png`} /> */}
                  </button>
                </div>
                <div className={`${styles.expertiseCheckbox}`}>
                  {filteredSubcat?.map((subCat) => {
                    return (
                      <div>
                        <LabeledRadioCheckbox
                          type="checkbox"
                          value={subCat.Name}
                          label={subCat.Name}

                          // isChecked={selectedExpertise?.includes(subCat.Name)}
                          // changeHandler={handleExpretiseSelection}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AddExpertise;
