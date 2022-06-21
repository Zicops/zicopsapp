import React, { useState } from 'react';
import styles from './customAccordion.module.scss';
import {Box, Button, Checkbox, Grid} from "@mui/material";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const CustomAccordion = ({ selected, setSelected, searched, searchedData, data, setData, category }) => {

    const [isActive, setIsActive] = useState(false);

    const filteredLength =  (searched ? searchedData : data).filter((each) => each.category === category).length

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

    return (
        <>
            {
                (searched ? searchedData : data).filter((each) => each.category === category).length > 0 && (
                    <div className={`${styles.container}`}>
                        <div className={`${styles.category_title_container}`}>
                            <div>
                                {category}
                            </div>
                            <div className={`${styles.category_title_line}`} />
                            <Button className={`${styles.transform_text}`} onClick={() => {setIsActive(!isActive)}} disabled={filteredLength <= 6}>
                                {isActive ? 'See less' : 'See all'}
                            </Button>
                        </div>
                        <Grid container spacing={2}>

                            {
                                (searched ? searchedData : data).filter((each) => each.category === category).slice(0, isActive ? filteredLength : 6).map((subCategory) => (
                                    <Grid item xs={4}>
                                        <div className={`${styles.checkbox_container}`} onClick={() => {
                                            setData(handleClick(subCategory))
                                            if(selected.some(obj => obj.name === subCategory.name)){
                                                deleteObject(subCategory)
                                            }
                                            else setSelected([...selected, subCategory])
                                        }}>
                                            <div>
                                                {subCategory.name}
                                            </div>
                                            <Checkbox
                                                size={'small'}
                                                // checked={subCategory.isSelected}
                                                checked={selected.some(obj => obj.name === subCategory.name)}
                                                // onChange={() => {
                                                //     setData(handleClick(subCategory))
                                                // }}
                                            />
                                        </div>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </div>
                )
            }
        </>
    );
};

export default CustomAccordion;
