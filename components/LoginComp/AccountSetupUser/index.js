import {Box, Button} from "@mui/material";
import LabeledInput from "../../common/FormComponents/LabeledInput";
import styles from './setupUser.module.scss';
import {useEffect, useRef, useState} from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
            <ThemeProvider theme={createTheme({
                palette: {
                    primary: {
                        main: '#6bcfcf',
                    },
                    mode: 'dark',
                },
            })}>
                <div className={`${styles.container}`}>
                    <LabeledInput
                        inputOptions={{
                            inputName: 'first-name',
                            label: 'Firstname:',
                            placeholder: 'Enter Firstname (Max up to 60 characters)',
                            // value: ,
                            maxLength: 60
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
                                // required={!!isRequired}
                                // disabled={!!isDisabled}
                                // autoComplete={isAutoComplete?.toString()}
                            />
                            <input
                                // type={type}
                                className={`${styles.number} w-100`}
                                name={'Number'}
                                placeholder={'Number'}
                                // value={value}
                                // onChange={() => {}}
                                maxLength={100}
                                // required={!!isRequired}
                                // disabled={!!isDisabled}
                                // autoComplete={isAutoComplete?.toString()}
                            />
                        </div>
                    </div>
                    <Box mt={3} />
                    <div className={`${styles.labeledInputWrapper}`}>
                        <label className="w-100">
                            Profile Picture:
                        </label>
                        <div className={`${styles.upload}`}>
                            <Button variant={'contained'} sx={{textTransform: 'none'}}>
                                Upload Photo
                            </Button>
                            <div>
                                320 x 320 pixels (Recommended)
                            </div>
                            <Button sx={{textTransform: 'none', ml: 2}}>
                                Preview
                            </Button>
                        </div>
                    </div>
                    <Box mt={3} />
                    <Box display={'flex'} justifyContent={'space-between'}>
                       <span />
                       <Box>
                           <Button variant={'outlined'} sx={{textTransform: 'none'}} disabled>
                               Back
                           </Button>
                           <Button variant={'contained'} sx={{textTransform: 'none', ml: 2}}
                                onClick={() => {setCurrentComponent(1)}}
                           >
                               Next
                           </Button>
                       </Box>
                    </Box>

                </div>
            </ThemeProvider>

        </>
    );
}

export default AccountSetupUser;