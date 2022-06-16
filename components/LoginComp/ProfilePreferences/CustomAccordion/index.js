import React, { useState } from 'react';
import styles from './customAccordion.module.scss';
import {Box, Button, Checkbox, Grid} from "@mui/material";

const CustomAccordion = ({ data, setData, category }) => {

    const [isActive, setIsActive] = useState(false);

    const filteredLength = data.filter((each) => each.category === category).length

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
    return (
        <>
            {
                data.filter((each) => each.category === category).length > 0 && (
                    <Box width={'100%'} color={'#FFF'} mb={3}>
                        <Box mb={1} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                            <Box>
                                {category}
                            </Box>
                            <Button sx={{textTransform: 'none'}} onClick={() => {setIsActive(!isActive)}} disabled={filteredLength < 6}>
                                {isActive ? 'See less' : 'See all'}
                            </Button>
                        </Box>
                        <Grid container spacing={2}>
                            {data.filter((each) => each.category === category).slice(0, isActive ? filteredLength : 6).map((subCategory) => (
                                <Grid item xs={4} onClick={() => {setData(handleClick(subCategory))}}>
                                    <Box pl={1.5} py={0.5} borderRadius={'5px'} width={'100%'} sx={{cursor: 'pointer'}}
                                         bgcolor={'#484848'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}
                                    >
                                        <Box>
                                            {subCategory.name}
                                        </Box>
                                        <Checkbox
                                            checked={subCategory.isSelected}
                                            onChange={() => {
                                                setData(handleClick(subCategory))
                                                // console.log(data)
                                                // setSelected([...selected, subCategory])
                                                // if(selected.some(obj => obj.name === subCategory.name)){
                                                //     deleteObject(subCategory)
                                                // }
                                                // else setSelected([...selected, subCategory])
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                )
            }
        </>
    );
};

export default CustomAccordion;
