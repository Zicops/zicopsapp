import { GET_USER_PREFERENCES, userQueryClient } from '@/api/UserQueries';
import { subCategories } from '@/components/LoginComp/ProfilePreferences/Logic/profilePreferencesHelper';
import { getUserData } from '@/helper/loggeduser.helper';
import { useLazyQuery } from '@apollo/client';

export default function useCommonHelper() {
  const [loadUserPreferences] = useLazyQuery(GET_USER_PREFERENCES, {
    client: userQueryClient
  });

  // const [userPrefences, setUserPreferences] = useState([]);

  // useEffect(() => {
  //   console.log('data came', userPrefences);
  // }, [userPrefences]);

  async function getUserPreferences(userLspId = null) {
    const { id } = getUserData();
    const res = await loadUserPreferences({
      variables: { user_id: id }
    }).catch((err) => {
      console.log(err);
      return;
    });
    const data = res?.data?.getUserPreferences;
    const { user_lsp_id } = JSON.parse(sessionStorage.getItem('lspData'));
    // let uLspId = user_lsp_id ? user_lsp_id : userLspId;
    // console.log(user_lsp_id, uLspId);
    console.log(data);
    const prefData = data?.filter((item) => {
      return item?.user_lsp_id === user_lsp_id;
    });
    console.log(prefData);
    const prefArr = [];
    for (let i = 0; i < prefData?.length; i++) {
      for (let j = 0; j < subCategories?.length; j++) {
        if (prefData[i].sub_category === subCategories[j].name) {
          prefArr.push({
            ...subCategories[j],
            user_preference_id: prefData[i]?.user_preference_id,
            sub_category: subCategories[j].name,
            user_id: prefData[i]?.user_id,
            user_lsp_id: prefData[i]?.user_lsp_id,
            is_base: prefData[i]?.is_base,
            is_active: prefData[i]?.is_active
          });
        }
      }
    }
    // setUserPreferences([...prefArr]);
    // if (userPrefences.length > 0) return userPrefences;
    // console.log(userPrefences);
    return prefArr;
  }

  return { getUserPreferences };
}
