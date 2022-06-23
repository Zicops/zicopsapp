import {Box, Button, Checkbox, Chip, Grid, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styles from './preview.module.scss';
import React, {useEffect, useState} from "react";
import {styled} from '@mui/material/styles';


const SubCategoriesPreview = ({setCurrentComponent, selected, setSelected}) => {

    const [primary, setPrimary] = useState('')

    const deleteObject = (subCategory) => {
        const temp = selected;
        const index = selected.findIndex(obj => obj.name === subCategory.name);
        temp.splice(index,1);
        setSelected([...temp]);
    }


    const CustomChip = styled(Chip)(({ theme }) => ({
        padding: '20px 12px',
        fontSize: '14px',
        borderRadius: '5px',
        border: '2px solid #484848',
        "&.MuiChip-root": {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        // "&:hover": {
        //     borderColor: '#D6D6D6'
        // },
    }));

    return(
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.title}`}>
                    Selected Sub-Categories
                </div>
                <div className={`${styles.subtitle}`}>
                    Kindly select your primary Sub-Category
                </div>
                {
                    <Grid container spacing={2}>
                        {selected.map((subCategory) => (
                            <Grid item xs={4}>
                                <CustomChip
                                    className={`${primary === subCategory.name ? styles.checkbox_container_selected : ''}`}
                                    label={subCategory.name}
                                    onClick={() => {
                                        setPrimary(subCategory.name)
                                    }}
                                    onDelete={() => {
                                        if((primary !== subCategory.name) && selected.length > 5)
                                            deleteObject(subCategory)
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                }
                <Box mt={3} />
            </div>
            <div className={`${styles.navigator}`}>
                <span />
                <div className={`${styles.navigatorBtns}`}>
                    <Button variant={'outlined'} className={`${styles.transform_text}`}
                            onClick={() => {setCurrentComponent(2)}}
                    >
                        Back
                    </Button>
                    <Button disabled={primary === ''} variant={'contained'} className={`${styles.input_margin_transform}`}
                            // onClick={() => {
                            //     console.log(selected)
                            // }}
                    >
                        Complete Setup
                    </Button>
                </div>
            </div>
        </>
    );
}

export default SubCategoriesPreview;