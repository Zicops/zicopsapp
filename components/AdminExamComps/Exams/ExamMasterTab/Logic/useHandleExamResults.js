import {
  GET_USER_DETAIL,
  GET_USER_EXAM_ATTEMPTS,
  GET_USER_EXAM_RESULTS,
  userQueryClient
} from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { parseJson } from '@/helper/utils.helper';
import { ToastMsgAtom } from '@/state/atoms/toast.atom';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export default function useHandleExamResults() {
  const [examResultsData, setExamResultsData] = useState({});

  const [toastMsg, setToastMsg] = useRecoilState(ToastMsgAtom);

  const router = useRouter();
  const examId = router.query?.examId;

  useEffect(async () => {
    if (!examId) return;

    // user attempts
    const attemptRes = await loadQueryDataAsync(
      GET_USER_EXAM_ATTEMPTS,
      { exam_id: examId },
      {},
      userQueryClient
    );
    if (attemptRes?.error) return setToastMsg({ type: 'danger', message: 'Attempts Load Error' });

    const allAttempts = attemptRes?.getUserExamAttempts;
    const _examResultsData = {
      allUserIds: [],
      user_ea_details: [],

      allAttempts: allAttempts,
      allResults: [],

      usersPassed: 0,
      usersFailed: 0,

      highestMarks: null,
      lowestMarks: null,
      averageMarks: null
    };
    for (let i = 0; i < allAttempts?.length; i++) {
      const attempt = allAttempts?.[i];
      //   console.log(attempt);
      // attempt_duration: '41';
      // attempt_no: 1;
      // attempt_start_time: '1668608000';
      // attempt_status: 'completed';

      // exam_id: 'cdmvknifbmon81o0n6n0';

      // user_course_id: 'cdmvatjq7qtpqikkvrn0';
      // user_cp_id: 'cdouhfifbmomgs0e869g';
      // user_ea_id: 'cdqf00afbmogdqll6u30';

      // user_id: 'dmFqcmVzaDAwNUBnbWFpbC5jb20=';
      _examResultsData?.allUserIds?.push(attempt?.user_id);

      // this is added because next query fails if no exam result exists even for one attempt
      if (attempt?.attempt_status === 'completed') {
        _examResultsData?.user_ea_details?.push({
          user_id: attempt?.user_id,
          user_ea_id: attempt?.user_ea_id
        });
      }
    }

    // attempt results
    let resultRes = null;
    if (_examResultsData?.user_ea_details?.length) {
      resultRes = loadQueryDataAsync(
        GET_USER_EXAM_RESULTS,
        { user_ea_details: _examResultsData?.user_ea_details },
        {},
        userQueryClient
      );

      if (resultRes?.error) return setToastMsg({ type: 'danger', message: 'Result Load Error' });
    }

    // user details
    const userData = [];
    if (_examResultsData?.allUserIds?.length) {
      const userDetailsRes = await loadQueryDataAsync(
        GET_USER_DETAIL,
        { user_id: [...new Set(_examResultsData?.allUserIds)] },
        {},
        userQueryClient
      );

      if (userDetailsRes?.error)
        return setToastMsg({ type: 'danger', message: 'User Data Load Error' });

      userData.push(...userDetailsRes?.getUserDetails);
    }

    const results = await resultRes;
    const allResults = results?.getUserExamResults;
    if (allResults?.length) {
      _examResultsData.allResults = allResults;

      const allUserScore = [];
      for (let i = 0; i < allResults?.length; i++) {
        const resultData = allResults?.[i]?.results?.[0];

        const resultStatus = parseJson(resultData?.result_status);
        console.log(resultData, resultStatus);

        if (resultStatus?.status === 'passed') _examResultsData.usersPassed += 1;
        if (resultStatus?.status === 'failed') _examResultsData.usersFailed += 1;

        allUserScore.push(+resultData?.user_score);
      }

      _examResultsData.highestMarks = Math.max(...allUserScore);
      _examResultsData.lowestMarks = Math.min(...allUserScore);

      //   https://stackoverflow.com/questions/52139703/average-with-the-reduce-method-in-javascript
      _examResultsData.averageMarks = allUserScore?.reduce(function (avg, value, _, { length }) {
        return avg + value / length;
      }, 0);
    }

    _examResultsData?.allAttempts?.forEach((attempt) => {
      attempt.userData = userData?.find((d) => d?.id === attempt?.user_id);
      attempt.resultData =
        _examResultsData?.allResults?.find((r) => r?.user_ea_id === attempt?.user_ea_id) || null;
    });

    console.log(allAttempts, _examResultsData);
    setExamResultsData(_examResultsData);
  }, [examId]);

  return { examResultsData };
}
