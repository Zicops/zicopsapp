import { userClient } from '@/api/UserMutations';
import { GET_COURSE_VIEWS } from '@/api/UserQueries';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { sortArrByKeyInOrder } from '@/helper/data.helper';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function useHandleCourseViews() {
  const [courseViews, setCourseViews] = useState([]);
  const [filterBy, setFilterBy] = useState('Month');
  const [selectedDate, setSelectedDate] = useState({
    start: moment().startOf('month'),
    end: moment().endOf('month')
  });

  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    loadAndSetData();

    async function loadAndSetData() {
      const dateFormat = 'YYYY-MM-DD';
      const queryVariables = {
        lsp_id: [_lspId],
        startTime: selectedDate?.start?.format(dateFormat),
        endTime: selectedDate?.end?.format(dateFormat)
      };

      const courseStats = await loadQueryDataAsync(
        GET_COURSE_VIEWS,
        queryVariables,
        {},
        userClient
      );

      const allDates = [];
      for (
        let i = 0;
        allDates[allDates?.length - 1]?.date_string !== selectedDate?.end.format(dateFormat);
        i++
      ) {
        const startDate = new Date(selectedDate.start.valueOf());
        const currentDate = startDate.setDate(startDate.getDate() + i);
        const dateString = moment(currentDate).format(dateFormat);

        const dataFromBackend =
          courseStats?.getCourseViews?.find((obj) => obj?.date_string === dateString) || {};
        allDates.push({
          seconds: 0,
          lsp_id: _lspId,
          user_ids: [],
          date_string: dateString,
          index: i + 1,
          ...dataFromBackend
        });
      }
      setCourseViews(allDates);
    }
  }, [selectedDate?.start, selectedDate.end]);

  useEffect(() => {
    if (filterBy === 'Month') {
      setSelectedDate({
        start: moment(selectedDate.start.valueOf()).startOf('month'),
        end: moment(selectedDate.end.valueOf()).endOf('month')
      });
    } else {
      setSelectedDate({
        start: moment(selectedDate.start.valueOf()).startOf('week'),
        end: moment(selectedDate.start.valueOf()).endOf('week')
      });
    }
  }, [filterBy]);

  return { courseViews, selectedDate, setSelectedDate, filterBy, setFilterBy };
}
