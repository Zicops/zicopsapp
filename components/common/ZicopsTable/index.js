import StyledDataGrid from '../../common/StyledDataGrid';
import {
  CustomAscendingIcon,
  CustomDescendingIcon, CustomPagination
} from './Logic/zicopsTable.helper';

const ZicopsTable = ({ columns, data, pageSize, rowsPerPageOptions, tableHeight }) => {
  return (
    <div style={{ height: tableHeight }}>
      <StyledDataGrid
        rows={data || []}
        columns={columns}
        sx={{
          border: 0,
          pt: 2,
          pb: 2,
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