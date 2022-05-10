import { arrayOf, shape, string } from 'prop-types';
import { useCallback } from 'react';
import StyledDataGrid from '../StyledDataGrid';
import {
  CustomAscendingIcon,
  CustomDescendingIcon,
  CustomPagination
} from '../ZicopsTable/Logic/zicopsTable.helper';
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
  // const { columnHeader, rowData } = tableData;

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
      left: params.isFirstVisible ? 0 : 5,
      right: params.isLastVisible ? 0 : 5
    };
  }, []);
  return (
    <>
      <div className={`${styles.simpleTable}`}>
        {/* table heading */}
        <div className={`${styles.tableHeader} ${headingStyleClass}`} style={headingStyle}>
          {tableHeading}
        </div>

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
              // ColumnMenu: CustomColumnMenu
            }}
            getRowClassName={() => `${styles.tableRow}`}
            disableColumnMenu={true}
            pageSize={pageSize}
            rowsPerPageOptions={rowsPerPageOptions}
            getRowSpacing={getRowSpacing}
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
