import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BingeAtom, TopicContentAtom } from '../../../../state/atoms/module.atoms';

export default function useAddBinge() {
  // recoil state
  const [bingeData, setBingeData] = useRecoilState(BingeAtom);
  const topicContent = useRecoilValue(TopicContentAtom);

  // validate the binge input afte input
  useEffect(() => {
    const videoDuration = +topicContent[0]?.duration;
    if (isNaN(videoDuration)) return;

    const { skipIntroDuration, startTimeMin, startTimeSec, showTimeSec, showTimeMin } = bingeData;
    const validatedBingeData = { ...bingeData };
    let isInValidData = false;

    const startTime = +startTimeMin * 60 + +startTimeSec;
    const showTime = +showTimeMin * 60 + +showTimeSec;

    // skip into duration
    if (skipIntroDuration > videoDuration - startTime) {
      validatedBingeData.skipIntroDuration = videoDuration - startTime;
      isInValidData = true;
    }
    if (skipIntroDuration < 0) {
      validatedBingeData.skipIntroDuration = '';
      isInValidData = true;
    }

    // start time
    if (startTimeMin < 0) {
      validatedBingeData.startTimeMin = '';
      isInValidData = true;
    }
    if (startTimeSec < 0) {
      validatedBingeData.startTimeSec = '';
      isInValidData = true;
    }
    if (startTime > videoDuration) {
      isInValidData = true;
      validatedBingeData.startTimeMin = Math.floor(videoDuration / 60);
      validatedBingeData.startTimeSec = videoDuration % 60;
    }

    // show time
    if (showTimeMin < 0) {
      validatedBingeData.showTimeMin = '';
      isInValidData = true;
    }
    if (showTimeSec < 0) {
      validatedBingeData.showTimeSec = '';
      isInValidData = true;
    }
    if (showTime > videoDuration) {
      isInValidData = true;
      validatedBingeData.showTimeMin = Math.floor(videoDuration / 60);
      validatedBingeData.showTimeSec = videoDuration % 60;
    }

    if (isInValidData) {
      setBingeData({
        ...bingeData,
        ...validatedBingeData
      });
    }
  }, [bingeData]);

  // input handler
  function handleBingeInput(e) {
    if (e.target.type === 'checkbox') {
      return setBingeData({
        ...bingeData,
        [e.target.name]: e.target.checked
      });
    }

    const value = e.target.value.length ? +e.target.value : '';

    setBingeData({
      ...bingeData,
      [e.target.name]: isNaN(value) ? '0' : value
    });
  }

  return { handleBingeInput };
}
