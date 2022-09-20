import { GET_USER_LEARNINGSPACES, userQueryClient } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { getUserData } from '@/helper/loggeduser.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import AccountBlob from './AccountBlob';
import styles from './userAccountSelect.module.scss';

const UserAccountSelect = () => {

    const [lspList , setLspList] = useState([]);
    const [toastMsg , setToastMsg] = useRecoilState(ToastMsgAtom);

    function selectedAccount(item){
    console.log(item);
    if(!item?.user_lsp_id) return ;
    // sessionStorage?.setItem('lspData',JSON.stringify({...item}));

    }


    useEffect(async()=>{
        const {id} = getUserData();
        console.log(id);
        if(!id) return;
        const res = await loadQueryDataAsync(GET_USER_LEARNINGSPACES,{user_id:id},{},userQueryClient);
        if(res?.error) return setToastMsg({type:'info' , messsage:'No user Learning Spaces found'});
        setLspList([...res?.getUserLsps])
    },[])
  return (
    <>
      <div className={`${styles.container}`}>

        {
            lspList?.map((item , index)=>{
                return <div key={index}><AccountBlob lspData={item} handleClick={selectedAccount}/></div>
            })
        }
        
      </div>
    </>
  );
};

export default UserAccountSelect;
