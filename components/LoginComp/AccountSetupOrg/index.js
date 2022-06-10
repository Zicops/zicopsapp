import {Box, Button} from "@mui/material";
import LabeledInput from "../../common/FormComponents/LabeledInput";
import styles from './setupOrg.module.scss';
import {useEffect, useRef, useState} from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const AccountSetupOrg = ({setCurrentComponent}) => {


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
                            inputName: 'org-name',
                            label: 'Organization:',
                            placeholder: 'Auto-populated',
                            // value: ,
                            maxLength: 60
                        }}
                        // changeHandler={() => {}}
                    />
                    <Box mt={3} />
                    <LabeledInput
                        inputOptions={{
                            inputName: 'org-unit',
                            label: 'Organization Unit:',
                            placeholder: 'Auto-populated',
                            // value: ,
                            maxLength: 60
                        }}
                        // changeHandler={() => {}}
                    />
                    <Box mt={3} />
                    <LabeledInput
                        inputOptions={{
                            inputName: 'unique-id',
                            label: 'Unique Id:',
                            placeholder: 'Unique ID',
                            // value: ,
                            maxLength: 60
                        }}
                        // changeHandler={() => {}}
                    />
                    <Box mt={3} />
                    <LabeledInput
                        inputOptions={{
                            inputName: 'org-role',
                            label: 'Organization Role:',
                            placeholder: ' Select Role in the Organization',
                            // value: ,
                            maxLength: 60
                        }}
                        // changeHandler={() => {}}
                    />
                    <Box mt={3} />
                    <LabeledInput
                        inputOptions={{
                            inputName: 'other-role',
                            label: 'Other Role Name:',
                            placeholder: 'Please enter other role name (Avoid acronyms)',
                            // value: ,
                            maxLength: 60
                        }}
                        // changeHandler={() => {}}
                    />
                    <Box mt={3} />
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <span />
                        <Box>
                            <Button variant={'outlined'} sx={{textTransform: 'none'}}
                                    onClick={() => {setCurrentComponent(0)}}
                            >
                                Back
                            </Button>
                            <Button variant={'contained'} sx={{textTransform: 'none', ml: 2}}
                                    onClick={() => {setCurrentComponent(2)}}
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

export default AccountSetupOrg;