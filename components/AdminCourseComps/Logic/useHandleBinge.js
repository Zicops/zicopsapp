import { BingeDataAtom, getBingeDataObj, TopicContentListAtom } from '@/state/atoms/courses.atom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useHandleBinge() {
  const topicContentList = useRecoilValue(TopicContentListAtom);
  const [binge, setBinge] = useRecoilState(BingeDataAtom);
  const [bingeData, setBingeData] = useState({
    startTimeMin: 0,
    startTimeSec: 0,
    skipIntroDuration: 0,
    showTimeMin: 0,
    showTimeSec: 5,
    isFromEnd: true,
  });

  const defaultTopicContent =
    topicContentList?.find((tc) => tc?.isDefault) || topicContentList?.[0];

  const videoSrc = !!defaultTopicContent?.file
    ? URL?.createObjectURL(defaultTopicContent?.file)
    : defaultTopicContent?.contentUrl;

  useEffect(() => {
    // binge data
    const startTimeMin = Math.floor(parseInt(binge.startTime || 0) / 60);
    const startTimeSec = parseInt(binge.startTime || 0) - startTimeMin * 60;
    const showTime = binge.fromEndTime || binge.nextShowTime;
    const showTimeMin = Math.floor(parseInt(showTime || 0) / 60);
    const showTimeSec = parseInt(showTime || 0) - showTimeMin * 60;

    const _bingeData = {
      startTimeMin: startTimeMin,
      startTimeSec: startTimeSec,
      skipIntroDuration: binge.skipIntroDuration,
      showTimeMin: showTimeMin,
      showTimeSec: showTimeSec,
      isFromEnd: binge.fromEndTime > 0,
    };
    setBingeData(_bingeData);
  }, []);

  // validate the binge input afte input
  useEffect(() => {
    const videoDuration = +defaultTopicContent?.duration;
    if (isNaN(videoDuration)) return;

    const { skipIntroDuration, startTimeMin, startTimeSec, showTimeSec, showTimeMin, isFromEnd } =
      bingeData;
    const validatedBingeData = { ...bingeData };
    let isInValidData = false;

    const startTime = +startTimeMin * 60 + +startTimeSec;
    const showTime = +showTimeMin * 60 + +showTimeSec;

    const validBingeTimeObj = { startTime, showTime };

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
      validBingeTimeObj.startTime =
        +validatedBingeData?.startTimeMin * 60 + +validatedBingeData?.startTimeSec;
      validBingeTimeObj.showTime =
        +validatedBingeData?.showTimeMin * 60 + +validatedBingeData?.showTimeSec;

      setBingeData({ ...bingeData, ...validatedBingeData });
    }

    setBinge(
      getBingeDataObj({
        skipIntroDuration: validatedBingeData.skipIntroDuration,
        startTime: validBingeTimeObj?.startTime,
        nextShowTime: !isFromEnd ? validBingeTimeObj?.showTime : 0,
        fromEndTime: isFromEnd ? validBingeTimeObj?.showTime : 0,
      }),
    );
  }, [bingeData]);

  function handleBingeInput(e) {
    if (e.target.type === 'checkbox') {
      return setBingeData({ ...bingeData, [e.target.name]: e.target.checked });
    }

    const value = e.target.value.length ? +e.target.value : '';

    setBingeData({ ...bingeData, [e.target.name]: isNaN(value) ? '0' : value });
  }

  return { videoSrc, bingeData, handleBingeInput };
}
