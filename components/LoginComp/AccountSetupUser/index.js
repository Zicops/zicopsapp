import {Box, Button, IconButton} from "@mui/material";
import LabeledInput from "../../common/FormComponents/LabeledInput";
import styles from './setupUser.module.scss';
import {useEffect, useRef, useState} from "react";
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

const AccountSetupUser = ({setCurrentComponent}) => {

    const [isPhoneFocus, setIsPhoneFocus] = useState(false);

    const myRef = useRef(null);
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * close dialog if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsPhoneFocus(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    useOutsideAlerter(myRef);

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
                <LabeledInput
                    inputOptions={{
                        inputName: 'base-lang',
                        label: 'Base Language:',
                        placeholder: 'Select base language',
                        // value: ,
                        maxLength: 60
                    }}
                    // changeHandler={() => {}}
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
                <div className={`${styles.labeledInputWrapper}`}>
                    <label className="w-100">
                        Contact Number:
                    </label>
                    <div ref={myRef} className={`${isPhoneFocus ? styles.emailContainer_focus : styles.emailContainer}`}
                         onClick={() => {setIsPhoneFocus(true)}}
                    >
                        <input
                            // type={type}
                            className={`${styles.code} w-100`}
                            name={'ISD=Code'}
                            placeholder={'ISD Code'}
                            // value={value}
                            // onChange={() => {}}
                            maxLength={100}
                        />
                        <input
                            // type={type}
                            className={`${styles.number} w-100`}
                            name={'Number'}
                            placeholder={'Number'}
                            // value={value}
                            // onChange={() => {}}
                            maxLength={100}
                        />
                    </div>
                </div>
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
                        <Button className={`${styles.input_margin_transform}`}>
                            Preview
                        </Button>
                    </div>
                </div>
                <Box mt={3} />
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

            </div>
        </>
    );
}

export default AccountSetupUser;