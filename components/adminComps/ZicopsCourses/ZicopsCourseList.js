import LatestCourseTable from './LatestCourseTable';

const ZicopsCourseList = () => {
  const zltplPune = '6bc01264-07c2-518e-9b1e-a6fd54249132';

  return (
    <>
      <div className="content-panel">
        {/* <LatestCourseList time={time} /> */}
        <LatestCourseTable zicopsLspId={zltplPune} />
      </div>

      <style jsx>
        {`
          .content-panel {
            margin: 30px 10px 10px 10px;
            color: var(--white);
            box-shadow: -2px 2px 10px 0 #000000, 2px -2px 5px 0 #686868;
            border-radius: 10px;
          }
        `}
      </style>
    </>
  );
};

export default ZicopsCourseList;
