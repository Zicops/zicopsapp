import {Box, Button} from "@mui/material";
import LabeledInput from "../../common/FormComponents/LabeledInput";
import styles from './setupOrg.module.scss';
import LabeledDropdown from "../../common/FormComponents/LabeledDropdown";
import {roleList} from "../ProfilePreferences/Logic/profilePreferencesHelper";
import {useState} from "react";

const AccountSetupOrg = ({setCurrentComponent}) => {

    const [role, setRole] = useState()

    return(
        <>
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
                <LabeledDropdown
                    dropdownOptions={{
                        label: 'Organization Role:',
                        placeholder: ' Select Role in the Organization',
                        options: roleList,
                        value: { value: role, label: role }
                    }}
                    changeHandler={(e) => setRole(e.value)}
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
            </div>
            <div className={`${styles.navigator}`}>
                <span />
                <div className={`${styles.navigatorBtns}`}>
                    <Button variant={'outlined'} className={`${styles.transform_text}`}
                            onClick={() => {setCurrentComponent(0)}}
                    >
                        Back
                    </Button>
                    <Button variant={'contained'} className={`${styles.input_margin_transform}`}
                            onClick={() => {setCurrentComponent(2)}}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}

export default AccountSetupOrg;