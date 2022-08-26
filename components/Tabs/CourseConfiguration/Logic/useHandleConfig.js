import { getUnixFromDate } from '@/helper/utils.helper';
import { useEffect, useState } from 'react';

export default function useHandleConfig(courseContextData) {
  const { fullCourse, updateCourseMaster } = courseContextData;

  let pubDate = fullCourse.publish_date > 0 ? new Date(fullCourse.publish_date * 1000) : new Date();
  let expDate = fullCourse.expiry_date > 0 ? new Date(fullCourse.expiry_date * 1000) : new Date();

  const [publishDate, setPublishDate] = useState(pubDate);
  const [expireDate, setExpireDate] = useState(expDate);

  // expiry_date
  useEffect(() => {
    updateCourseMaster({
      ...fullCourse,
      expiry_date: getUnixFromDate(expireDate).toString()
    });
  }, [expireDate]);

  // publish_date
  useEffect(() => {
    updateCourseMaster({
      ...fullCourse,
      publish_date: getUnixFromDate(publishDate).toString()
    });
    if (expireDate < publishDate) setExpireDate(publishDate);
  }, [publishDate]);

  return {
    publishDate,
    expireDate,
    setPublishDate,
    setExpireDate
  };
}
