import AddCatSubCat from '@/components/adminComps/ZicopsCourses/AddCatSubCat';
import Loader from '@/components/common/Loader';
import PopUp from '@/components/common/PopUp';
import { useHandleCatSubCat } from '@/helper/hooks.helper';
import { PopUpStatesAtomFamily } from '@/state/atoms/popUp.atom';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import FilterListSharpIcon from '@mui/icons-material/FilterListSharp';
import SearchIcon from '@mui/icons-material/Search';
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
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import useHandleAddUserDetails from '../Logic/useHandleAddUser';
import SubCategoryAdd from '../SubCategoryAdd';
import CustomAccordion from './CustomAccordion';
import styles from './profilePreferences.module.scss';

const ProfilePreferences = ({
  setCurrentComponent,
  selected,
  setSelected,
  hideBack = false,
  customStyle = [],
  customClass,
  isLearnerSide = false,
  closePopUp = ()=>{}
}) => {
  const [vidIsOpen, setVidIsOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const vidRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [searched, setSearched] = useState(false);
  const [addCat, setAddCat] = useState(false);
  const [popUpState, udpatePopUpState] = useRecoilState(PopUpStatesAtomFamily('addCatSubCat'));
  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);
  const router = useRouter();

  const { catSubCat } = useHandleCatSubCat();

  const handleIcon = () => {
    setIsOpen(!isOpen);
  };

  const { updateAboutUser, addUserLearningSpaceDetails, isSubmitDisable } =
    useHandleAddUserDetails();

  async function handleCompleteSetup() {
    // console.log(selected);
    // const sub_categories = selected.map((item) => item.name);

    // setUserAccountData((prevValue) => ({ ...prevValue, sub_category: primary }));

    let isError = false;
    isError = await addUserLearningSpaceDetails([],false);
    if (isError) return;
    isError = await updateAboutUser();

    if (isError) return;

    setToastMsg({ type: 'success', message: 'Account Setup is completed!' });

    router.prefetch('/');
    setVidIsOpen(true);
    vidRef?.current?.play();
    // console.log('from add');
  }

  const [categories, setCategories] = useState([]);
  const [data, setData] = useState('loading');

  useEffect(() => {
    if (catSubCat.isDataLoaded === null) return;
    if (!catSubCat?.cat?.length && catSubCat?.isDataLoaded) return setData([]);

    const allCatNames = [];
    catSubCat?.cat?.forEach((c) => allCatNames.push(c?.Name));
    setCategories(allCatNames);
  }, [catSubCat?.cat]);

  useEffect(() => {
    if (catSubCat.isDataLoaded === null) return;
    if (!catSubCat?.subCat?.length && catSubCat?.isDataLoaded) return setData([]);
    // if (catSubCat?.subCat?.length) return setData([]);
    // return setData([]);

    setData(
      catSubCat?.subCat?.map((s) => {
        return {
          ...s,
          name: s?.Name,
          category: catSubCat?.subCatGrp[s?.CatId]?.cat?.Name,
          isSelected: false
        };
      })
    );
  }, [catSubCat?.subCat]);

  const deleteFilter = (category) => {
    // console.log(category)
    const temp = filteredData;
    const index = filteredData.findIndex((obj) => obj === category);
    // console.log(index)
    temp.splice(index, 1);
    // console.log("temp", temp)
    setFilteredData([...temp]);
  };

  const handleQuery = (event) => {
    const query = event.target.value;
    // setSearchQuery(query)
    if (query.length > 0) {
      setSearched(true);
      setSearchedData([]);
      const temp = data.filter((obj) => {
        return obj.name.toLowerCase().includes(query.toLowerCase());
      });
      setSearchedData(temp);
    } else setSearched(false);
  };

  const myRef = useRef(null);
  // function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * close dialog if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (myRef.current && !myRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myRef]);
  // }
  // useOutsideAlerter(myRef);

  const [isVisible, setIsVisible] = useState(true);
  const scrollRef = useRef(null);

  const controlSearch = (e) => {
    // console.log(e.deltaY)
    if (e.deltaY > 0) {
      setIsVisible(false);
    } else setIsVisible(true);
    // if(myRef.current.scrollY > 10)
    //     setIsVisible(false)
    // else setIsVisible(true)
  };
  useEffect(() => {
    myRef.current.onwheel = (e) => {
      controlSearch(e);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [isVisible]);

  return (
    <>
      <div ref={myRef} className={`${styles.container} ${customClass}`}>
        {data?.length > 5 && data !== 'loading' ? (
          <Grow in={isVisible || isFiltered || searched}>
            <div className={`${styles.filter_main_container} ${customStyle[0]}`}>
              <div className={`${styles.title}`}>Sub-Category Selection</div>
              <div className={`${styles.subtitle}`}>
                Select minimum 5 sub-categories of your choice ( Selected: {selected.length} )
              </div>
              <div className={`${styles.filter_container}`}>
                <TextField
                  fullWidth
                  placeholder={'Search category/sub-category'}
                  size={'small'}
                  onChange={handleQuery}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleIcon} edge="end">
                          {!isOpen && (
                            <Badge color="error" variant="dot" invisible={!isFiltered}>
                              <FilterListSharpIcon />
                            </Badge>
                          )}
                          {isOpen && <CloseSharpIcon />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                {isOpen && (
                  <div className={`${styles.filter_drop}`}>
                    <p>Select Category</p>
                    <Grid container spacing={2}>
                      {categories.map((category) => (
                        <Grid item xs={4}>
                          <div
                            className={`${styles.checkbox_container} ${styles.checkbox_container_filter}`}
                            onClick={() => {
                              if (filteredData.some((obj) => obj === category)) {
                                deleteFilter(category);
                              } else setFilteredData([...filteredData, category]);
                            }}>
                            <div>{category}</div>
                            <Checkbox
                              size={'small'}
                              checked={filteredData.some((obj) => obj === category)}
                              // onChange={() => {
                              //     setData(handleClick(subCategory))
                              // }}
                            />
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                    <div className={`${styles.apply_btn}`}>
                      <span />
                      <div className={`${styles.navigatorBtns}`}>
                        <Button
                          disabled={!isFiltered}
                          size={'small'}
                          variant={'outlined'}
                          className={`${styles.transform_text}`}
                          onClick={() => {
                            setIsFiltered(false);
                            setIsOpen(false);
                            setFilteredData([]);
                          }}>
                          Clear
                        </Button>
                        <Button
                          size={'small'}
                          variant={'contained'}
                          className={`${styles.input_margin_transform}`}
                          disabled={filteredData.length === 0}
                          onClick={() => {
                            setIsFiltered(true);
                            setIsOpen(false);
                          }}>
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Grow>
        ): <></>}
        {data === 'loading' ? (
          <>
            <Loader customStyles={{ backgroundColor: 'transparent', height: '100%' }} />
          </>
        ) : data?.length > 5 && data !== 'loading' ? (
          <div
            ref={scrollRef}
            className={`${styles.category_and_subCategory} ${customStyle[1]}`}
            // height={'350px'} sx={{overflowY: 'scroll'}}
          >
            {(isFiltered ? filteredData : categories).map((category) => (
              <CustomAccordion
                selected={selected}
                setSelected={setSelected}
                searched={searched}
                searchedData={searchedData}
                data={data}
                setData={setData}
                category={category}
              />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontSize: '20px' }}>
            There are less than 5 or no subcategories in your learning space. Please continue with
            your journey by skipping preferences selection here.
          </p>
        )}

        <Box mt={3} />
      </div>
      <div className={`${styles.navigator} ${customStyle[2]}`}>
        <span />

        <div className={`${styles.navigatorBtns} `}>
          {!hideBack && (
            <Button
              variant={'outlined'}
              className={`${styles.transform_text}`}
              onClick={() => {
                setCurrentComponent(1);
              }}>
              Back
            </Button>
          )}

          {!(data?.length < 5) ? (
            <Button
              disabled={selected.length < 5}
              variant={'contained'}
              className={`${styles.input_margin_transform}`}
              onClick={() => {
                setCurrentComponent(3);
              }}>
              Next
            </Button>
          ) : (
            <>
              {isLearnerSide && (
                <Button
                  variant={'contained'}
                  className={`${styles.input_margin_transform}`}
                  onClick={() => {
                    closePopUp(false);
                  }}>
                  Close
                </Button>
              )}
              <Button
                disabled={data?.length > 5 || isLearnerSide}
                variant={'contained'}
                className={`${styles.input_margin_transform}`}
                onClick={() => {
                  handleCompleteSetup();
                }}>
                Skip
              </Button>
            </>
          )}
        </div>
        {!!vidIsOpen && (
          <div className={`${styles.introVideoContainer}`}>
            <video ref={vidRef} onEnded={() => router.push('/')} disablePictureInPicture>
              <source src="/videos/loginIntro.mp4" type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePreferences;
