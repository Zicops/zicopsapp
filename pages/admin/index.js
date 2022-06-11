import MissionControlCards from '../../components/adminComps/MissionControl/MissionControlCards';
import MissionControlHeader from '../../components/adminComps/MissionControl/MissionControlHeader';

export default function AdminHome() {
  return (
    <>
      <div className="content">
        <MissionControlHeader />
        <MissionControlCards />
      </div>

      <style jsx>
        {`
          .content {
            background-color: var(--tile-bg);
            margin-top: 70px;
            height: calc(100vh - 70px);
          }
        `}
      </style>
    </>
  );
}
