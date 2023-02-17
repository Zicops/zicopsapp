import { useRef } from 'react';
import StyledDataGrid from '../../common/StyledDataGrid';
import TableSearchComp from '../TableSearchComp';
import {
  CustomAscendingIcon,
  CustomColumnMenu,
  CustomDescendingIcon,
  CustomPagination
} from './Logic/zicopsTable.helper';

const ZicopsTable = ({
  columns,
  data,
  pageSize,
  rowsPerPageOptions,
  tableHeight = '70vh',
  customStyles = {},
  loading = false,
  hideFooterPagination = false,
  showCustomSearch = false,
  searchProps = {},
  onPageChange = () => {},
  currentPage = null,
  customId = null,
  customPaginationUiComp = null
}) => {
  const tableContainerRef = useRef(null);
  const customProps = {};

  const tableBody = tableContainerRef?.current?.getElementsByClassName(
    'MuiDataGrid-virtualScroller'
  )?.[0];

  const height = tableBody?.offsetHeight || null;

  if (data?.length >= pageSize && height) customProps.rowHeight = height / pageSize;
  if (!!customId) customProps.getRowId = (row) => row?.[customId];

  return (
    <>
      {!!showCustomSearch && <TableSearchComp {...searchProps} />}

      <div style={{ height: tableHeight }}>
        <StyledDataGrid
          {...customProps}
          ref={tableContainerRef}
          rows={data || []}
          columns={columns}
          sx={{
            border: 0,
            pt: 2,
            pb: 2,
            px: 5,
            color: '#fff'
          }}
          style={customStyles}
          hideFooterPagination={hideFooterPagination}
          autoHeight={false}
          disableColumnMenu={true}
          disableSelectionOnClick
          onPageChange={onPageChange}
          components={{
            Pagination: CustomPagination,
            ColumnSortedDescendingIcon: CustomDescendingIcon,
            ColumnSortedAscendingIcon: CustomAscendingIcon,
            ColumnMenu: CustomColumnMenu
          }}
          componentsProps={{
            pagination: { currentPage, customUiComp: customPaginationUiComp }
          }}
          pageSize={pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          pagination
          loading={loading}
        />
      </div>
    </>
  );
};

export default ZicopsTable;
