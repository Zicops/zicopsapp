import {Box, Button, IconButton} from "@mui/material";
import LabeledInput from "../../common/FormComponents/LabeledInput";
import styles from './setupUser.module.scss';
import {useEffect, useRef, useState} from "react";
import { styled } from '@mui/material/styles';
import {changeHandler} from "../../../helper/common.helper";
import LabeledDropdown from "../../common/FormComponents/LabeledDropdown";
import {languages} from '../ProfilePreferences/Logic/profilePreferencesHelper'


const Input = styled('input')({
    display: 'none',
});

const AccountSetupUser = ({setCurrentComponent}) => {

    // const [isPhoneFocus, setIsPhoneFocus] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState()

    const myRef = useRef(null);

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
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*" id="icon-button-file" type="file" />
                            <Button variant={'contained'} className={`${styles.transform_text}`} aria-label="upload picture" component="span">
                                Upload Photo
                            </Button>
                        </label>
                        <div>
                            320 x 320 pixels (Recommended)
                        </div>
                        <Button className={`${styles.input_margin_transform_white}`}>
                            Preview
                        </Button>
                    </div>
                </div>
                <Box mt={2} />
            </div>
            <div className={`${styles.navigator}`}>
                <span />
                <div>
                    <Button variant={'outlined'} className={`${styles.transform_text}`} disabled>
                        Back
                    </Button>
                    <Button variant={'contained'} className={`${styles.input_margin_transform}`}
                            onClick={() => {setCurrentComponent(1)}}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}

export default AccountSetupUser;