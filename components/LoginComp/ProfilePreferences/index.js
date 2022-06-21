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


const ProfilePreferences = ({setCurrentComponent, selected, setSelected}) => {

    const [isFiltered, setIsFiltered] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    // const [searchQuery, setSearchQuery] = useState('')
    const [filteredData, setFilteredData] = useState([])
    const [searchedData, setSearchedData] = useState([])
    const [searched, setSearched] = useState(false)

    const handleIcon = () => {
        setIsOpen(!isOpen);
    }

    subCategories.forEach((each) => {
        each.isSelected = false;
    });


    const [data, setData] = useState(subCategories);

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
                <Grow in={isVisible}>
                    <div className={`${styles.filter_main_container}`}>
                        <div className={`${styles.title}`}>
                            Sub-Category Selection
                        </div>
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
                                            <IconButton
                                                onClick={handleIcon}
                                                edge="end"
                                            >
                                                <Badge color="error" variant="dot" invisible={!isFiltered}>
                                                    {!isOpen && <FilterListSharpIcon />}
                                                </Badge>
                                                {
                                                    isOpen && <CloseSharpIcon />
                                                }
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
                <Box mt={3} />
            </div>
            <div className={`${styles.navigator}`}>
                <span />
                <div className={`${styles.btn_container}`}>
                    <Button variant={'outlined'} className={`${styles.transform_text}`}
                            onClick={() => {setCurrentComponent(1)}}
                    >
                        Back
                    </Button>
                    <Button disabled={selected.length < 5} variant={'contained'} className={`${styles.input_margin_transform}`}
                            onClick={() => {
                                setCurrentComponent(3)
                            }}

                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ProfilePreferences;