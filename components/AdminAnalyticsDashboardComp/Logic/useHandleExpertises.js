import { COURSE_EXPERTISES } from '@/helper/constants.helper';
import { CourseTypeAtom } from '@/state/atoms/module.atoms';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getAllCourseCountBasedOnExpertises } from './adminAnalyticsDashboardComp.helper';
import styles from '../adminAnalyticsDashboard.module.scss';

export default function useHandleExpertises() {
  const courseType = useRecoilValue(CourseTypeAtom);
  const [vennDiagramData, setVennDiagramData] = useState(null);

  useEffect(() => {
    const _lspId = sessionStorage.getItem('lsp_id');

    loadAndSetData();

    async function loadAndSetData() {
      const allExpertiseCount = getAllCourseCountBasedOnExpertises(
        _lspId,
        courseType,
        COURSE_EXPERTISES?.join(',')
      );
      const beginnerCompetentCount = getAllCourseCountBasedOnExpertises(
        _lspId,
        courseType,
        COURSE_EXPERTISES?.slice(0, 2)?.join(',')
      );
      const competentProficientCount = getAllCourseCountBasedOnExpertises(
        _lspId,
        courseType,
        COURSE_EXPERTISES?.slice(1, 3)?.join(',')
      );
      const beginnerProficientCount = getAllCourseCountBasedOnExpertises(
        _lspId,
        courseType,
        [COURSE_EXPERTISES[0], COURSE_EXPERTISES[2]]?.join(',')
      );
      const beginnerCount = getAllCourseCountBasedOnExpertises(
        _lspId,
        courseType,
        COURSE_EXPERTISES[0]
      );
      const competentCount = getAllCourseCountBasedOnExpertises(
        _lspId,
        courseType,
        COURSE_EXPERTISES[1]
      );
      const proficientCount = getAllCourseCountBasedOnExpertises(
        _lspId,
        courseType,
        COURSE_EXPERTISES[2]
      );

      setVennDiagramData([
        {
          key: ['Beginner'],
          data: await beginnerCount,
          color: '#6BCFCF'
        },
        { key: ['Competent'], data: await competentCount, color: '#856BCF' },
        { key: ['Proficient'], data: await proficientCount, color: '#6BCF75' },
        { key: ['Beginner', 'Competent'], data: await beginnerCompetentCount },
        { key: ['Competent', 'Proficient'], data: await competentProficientCount },
        { key: ['Beginner', 'Proficient'], data: await beginnerProficientCount },
        {
          key: ['Beginner', 'Competent', 'Proficient'],
          data: await allExpertiseCount,
          color: '#242630'
        }
      ]);
      console.table([
        [COURSE_EXPERTISES[0], await beginnerCount],
        [COURSE_EXPERTISES[1], await competentCount],
        [COURSE_EXPERTISES[2], await proficientCount],
        ['B + C', await beginnerCompetentCount],
        ['C + P', await competentProficientCount],
        ['B + P', await beginnerProficientCount],
        ['B + C + P', await allExpertiseCount]
      ]);
    }
  }, [courseType]);

  return { vennDiagramData };
}
