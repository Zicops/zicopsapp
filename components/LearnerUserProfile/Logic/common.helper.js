import { GET_USER_PREFERENCES, userQueryClient } from '@/api/UserQueries';
import { subCategories } from '@/components/LoginComp/ProfilePreferences/Logic/profilePreferencesHelper';
import { useLazyQuery } from '@apollo/client';
import { useState } from 'react';

export default function useCommonHelper() {
  const [loadUserPreferences] = useLazyQuery(GET_USER_PREFERENCES, {
    client: userQueryClient
  });

  const [userPrefences, setUserPreferences] = useState([]);

  async function sendUserPreferences() {
    const res = await loadUserPreferences().catch((err) => {
      console.log(err);
      return;
    });
    console.log(res?.data?.getUserPreferences);
    const data = res?.data?.getUserPreferences;
    const { user_lsp_id } = JSON.parse(sessionStorage.getItem('lspData'));
    const prefData = data.filter((item) => {
      return item?.user_lsp_id === user_lsp_id;
    });
    const prefArr = [];
    for (let i = 0; i < prefData.length; i++) {
      for (let j = 0; j < subCategories.length; j++) {
        if (prefData[i].sub_category === subCategories[j].name) {
          prefArr.push({
            ...subCategories[j],
            user_preference_id: prefData[i]?.user_preference_id
          });
        }
      }
    }
    setUserPreferences([...prefArr]);
    return;
  }

  return { sendUserPreferences, userPrefences };
}
