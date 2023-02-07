import { GridColumnMenuContainer, GridFilterMenuItem, SortGridMenuItems } from '@mui/x-data-grid';
import { useRef } from 'react';
import StyledDataGrid from '../../common/StyledDataGrid';
import TableSearchComp from '../TableSearchComp';
import {
  CustomAscendingIcon,
  CustomDescendingIcon,
  CustomPagination
} from './Logic/zicopsTable.helper';
import styles from './zicopsTable.module.scss';

// https://stackoverflow.com/questions/66514102/how-can-you-disable-specific-material-ui-datagrid-column-menu-options
const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      style={{ backgroundColor: 'var(--dark_three)' }}>
      <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
      <div>Custom Text</div>
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  );
};
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
  currentPage = null
}) => {
  const tableContainerRef = useRef(null);

  const customProps = {};

  const tableBody = process.browser
    ? document.getElementsByClassName('MuiDataGrid-virtualScroller')?.[0]
    : null;
  const height = tableBody?.offsetHeight || null;

  if (data?.length >= pageSize && height) customProps.rowHeight = height / pageSize;

  return (
    <>
      {!!showCustomSearch && <TableSearchComp {...searchProps} />}

      <div style={{ height: tableHeight }}>
        <StyledDataGrid
          {...customProps}
          ref={tableContainerRef}
          rows={data || []}
          columns={columns}
          style={customStyles}
          hideFooterPagination={hideFooterPagination}
          sx={{
            border: 0,
            pt: 2,
            pb: 2,
            px: 5,
            color: '#fff'
          }}
          autoHeight={false}
          // disableColumnMenu={true}
          onPageChange={onPageChange}
          disableSelectionOnClick
          components={{
            Pagination: CustomPagination,
            ColumnSortedDescendingIcon: CustomDescendingIcon,
            ColumnSortedAscendingIcon: CustomAscendingIcon,
            ColumnMenu: CustomColumnMenu
          }}
          componentsProps={{
            pagination: { background: 'red', currentPage }
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
