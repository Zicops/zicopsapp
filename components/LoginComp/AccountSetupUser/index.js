import {Box, Button, Dialog, IconButton} from "@mui/material";
import LabeledInput from "../../common/FormComponents/LabeledInput";
import styles from './setupUser.module.scss';
import {useEffect, useRef, useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import LabeledDropdown from "../../common/FormComponents/LabeledDropdown";
import {languages} from '../ProfilePreferences/Logic/profilePreferencesHelper'

const AccountSetupUser = ({setCurrentComponent}) => {

    // const [isPhoneFocus, setIsPhoneFocus] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState()
    const [image, setImage] = useState();
    const [preview, setPreview] = useState('');
    const [pop, setPop] = useState(false);
    const handleClick = () => {
        setPop(true);
    };
    const handleClose = () => {
        setPop(false);
    };

    const myRef = useRef(null);

    useEffect(() => {
        if(image){
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
        }
        else setPreview('')
    }, [image])

    return(
        <>
            <div className={`${styles.container}`}>
                <LabeledInput
                    inputOptions={{
                        inputName: 'first-name',
                        label: 'Firstname:',
                        placeholder: 'Enter Firstname (Max up to 60 characters)',
                        // value: ,
                        maxLength: 60,
                    }}
                    // changeHandler={() => {}}
                />
                <Box mt={3} />
                <LabeledInput
                    inputOptions={{
                        inputName: 'last-name',
                        label: 'Lastname:',
                        placeholder: 'Enter Lastname (Max up to 60 characters)',
                        // value: ,
                        maxLength: 60
                    }}
                    // changeHandler={() => {}}
                />
                <Box mt={3} />
                <LabeledDropdown
                    dropdownOptions={{
                        label: 'Base Language:',
                        placeholder: 'Select Language',
                        options: languages,
                        value: { value: selectedLanguage, label: selectedLanguage }
                    }}
                    changeHandler={(e) => setSelectedLanguage(e.value)}
                />
                <Box mt={3} />
                <LabeledInput
                    inputOptions={{
                        inputName: 'email',
                        label: 'Email:',
                        placeholder: 'Enter Email (ab@zicops.com)',
                        // value: ,
                        maxLength: 60
                    }}
                    // changeHandler={() => {}}
                />
                <Box mt={3} />
                <LabeledInput
                    inputOptions={{
                        inputName: 'number',
                        label: 'Contact Number:',
                        placeholder: 'Enter Phone',
                        // value: ,
                        maxLength: 60
                    }}
                    // changeHandler={() => {}}
                />

                {/*code for ISD Code*/}

                {/*<div className={`${styles.labeledInputWrapper}`}>*/}
                {/*    <label className="w-100">*/}
                {/*        Contact Number:*/}
                {/*    </label>*/}
                {/*    <div ref={myRef} className={`${isPhoneFocus ? styles.emailContainer_focus : styles.emailContainer}`}*/}
                {/*         onClick={() => {setIsPhoneFocus(true)}}*/}
                {/*    >*/}
                {/*        <input*/}
                {/*            // type={type}*/}
                {/*            className={`${styles.code} w-100`}*/}
                {/*            name={'ISD=Code'}*/}
                {/*            placeholder={'ISD Code'}*/}
                {/*            // value={value}*/}
                {/*            // onChange={() => {}}*/}
                {/*            maxLength={100}*/}
                {/*        />*/}
                {/*        <input*/}
                {/*            // type={type}*/}
                {/*            className={`${styles.number} w-100`}*/}
                {/*            name={'Number'}*/}
                {/*            placeholder={'Number'}*/}
                {/*            // value={value}*/}
                {/*            // onChange={() => {}}*/}
                {/*            maxLength={100}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Box mt={3} />
                <div className={`${styles.labeledInputWrapper}`}>
                    <label className="w-100">
                        Profile Picture:
                    </label>
                    <div className={`${styles.upload}`}>
                        <input
                            accept="image/*"
                            onChange={(e) => {
                               const file = e.target.files[0]
                                if(file) setImage(file)
                                else setImage(null)
                            }}
                            id={"materialUpload"}
                            style={{ display: "none" }}
                            type="file"
                        />
                        <Button variant={'contained'} className={`${styles.transform_text}`}
                                onClick={() => {
                                    document.getElementById("materialUpload").click();
                                }}
                        >
                            Upload Photo
                        </Button>
                        <div>
                            320 x 320 pixels (Recommended)
                        </div>
                        <Button onClick={handleClick} disabled={preview === ''} className={`${styles.input_margin_transform_white}`}>
                            Preview
                        </Button>
                        <Dialog
                            open={pop}
                            onClose={handleClose}
                        >
                            <Box
                                py={3}
                                px={3}
                                zIndex={1}
                                width={"450px"}
                                display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"center"}
                                alignItems={"center"}
                            >
                                <Box
                                    width={"100%"}
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                    px={2}
                                >
                                    <Box fontSize={"27px"} fontWeight={600} color={'#FFF'}>
                                        Preview
                                    </Box>
                                    <IconButton onClick={handleClose}>
                                        <CloseIcon sx={{ color: "#FFF" }} />
                                    </IconButton>
                                </Box>
                                <Box mb={5} />
                                <Box
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    width={"300px"}
                                    height={"300px"}
                                    border={"4px dashed #6bcfcf"}
                                    borderRadius={"50%"}
                                    overflow={"hidden"}
                                    m={'auto'}
                                >
                                    <img src={preview} alt={"logo"} height={"100%"} />
                                </Box>
                                <Box mb={4} />
                            </Box>
                        </Dialog>
                    </div>
                </div>
                <Box mt={2} />
                <div className={`${styles.navigator}`}>
                    <span />
                    <div className={`${styles.navigatorBtns}`}>
                        <Button variant={'outlined'} className={`${styles.transform_text}`}>
                            Back
                        </Button>
                        <Button variant={'contained'} className={`${styles.input_margin_transform}`}
                                onClick={() => {setCurrentComponent(1)}}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AccountSetupUser;