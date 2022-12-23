import SingleNotification from '../SingleNotification';

const AllNotifications = ({ style, data, isNav }) => {
  return (
    <div>
      {data?.map((element) => {
        const { body, img, link, duration, isRead, route, title, fcmMessageId } = element;
        return (
          <SingleNotification
            key={fcmMessageId}
            title={title}
            messageId={fcmMessageId}
            description={body}
            img={img}
            link={link}
            isNav={isNav}
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
