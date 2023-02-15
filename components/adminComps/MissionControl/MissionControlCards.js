import ProductTour from '@/components/common/ProductTour';
import ToolTip from '@/components/common/ToolTip';
import { ADMIN_HOME } from '@/components/common/ToolTip/tooltip.helper';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { ProductTourVisible } from '@/state/atoms/productTour.atom';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';

const Card = ({ image, text, width, tooltipTitle, isDisabled = false }) => {
  return (
    <>
      <ToolTip title={tooltipTitle}>
        <div
          className={`card ${isDisabled ? 'disabled' : ''}`}
          // onClick={() => {
          //   sendNotification(
          //     {
          //       title: 'Card Clicked',
          //       body: 'Hopefully Clicked on Labs',
          //       emails: ['vajresh@zicops.com', 'joy@zicops.com']
          //     },
          //     { context: { headers: { 'fcm-token': fcmToken } } }
          //   );
          // }}
        >
          <div className="card_icon">
            <Image src={image} alt="" width={width} height={'70px'} />
          </div>
          <div className="card_text">{text}</div>
        </div>
      </ToolTip>
      <style jsx>
        {`
          .card {
            width: 300px;
            height: 200px;
            background-color: var(--tile-bg);
            color: var(--primary);
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 20px;
            box-shadow: 5px -5px 10px 0 #86868640, -5px 5px 10px 0 #00000080;
            cursor: pointer;
          }
          .card.disabled {
            cursor: no-drop;
          }
          .card:hover {
            background-color: var(--tile-bg);
            box-shadow: 0px 0px 10px 0 #86868640, 10px 0px 10px 0 #00000080;
          }
          .card:active {
            background-color: var(--tile-bg);
            box-shadow: inset 0px 0px 10px 0 #86868640, 10px 0px 10px 0 #00000080;
          }
          .card_icon {
          }
          .card_text {
            margin-top: 20px;
            color: white;
          }
        `}
      </style>
    </>
  );
};
const MissionControlCards = () => {
  const showProductTour = useRecoilValue(ProductTourVisible);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  return (
    <>
      <div className="mission_control_body">
        <div className="contain_icons">
          <div className={`new_row`}>
            <Link href={isDev ? '/admin/analytics/course-dashboard' : ''}>
              <a>
                <Card
                  image="/images/Analytics.png"
                  text="Analytics"
                  width="70px"
                  isDisabled={!isDev}
                  tooltipTitle={ADMIN_HOME.analytics}
                />
              </a>
            </Link>
            <Link href="/admin/user/my-users">
              <a>
                <Card
                  image="/images/UserManagement.png"
                  text="User Management"
                  width="70px"
                  tooltipTitle={ADMIN_HOME.userManagement}
                />
              </a>
            </Link>
            <Link href="/admin/course/my-courses">
              <a>
                <Card
                  image="/images/CourseManagement.png"
                  text="Course Management"
                  width="70px"
                  tooltipTitle={ADMIN_HOME.courseManagement}
                />
              </a>
            </Link>
            <Link href={isDev ? '/admin/vctool' : ''}>
              <a>
                <Card
                  image="/images/TrainingManagement.png"
                  text="Training Management "
                  isDisabled={!isDev}
                  width="70px"
                  tooltipTitle={ADMIN_HOME.trainingManagement}
                />
              </a>
            </Link>

          </div>
          <div className="new_row">
            <Link href="/admin/administration/organization">
              <a>
                <Card
                  image="/images/Administration.png"
                  text="Administration"
                  width="60px"
                  tooltipTitle={ADMIN_HOME.administrationManagement}
                />
              </a>
            </Link>
            <Link href="/admin/exams/my-question-bank">
              <a>
                <Card
                  image="/images/ExamManagement.png"
                  text="Exam Management"
                  width="80px"
                  tooltipTitle={ADMIN_HOME.examsManagement}
                />
              </a>
            </Link>
            <Link href={isDev ? '/admin/vendor/manage-vendor' : ''}>
              <a>
                <Card
                  image="/images/VendorManagement.png"
                  text="Vendor Management"
                  width="80px"
                  isDisabled={!isDev}
                  tooltipTitle={ADMIN_HOME.vendorManagement}
                />
              </a>
            </Link>
            <Card
              image="/images/LabManagement.png"
              text="Lab Management"
              width="80px"
              isDisabled={true}
              tooltipTitle={ADMIN_HOME.labManagement}
            />
          </div>
        </div>
        {showProductTour && <ProductTour showInfoModal={true} />}
      </div>
      <style jsx>
        {`
          .mission_control_body {
            padding: 20px;
            width: 100%;
            height: 100%;
            position: relative;
          }
          .contain_icons {
            position: absolute;
            top: 37%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .new_row {
            display: flex;
            gap: 40px;
            margin-bottom: 40px;
          }
        `}
      </style>
    </>
  );
};

export default MissionControlCards;
