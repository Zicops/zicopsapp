import { arrayOf, shape, string } from 'prop-types';
import StyledDataGrid from '../StyledDataGrid';
import { CustomAscendingIcon, CustomDescendingIcon } from '../ZicopsTable/Logic/zicopsTable.helper';
import CustomPagination from './CustomPagination';
import styles from './zicopsSimpleTable.module.scss';

export default function ZicopsSimpleTable({
  tableHeading,
  tableHeight,
  data,
  columns,
  headingStyleClass,
  rowsPerPageOptions,
  headingStyle,
  pageSize
}) {
  return (
    <>
      <div className={`${styles.simpleTable}`}>
        {/* table heading */}
        <input type="search" className={`${styles.searchBar}`} placeholder="Search" />
        <div className={`${styles.tableHeader} ${headingStyleClass}`} style={headingStyle}>
          {tableHeading}
        </div>

        <div style={{ height: tableHeight, width: '90vw', margin: 'auto' }}>
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
            getRowClassName={() => `${styles.tableRow}`}
            disableColumnMenu={true}
            pageSize={pageSize}
            rowsPerPageOptions={[rowsPerPageOptions]}
            pagination
          />
        </div>
      </div>
    </>
  );
}

// default fallback value
ZicopsSimpleTable.defaultProps = {
  tableData: { columnHeader: [], rowData: [] }
};

const tableDataObj = shape({
  columnHeader: arrayOf(string),
  rowData: arrayOf(arrayOf(string))
});

ZicopsSimpleTable.propTypes = {
  tableHeading: string,
  tableData: tableDataObj
};
