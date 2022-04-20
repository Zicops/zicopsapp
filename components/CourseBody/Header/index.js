import { Skeleton } from '@mui/material';

export default function Header({ title, expertise }) {
  return (
    <>
      <div className="module-header">
        <div className="heading">
          <h2>
            {title || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={30} width={400} />
            )}
          </h2>
        </div>

        <div className="subheading">
          Expertise Level:
          <span>
            {expertise || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={10} width={150} />
            )}
          </span>
        </div>
      </div>

      {/* move to .scss */}
      <style jsx>
        {`
          .module-header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 15px 0 40px 0;
          }
          .heading {
            margin-top: 20px;
          }
          .subheading {
            display: flex;
            gap: 5px;
            font-size: 13px;
            color: #858f8f;
          }
          .heading h2 {
            font-size: 22px;
            font-weight: normal;
            line-height: 30px;
            color: #ffffff;
          }
        `}
      </style>
    </>
  );
}
