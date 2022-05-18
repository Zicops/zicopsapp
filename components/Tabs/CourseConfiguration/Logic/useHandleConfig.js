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
      expiry_date: Math.floor(expireDate / 1000).toString()
    });
  }, [expireDate]);

  // publish_date
  useEffect(() => {
    updateCourseMaster({
      ...fullCourse,
      publish_date: Math.floor(publishDate / 1000).toString()
    });
  }, [publishDate]);

  return {
    publishDate,
    expireDate,
    setPublishDate,
    setExpireDate
  };
}
