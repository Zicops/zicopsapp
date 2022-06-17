import styles from './login.module.scss';
import {useState} from "react";
import {Box, Container, Divider} from "@mui/material";
import AccountSetupUser from "./AccountSetupUser";
import AccountSetupOrg from "./AccountSetupOrg";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ProfilePreferences from "./ProfilePreferences";

const LoginComp = () => {

    const [currentComponent, setCurrentComponent]  = useState(2)

    return (
        <ThemeProvider theme={createTheme({
            palette: {
                primary: {
                    main: '#6bcfcf',
                },
                mode: 'dark',
            },
        })}>
            <div className={`${styles.bgContainer}`}>
                <Container maxWidth={'md'} className={`${styles.container}`}>
                    <div className={`${styles.ZicopsLogo}`}>
                        <img src="./images/zicops-header-logo.png" alt="not found" />
                    </div>
                    <div className={`${styles.progress_container}`}>
                        <div className={`${styles.progress_circle_selected}`} />
                        <div className={`${currentComponent === 0 ? styles.progress_line : styles.progress_line_selected}`} />
                        <div className={`${currentComponent === 0 ? styles.progress_circle : styles.progress_circle_selected}`} />
                        <div className={`${currentComponent === 2 ? styles.progress_line_selected : styles.progress_line}`} />
                        <div className={`${currentComponent === 2 ? styles.progress_circle_selected : styles.progress_circle}`} />
                    </div>
                    <div className={`${styles.account_setup_title}`}>
                        Account Setup
                    </div>
                    {
                        currentComponent === 0 && <AccountSetupUser setCurrentComponent={setCurrentComponent} />
                    }
                    {
                        currentComponent === 1 && <AccountSetupOrg setCurrentComponent={setCurrentComponent} />
                    }
                    {
                        currentComponent === 2 && <ProfilePreferences setCurrentComponent={setCurrentComponent} />
                    }
                </Container>
            </div>
        </ThemeProvider>

    );
};

export default LoginComp;
