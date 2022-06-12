import {Box, Button} from "@mui/material";
import LabeledInput from "../../common/FormComponents/LabeledInput";
import styles from './setupOrg.module.scss';

const AccountSetupOrg = ({setCurrentComponent}) => {


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
                <div className={`${styles.navigator}`}>
                    <span />
                    <div>
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

            </div>
        </>
    );
}

export default AccountSetupOrg;