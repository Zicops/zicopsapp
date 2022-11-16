import { GET_USER_EXAM_ATTEMPTS, GET_USER_EXAM_RESULTS, userQueryClient } from '@/api/UserQueries';
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

    const resultRes = await loadQueryDataAsync(
      GET_USER_EXAM_RESULTS,
      { user_ea_details: _examResultsData?.user_ea_details },
      {},
      userQueryClient
    );

    if (resultRes?.error) return setToastMsg({ type: 'danger', message: 'Result Load Error' });

    const allResults = resultRes?.getUserExamResults;

    _examResultsData.allResults = allResults;

    const allUserScore = [];
    for (let i = 0; i < allResults?.length; i++) {
      const resultData = allResults?.[i]?.results?.[0];

      const resultStatus = parseJson(resultData?.result_status);
      console.log(resultData, resultStatus);

      if (resultStatus?.status === 'passed') _examResultsData.usersPassed += 1;
      if (resultStatus?.status === 'failed') _examResultsData.usersFailed += 1;

      allUserScore.push(+resultData?.user_score);
      //     "user_id": "dmFqcmVzaDAwNUBnbWFpbC5jb20=",
      //     "user_ea_id": "cdqfgtafbmogdqll6u6g",
      //     "results": [
      //         {
      //             "user_er_id": "cdqfh02fbmogdqll6u9g",
      //             "user_id": "dmFqcmVzaDAwNUBnbWFpbC5jb20=",
      //             "user_ea_id": "cdqfgtafbmogdqll6u6g",
      //             "user_score": 0,
      //             "correct_answers": 0,
      //             "wrong_answers": 5,
      //             "result_status": "{\"status\":\"failed\",\"totalMarks\":25,\"passingMarks\":15,\"finishedAt\":1668610175}",
      //             "created_by": "vajresh005@gmail.com",
      //             "updated_by": "vajresh005@gmail.com",
      //             "created_at": "1668610176",
      //             "updated_at": "1668610176",
      //             "__typename": "UserExamResult"
      //         }
    }

    _examResultsData.highestMarks = Math.max(...allUserScore);
    _examResultsData.lowestMarks = Math.min(...allUserScore);

    //   https://stackoverflow.com/questions/52139703/average-with-the-reduce-method-in-javascript
    _examResultsData.averageMarks = allUserScore?.reduce(function (avg, value, _, { length }) {
      return avg + value / length;
    }, 0);

    console.log(allAttempts, _examResultsData, allResults);
    setExamResultsData(_examResultsData);
  }, [examId]);

  return { examResultsData };
}
