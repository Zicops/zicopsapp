import {Badge, Box, Button, Checkbox, Grid, Grow, IconButton, InputAdornment, TextField} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import styles from "./profilePreferences.module.scss";
import {languages, categories, subCategories} from './Logic/profilePreferencesHelper'
import React, {useEffect, useRef, useState} from "react";
import CustomAccordion from "./CustomAccordion";
import SearchIcon from '@mui/icons-material/Search';
import FilterListSharpIcon from '@mui/icons-material/FilterListSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';


const ProfilePreferences = ({setCurrentComponent, setPage}) => {

    const [selected, setSelected] = useState([])
    const [isFiltered, setIsFiltered] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    // const [searchQuery, setSearchQuery] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [searchedData, setSearchedData] = useState([])
    const [searched, setSearched] = useState(false)
    const [primary, setPrimary] = useState('')

    const handleIcon = () => {
        setIsOpen(!isOpen);
    }

    subCategories.forEach((each) => {
        each.isSelected = false;
    });


    const [data, setData] = useState(subCategories);

    const handleClick = (subCategory) => {
        return data.map(function (obj) {
            if (obj.name === subCategory.name) {
                return {
                    ...obj,
                    isSelected: !obj.isSelected
                };
            } else {
                return { ...obj };
            }
        });
    };

    const deleteObject = (subCategory) => {
        const temp = selected;
        const index = selected.findIndex(obj => obj.name === subCategory.name);
        temp.splice(index,1);
        setSelected(temp);
    }

    const deleteFilter = (category) => {
        // console.log(category)
        const temp = filteredData;
        const index = filteredData.findIndex(obj => obj === category);
        // console.log(index)
        temp.splice(index,1);
        // console.log("temp", temp)
        setFilteredData([...temp]);
    }

    const handleQuery = (event) => {
        const query = event.target.value;
        // setSearchQuery(query)
        if(query.length > 0){
            setSearched(true)
            setSearchedData([])
            const temp = data.filter(
                obj => {
                    return (
                        obj
                            .name
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    );
                }
            );
            setSearchedData(temp)
        }else setSearched(false)
    }

    const myRef = useRef(null);
    // function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * close dialog if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (myRef.current && !myRef.current.contains(event.target)) {
                    setIsOpen(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [myRef]);
    // }
    // useOutsideAlerter(myRef);

    const [isVisible, setIsVisible] = useState(true);
    const scrollRef = useRef(null);

    const controlSearch = (e) => {
        // console.log(e.deltaY)
        if (e.deltaY > 0 && (isFiltered || searched)) setIsVisible(false);
        else setIsVisible(true);
        // if(myRef.current.scrollY > 10)
        //     setIsVisible(false)
        // else setIsVisible(true)
    }
    useEffect(() => {
        myRef.current.onwheel = (e) => {controlSearch(e)}
    },[])

    useEffect(() => {
        setIsOpen(false)
    },[isVisible])



    return(
        <>
            <div ref={myRef} className={`${styles.container}`}>
                {/*<div>*/}
                {/*    <div className={`${styles.title}`}>*/}
                {/*        Base Language*/}
                {/*    </div>*/}
                {/*    <div className={`${styles.subtitle}`}>*/}
                {/*        Select your base display language*/}
                {/*    </div>*/}
                {/*    <Grid container spacing={2} color={'#FFF'} mb={3}>*/}
                {/*        {*/}
                {/*            languages.map((each) => (*/}
                {/*                <Grid item xs={3}>*/}
                {/*                    <div className={`${styles.checkbox_container}`} onClick={() => {setSelectedLanguage(each)}}>*/}
                {/*                        <div>*/}
                {/*                            {each}*/}
                {/*                        </div>*/}
                {/*                        <Checkbox*/}
                {/*                            size={'small'}*/}
                {/*                            checked={selectedLanguage === each}*/}
                {/*                            onChange={() => {*/}
                {/*                                setSelectedLanguage(each)*/}
                {/*                            }}*/}
                {/*                            icon={<RadioButtonUncheckedOutlinedIcon />}*/}
                {/*                            checkedIcon={<RadioButtonCheckedIcon />}*/}
                {/*                        />*/}
                {/*                    </div>*/}
                {/*                </Grid>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </Grid>*/}
                {/*</div>*/}
                <Grow in={isVisible}>
                    <div className={`${styles.filter_main_container}`}>
                        <div className={`${styles.title}`}>
                            Sub-Category Selection
                        </div>
                        <div className={`${styles.subtitle}`}>
                            Select any 5 sub-categories of your choice ( Selected: {selected.length} )
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
                                            <IconButton
                                                onClick={handleIcon}
                                                edge="end"
                                            >
                                                <Badge color="error" variant="dot" invisible={!isFiltered}>
                                                    {isOpen ? <CloseSharpIcon /> : <FilterListSharpIcon />}
                                                </Badge>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}

                            />
                            {
                                isOpen && (
                                    <div className={`${styles.filter_drop}`}>
                                        <p>
                                            Select Category
                                        </p>
                                        <Grid container spacing={2}>
                                            {categories.map((category) => (
                                                <Grid item xs={4}>
                                                    <div className={`${styles.checkbox_container} ${styles.checkbox_container_filter}`}
                                                         onClick={() => {
                                                             if(filteredData.some(obj => obj === category)){
                                                                 deleteFilter(category)
                                                             }
                                                             else setFilteredData([...filteredData, category])
                                                         }}
                                                    >
                                                        <div>
                                                            {category}
                                                        </div>
                                                        <Checkbox
                                                            size={'small'}
                                                            checked={filteredData.some(obj => obj === category)}
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
                                            <div >
                                                <Button disabled={!isFiltered} size={'small'} variant={'outlined'} className={`${styles.transform_text}`}
                                                        onClick={() => {
                                                            setIsFiltered(false)
                                                            setFilteredData([])
                                                        }}
                                                >
                                                    Clear
                                                </Button>
                                                <Button size={'small'} variant={'contained'} className={`${styles.input_margin_transform}`}
                                                        disabled={filteredData.length === 0}
                                                        onClick={() => {
                                                            setIsFiltered(true)
                                                            setIsOpen(false)
                                                        }}
                                                >
                                                    Apply
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                )
                            }

                        </div>
                    </div>
                </Grow>
                <div ref={scrollRef} className={`${styles.category_and_subCategory}`}
                    // height={'350px'} sx={{overflowY: 'scroll'}}
                >
                    {
                        (isFiltered ? filteredData : categories).map((category) => (
                            <CustomAccordion selected={selected} setSelected={setSelected} searched={searched} searchedData={searchedData}  data={data} setData={setData} category={category} />
                        ))
                    }
                </div>
                {
                    selected > 0 && <Box mt={4} />
                }
                <div>
                    {selected.length > 0 && <div className={`${styles.selected_title}`}>Selected Sub-Category</div>}
                    {
                        <Grid container spacing={2}>
                            {selected.map((subCategory) => (
                                <Grid item xs={4}>
                                    <div className={`${primary === subCategory ? styles.checkbox_container_selected : styles.checkbox_container}`}
                                         onClick={() => {
                                            setPrimary(subCategory)
                                         }}
                                    >
                                        <div>
                                            {subCategory.name}
                                        </div>
                                        <Checkbox
                                            size={'small'}
                                            checked={true}
                                            // onChange={() => {
                                            //     setData(handleClick(subCategory))
                                            // }}
                                        />
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    }

                </div>
                <Box mt={3} />
                <div className={`${styles.navigator}`}>
                    <span />
                    <div className={`${styles.btn_container}`}>
                        <Button variant={'outlined'} className={`${styles.transform_text}`}
                                onClick={() => {setCurrentComponent(1)}}
                        >
                            Back
                        </Button>
                        <Button variant={'contained'} className={`${styles.input_margin_transform}`}
                                onClick={() => {
                                    // const result = data.filter((each) => each.isSelected === true);
                                    // result.map((each) => {delete each.isSelected});
                                    // console.log("result", result);
                                    // console.log("selected", selected);
                                    // console.log("filtered", filteredData);
                                    
                                      setPage(0);
                                    
                                }}
                                // onClick={() => {setCurrentComponent(3)}}
                        >
                            Next
                        </Button>
                    </div>
                </div>
                {/*{*/}
                {/*    isOpen || searched || selected.length > 0 && (<Box mt={40} />)*/}
                {/*}*/}
                {/*<Box mt={40} />*/}
            </div>
        </>
    );
}

export default ProfilePreferences;