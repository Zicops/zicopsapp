import { truncateToN } from '@/helper/common.helper';
import { isLoadingAtom } from '@/state/atoms/module.atoms';
import { Skeleton } from '@mui/material';
import { useRecoilValue } from 'recoil';

export default function Info3({ name, data }) {
  const isLoading = useRecoilValue(isLoadingAtom);

  return (
    <>
      <div className="float">
        <div className="col_50" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#ACACAC' }}>
            {isLoading ? (
              <Skeleton sx={{ bgcolor: 'dimgray' }} variant="text" height={20} width={100} />
            ) : (
              name
            )}
          </span>
          <p>:</p>
        </div>
        <div className="col_50" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
            display: flex;
            justify-content: space-beetween;
          }

          .float p {
          }
        `}
      </style>
    </>
  );
}
