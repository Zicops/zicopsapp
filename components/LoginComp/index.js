import styles from './login.module.scss';
import {useState} from "react";
import {Box, Container, Divider} from "@mui/material";
import AccountSetupUser from "./AccountSetupUser";
import AccountSetupOrg from "./AccountSetupOrg";
import ProfilePreferences from "./ProfilePreferences";
import SubCategoriesPreview from "./SubCategoriesPreview";

const LoginComp = () => {
    const [currentComponent, setCurrentComponent] = useState(0);

    const [selected, setSelected] = useState([])

    const getHeader = () => {
        if(currentComponent === 0)
            return 'Personal Details'
        if(currentComponent === 1)
            return 'Organization Details'
        if(currentComponent === 2)
            return 'Profile Preferences'
        if(currentComponent === 3)
            return 'Profile Preferences'
    }

    return (
        // <div style={{width: '100%', height: '100vh', position: 'relative'}}>
            <div className={`${styles.bgContainer}`}>
                <div className={`${styles.header}`}>
                    <div className={`${styles.ZicopsLogo}`}>
                        <img src="./images/zicops-header-logo.png" alt="not found" />
                    </div>
                    <div className={`${styles.progress_container}`}>
                        <div className={`${styles.progress_circle_selected}`} />
                        <div
                            className={`${
                                currentComponent === 0 ? styles.progress_line : styles.progress_line_selected
                            }`}
                        />
                        <div
                            className={`${
                                currentComponent === 0 ? styles.progress_circle : styles.progress_circle_selected
                            }`}
                        />
                        <div
                            className={`${
                                currentComponent === 2 || currentComponent === 3 ? styles.progress_line_selected : styles.progress_line
                            }`}
                        />
                        <div
                            className={`${
                                currentComponent === 2 || currentComponent === 3 ? styles.progress_circle_selected : styles.progress_circle
                            }`}
                        />
                    </div>
                    <div className={`${styles.account_setup_title}`}>
                       <div>
                           Account Setup:
                       </div>
                        <p>
                            {getHeader()}
                        </p>
                    </div>
                </div>
                <Container maxWidth={'md'} className={`${styles.container}`}>
                    {currentComponent === 0 && <AccountSetupUser setCurrentComponent={setCurrentComponent} />}
                    {currentComponent === 1 && <AccountSetupOrg setCurrentComponent={setCurrentComponent} />}
                    {currentComponent === 2 && (
                        <ProfilePreferences selected={selected} setSelected={setSelected} setCurrentComponent={setCurrentComponent} />
                    )}
                    {currentComponent === 3 && <SubCategoriesPreview selected={selected} setSelected={setSelected} setCurrentComponent={setCurrentComponent} />}
                </Container>
            </div>
        // </div>
    );
};

export default LoginComp;
