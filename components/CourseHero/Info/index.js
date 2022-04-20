import { Skeleton } from '@mui/material';

export default function Info({ name, data }) {
  return (
    <>
      <div className="float row">
        <div className="col_25" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            {data ? (
              name
            ) : (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
            )}
          </span>
          <p>:</p>
        </div>
        <div className="col_75">
          {data || <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />}
        </div>
      </div>

      {/* move to .scss */}
      <style jsx>
        {`
          .float {
            padding-bottom: 1vh;
          }

          .float p {
            float: right;
            padding-right: 1vw;
          }
        `}
      </style>
    </>
  );
}
