import { Pagination, PaginationItem } from '@mui/material';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector
} from '@mui/x-data-grid';
import Image from 'next/image';
import styles from '../zicopsSimpleTable.module.scss';

export default function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      classes={{ ul: 'paginationStyle' }}
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => (
        <>
          <button
            className={`${styles.previousBtn}`}
            onClick={() => apiRef.current?.setPage(page - 1)}
            disabled={page == 0}>
            <Image src={'/images/bigarrowleft.png'} height={25} width={25} alt="" />
          </button>

          <button
            className={`${styles.nextBtn}`}
            onClick={() => apiRef.current?.setPage(page + 1)}
            disabled={page + 1 === pageCount}>
            <Image src={'/images/bigarrowright.png'} height={25} width={25} alt="" />
          </button>
          <PaginationItem {...props2} disableRipple />
        </>
      )}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
