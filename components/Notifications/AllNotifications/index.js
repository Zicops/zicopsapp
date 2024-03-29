import { ReadNotificationsAtom } from '@/state/atoms/notification.atom';
import { useRecoilValue } from 'recoil';
import styles from '../notification.module.scss';
import SingleNotification from '../SingleNotification';

const AllNotifications = ({ style, data, isNav }) => {
  const readNotification = useRecoilValue(ReadNotificationsAtom);
  const routeObj = {
    course: {
      signinassign: {
        text: 'Go to courses',
        routeUrl: '/my-profile?tabName=Courses',
        routeAsUrl: '/my-profile'
      },
      assigned: {
        text: 'Go to course'
      },
      unassigned: {
        text: 'Go to learning folder',
        routeUrl: '/self-landing',
        routeAsUrl: '/self-landing'
      }
    },
    cohort: {
      mapped: {
        text: 'Go to cohort',
        routeUrl: '/my-profile?tabName=Cohort',
        routeAsUrl: '/my-profile'
      },
      unmapped: {
        text: 'Go to cohorts',
        routeUrl: '/my-profile?tabName=Cohort',
        routeAsUrl: '/my-profile'
      }
    }
  };
  return (
    <div>
      {!data?.length && <strong className={`${styles.fallbackMsg}`}>No new notifications</strong>}
      {data?.map((element) => {
        let { body, img, link, duration, route, title, fcmMessageId } = element;
        let isRead = false;
        if (readNotification.includes(fcmMessageId)) {
          isRead = true;
        } else {
          isRead = element?.isRead;
        }
        const text = title?.split('-');
        let linkAndRoute =
          routeObj?.[`${text?.[0]?.toLowerCase()}`]?.[`${text?.[1]?.toLowerCase()}`];
        if (!linkAndRoute) linkAndRoute = null;
        if (!linkAndRoute?.routeUrl)
          linkAndRoute = Object.assign({
            text: linkAndRoute?.text,
            routeAsUrl: link,
            routeUrl: link
          });

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
            routeObj={linkAndRoute}
          />
        );
      })}
    </div>
  );
};

export default AllNotifications;
