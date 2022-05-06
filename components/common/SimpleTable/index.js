import { arrayOf, shape, string } from 'prop-types';
import styles from './simpleTable.module.scss';

export default function SimpleTable({
  tableHeading,
  tableData,
  styleClass,
  headingStyle,
  headingStyleClass,
  lastCellObj,
}) {
  const { columnHeader, rowData } = tableData;

  return (
    <>
      <div className={`${styles.simpleTable} ${styleClass}`}>
        {/* table heading */}
        <div className={`${styles.tableHeader} ${headingStyleClass}`} style={headingStyle}>
          {tableHeading}
        </div>

        <div className={`${styles.tableContainer}`}>
          {/* table head */}
          <div className={`${styles.tableHead}`}>
            <div className={`${styles.row}`}>
              {columnHeader?.map((h, i) => (
                <span className={`w-25`} key={h + i}>
                  {h}
                </span>
              ))}
            </div>
          </div>

          {/* table body */}
          <div className={`${styles.tableBody}`}>
            {/* table row */}
            {rowData?.map((rows, rowIndex) => (
              <div className={`${styles.row}`} key={rowIndex}>
                {/* table cell */}
                {rows?.map((cell, cellIndex) => (
                  <span
                    className={`w-25 ${
                      (cellIndex + 1 === rows.length && lastCellObj) && styles.scheduleBtnHover
                    }`}
                    key={cellIndex + cell}
                    style={cellIndex + 1 === rows.length ? lastCellObj?.style : {}}>
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// default fallback value
SimpleTable.defaultProps = {
  tableData: { columnHeader: [], rowData: [] }
};

const tableDataObj = shape({
  columnHeader: arrayOf(string),
  rowData: arrayOf(arrayOf(string))
});

SimpleTable.propTypes = {
  tableHeading: string,
  tableData: tableDataObj
};
