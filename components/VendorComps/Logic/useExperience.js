import React from 'react';
import { months, years } from '@/helper/utils.helper';
import { VendorExperiencesAtom } from '@/state/atoms/vendor.atoms';
import { useRecoilState } from 'recoil';
export default function useExperience() {
  const optionMonthArray = months.map((val) => ({
    label: val,
    value: val
  }));

  const _years = years;
  const optionYearArray = _years.map((val) => ({
    label: val,
    value: val
  }));
  const [experiencesData, setExperiencesData] = useRecoilState(VendorExperiencesAtom);
  return { experiencesData, setExperiencesData, optionMonthArray, optionYearArray };
}
