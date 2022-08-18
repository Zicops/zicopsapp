import React from 'react';
import SingleNotification from '../SingleNotification';

const AllNotifications = ({ style, data }) => {
  return (
    <div>
      {data.map((element) => {
        const { description, img, link, duration, status,route } = element;
        return (
          <SingleNotification
            description={description}
            img={img}
            link={link}
            duration={duration}
            status={status}
            style={style}
            route={route}
          />
        );
      })}
    </div>
  );
};

export default AllNotifications;
