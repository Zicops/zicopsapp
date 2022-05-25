import { GridColumnMenuContainer, GridFilterMenuItem, SortGridMenuItems } from '@mui/x-data-grid';
import StyledDataGrid from '../../common/StyledDataGrid';
import {
  CustomAscendingIcon,
  CustomDescendingIcon, CustomPagination
} from './Logic/zicopsTable.helper';

// https://stackoverflow.com/questions/66514102/how-can-you-disable-specific-material-ui-datagrid-column-menu-options
const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn } = props;
  return (
    <GridColumnMenuContainer hideMenu={hideMenu} currentColumn={currentColumn} style={{backgroundColor: 'var(--dark_three)'}}>
      <SortGridMenuItems onClick={hideMenu} column={currentColumn} />
      <div>Custom Text</div>
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  )
}
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
        // disableColumnMenu={true}
        disableSelectionOnClick
        components={{
          Pagination: CustomPagination,
          ColumnSortedDescendingIcon: CustomDescendingIcon,
          ColumnSortedAscendingIcon: CustomAscendingIcon,
          ColumnMenu: CustomColumnMenu
        }}
        pageSize={pageSize}
        rowsPerPageOptions={rowsPerPageOptions}
        pagination
      />
    </div>
  );
};
 
export default ZicopsTable;