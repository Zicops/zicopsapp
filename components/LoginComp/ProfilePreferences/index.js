import {Box, Button, Checkbox, Grid} from "@mui/material";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import styles from "../AccountSetupOrg/setupOrg.module.scss";
import {languages, categories, subCategories} from './Logic/profilePreferencesHelper'
import {useState} from "react";
import CustomAccordion from "./CustomAccordion";


const ProfilePreferences = ({setCurrentComponent}) => {

    const [selectedLanguage, setSelectedLanguage] = useState('English')

    // const [selected, setSelected] = useState([])

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

    // const deleteObject = (subCategory) => {
    //     const temp = selected;
    //     const index = selected.findIndex(obj => obj.name === subCategory.name);
    //     temp.splice(index,1);
    //     setSelected(temp);
    // }


    return(
        <>
            <div className={`${styles.container}`}>
                <Box mb={2} color={'#FFF'}>
                    Base Language
                </Box>
                <Grid container spacing={2} color={'#FFF'} mb={3}>
                    {
                        languages.map((each) => (
                            <Grid item xs={3}>
                                <Box pl={1.5} py={0.5} borderRadius={'5px'} width={'100%'} sx={{cursor: 'pointer'}}
                                     bgcolor={'#484848'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}
                                     onClick={() => {setSelectedLanguage(each)}}
                                >
                                    <Box>
                                        {each}
                                    </Box>
                                    <Checkbox
                                        checked={selectedLanguage === each}
                                        onChange={() => {
                                            setSelectedLanguage(each)
                                        }}
                                        icon={<RadioButtonUncheckedOutlinedIcon />}
                                        checkedIcon={<RadioButtonCheckedIcon />}
                                    />
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
                <Box
                    // height={'350px'} sx={{overflowY: 'scroll'}}
                >
                    {
                        categories.map((category) => (
                            <CustomAccordion data={data} setData={setData} category={category} />
                        ))
                    }
                </Box>
                {
                    data.filter((each) => each.isSelected === true).length > 0 && <Box mt={4} />
                }
                <Box>
                    {
                        <Grid container spacing={2}>
                            {data.filter((each) => each.isSelected === true).map((subCategory) => (
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
                                            }}
                                        />
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    }

                    {/*alternative approach to preferences*/}

                    {/*{*/}
                    {/*    <Grid container spacing={2}>*/}
                    {/*        {selected.map((subCategory) => (*/}
                    {/*            <Grid item xs={4}>*/}
                    {/*                <Box pl={1.5} py={0.5} borderRadius={'5px'} width={'100%'} sx={{cursor: 'pointer'}}*/}
                    {/*                     bgcolor={'#484848'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}*/}
                    {/*                >*/}
                    {/*                    <Box>*/}
                    {/*                        {subCategory.name}*/}
                    {/*                    </Box>*/}
                    {/*                    <Checkbox*/}
                    {/*                        checked={data.filter((each) => each.name === subCategory.name)[0].isSelected}*/}
                    {/*                        onChange={() => {*/}
                    {/*                            setData(handleClick(subCategory))*/}
                    {/*                            // console.log(data)*/}
                    {/*                            setSelected([...selected, subCategory])*/}
                    {/*                            if(selected.some(obj => obj.name === subCategory.name)){*/}
                    {/*                                deleteObject(subCategory)*/}
                    {/*                            }*/}
                    {/*                            else setSelected([...selected, subCategory])*/}
                    {/*                        }}*/}
                    {/*                    />*/}
                    {/*                </Box>*/}
                    {/*            </Grid>*/}
                    {/*        ))}*/}
                    {/*    </Grid>*/}
                    {/*}*/}
                </Box>
                <Box mt={3} />
                <div className={`${styles.navigator}`}>
                    <span />
                    <div>
                        <Button variant={'outlined'} className={`${styles.transform_text}`}
                                onClick={() => {setCurrentComponent(1)}}
                        >
                            Back
                        </Button>
                        <Button variant={'contained'} className={`${styles.input_margin_transform}`}
                                onClick={() => {
                                    const result = data.filter((each) => each.isSelected === true);
                                    result.map((each) => {delete each.isSelected});
                                    console.log(result);
                                }}
                                // onClick={() => {setCurrentComponent(3)}}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePreferences;