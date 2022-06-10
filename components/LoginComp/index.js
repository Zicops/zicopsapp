import styles from './login.module.scss';
import {useState} from "react";
import {Box, Container, Divider} from "@mui/material";
import AccountSetupUser from "./AccountSetupUser";
import AccountSetupOrg from "./AccountSetupOrg";

const LoginComp = () => {

    const [currentComponent, setCurrentComponent]  = useState(0)

    return (
        <div className={`${styles.container}`}>
            <Container maxWidth={'md'} sx={{px: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div className={`${styles.ZicopsLogo}`}>
                    <img src="./images/zicops-header-logo.png" alt="not found" />
                </div>
                <Box mt={4} mb={1} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box width={'32px'} height={'32px'} bgcolor={'#6bcfcf'} borderRadius={'50%'} />
                    <Box border={`2px solid ${currentComponent === 0 ? '#5C5C5C' : '#6bcfcf'}`} height={'2px'} width={'calc(50% - 24px)'} />
                    <Box width={'32px'} height={'32px'} bgcolor={currentComponent === 0 ? '#5C5C5C' : '#6bcfcf'} borderRadius={'50%'} />
                    <Box border={`2px solid ${currentComponent === 2 ? '#6bcfcf' : '#5C5C5C'}`} height={'2px'} width={'calc(50% - 24px)'} />
                    <Box width={'32px'} height={'32px'} bgcolor={currentComponent === 2 ? '#6bcfcf' : '#5C5C5C'} borderRadius={'50%'} />
                </Box>
                <Box color={'#FFF'} fontSize={'30px'} fontWeight={600} mb={3}>
                    Account Setup
                </Box>
                {
                    currentComponent === 0 && <AccountSetupUser setCurrentComponent={setCurrentComponent} />
                }
                {
                    currentComponent === 1 && <AccountSetupOrg setCurrentComponent={setCurrentComponent} />
                }
            </Container>
        </div>
    );
};

export default LoginComp;
