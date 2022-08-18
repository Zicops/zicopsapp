import React from 'react';
import SingleNotification from '../SingleNotification';

const AllNotifications = ({ style, customStyle, data }) => {
  return (
    <div>
      {data.map((element) => {
        const { description, img, link, duration, status } = element;
        return (
          <SingleNotification
            description={description}
            img={img}
            link={link}
            duration={duration}
            status={status}
            style={style}
            customStyle={customStyle}
          />
        );
      })}
    </div>
  );
};

export default AllNotifications;
