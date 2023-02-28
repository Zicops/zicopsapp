import { Skeleton } from '@mui/material';

export default function Header({ title, description, expertise }) {
  return (
    <>
      <div className="module-header">
        <div className="heading">
          <h2>
            {title || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={30} width={300} />
            )}
          </h2>
        </div>

        <div className="subheading">
          {/* Description: */}
          <span>
            {description || (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={450} />
            )}
          </span>
        </div>

        <div className="subheading">
          
          <span>
            {expertise ? 'Expertise Level : ' + expertise : (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={150} />
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
            padding: 15px 0;
          }
          .heading {
            margin-top: 5px;
          }
          .subheading {
            display: flex;
            gap: 5px;
            font-size: 14px;
            color: var(--dark_three);
            margin: 5px 0;
            max-width: 800px;
            text-align: center;
          }
          .heading h2 {
            font-size: 22px;
            font-weight: normal;
            line-height: 30px;
            color: var(--white);
          }
        `}
      </style>
    </>
  );
}
