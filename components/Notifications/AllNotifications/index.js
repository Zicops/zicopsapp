import SingleNotification from '../SingleNotification';

const AllNotifications = ({ style, data }) => {
  return (
    <div>
      {data?.map((element) => {
        const { body, img, link, duration, isRead, route, title } = element;
        return (
          <SingleNotification
            description={body}
            img={img}
            link={link}
            duration={duration}
            status={isRead}
            style={style}
            route={route}
          />
        );
      })}
    </div>
  );
};

export default AllNotifications;
