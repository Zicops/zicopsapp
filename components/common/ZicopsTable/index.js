import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import StyledDataGrid from '../../common/StyledDataGrid';
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector
} from '@mui/x-data-grid';
import {
    CustomPagination,
    CustomAscendingIcon,
    CustomDescendingIcon
} from './Logic/zicopsTable.helper';

import styles from './zicopsTable.module.scss';
const ZicopsTable = ({ columns, data, pageSize, rowsPerPageOptions, tableHeight }) => {
  return (
    <div style={{ height: tableHeight }}>
      <StyledDataGrid
        rows={data}
        columns={columns}
        sx={{
          border: 0,
          pt: 2,
          pb: 0,
          px: 5,
          color: '#fff'
        }}
        autoHeight={false}
        disableSelectionOnClick
        components={{
          Pagination: CustomPagination,
          ColumnSortedDescendingIcon: CustomDescendingIcon,
          ColumnSortedAscendingIcon: CustomAscendingIcon
        }}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        pagination
      />
    </div>
  );
};
 
export default ZicopsTable;