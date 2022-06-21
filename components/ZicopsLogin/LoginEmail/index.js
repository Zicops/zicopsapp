import styles from './loginEmail.module.scss';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useEffect, useState} from "react";
const LoginEmail = ({ chngeHandle, type, placeholder }) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
       if(show){
           setTimeout(() => {
               setShow(false)
           }, 3000)
       }
    }, [show])

    const handleShowPassword = () => {
      setShow(true)
    }

  return (
    <div className={`${styles.login_email}`}>
      <input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        onFocus={chngeHandle}
        autoComplete={'off'}
        // style={{ margin: '5px 0px' }}
      />
        <button onClick={handleShowPassword}>
            {
               show ? (<VisibilityOff color={'primary'} />) : (<Visibility color={'primary'}/>)
            }

        </button>
    </div>
  );
};

export default LoginEmail;
