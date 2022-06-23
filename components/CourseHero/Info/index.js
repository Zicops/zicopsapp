import { Skeleton } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { truncateToN } from '../../../helper/common.helper';
import { isLoadingAtom } from '../../../state/atoms/module.atoms';

export default function Info({ name, data }) {
  const isLoading = useRecoilValue(isLoadingAtom);

  return (
    <>
      <div className="float row">
        <div className="col_25" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
            ) : (
              name
            )}
          </span>
          <p>:</p>
        </div>
        <div className="col_75">
          {isLoading ? (
            <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
          ) : data ? (
            truncateToN(data, 60)
          ) : (
            'N/A'
          )}
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
