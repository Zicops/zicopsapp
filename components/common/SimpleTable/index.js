import { useRouter } from 'next/router';
import { arrayOf, shape, string } from 'prop-types';
import Loader from '../Loader';
import styles from './simpleTable.module.scss';

export default function SimpleTable({
  tableHeading,
  tableData,
  styleClass,
  headingStyle,
  headingStyleClass,
  lastCellObj,
  loading = false
}) {
  const { columnHeader, rowData } = tableData;
  const router = useRouter();

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
            {loading ? (
              <Loader customStyles={{ backgroundColor: 'transparent', height: '100%' }} />
            ) : !rowData?.length ? (
              <div className={`${styles.noDataFound}`}>No data found!</div>
            ) : (
              <>
                    {rowData?.map((rows, rowIndex) => {
                      let finalRowsData = rows?.examData ? rows.examData : rows;
                      return (
                        <div className={`${styles.row}`} key={rowIndex}>
                          {/* table cell */}
                          {finalRowsData?.map((cell, cellIndex) => (
                            <span
                              onClick={() => {
                                console.log(finalRowsData, 'cell', cellIndex);
                                router?.push(
                                  `/course/${finalRowsData?.courseId}?activateExam=${finalRowsData?.examId}`,
                                  `/course/${finalRowsData?.courseId}`
                                );
                              }}
                              className={`w-25 ${
                                cellIndex + 1 === finalRowsData.length &&
                                lastCellObj &&
                                styles.scheduleBtnHover
                              }`}
                              key={cellIndex + cell}
                              style={
                                cellIndex + 1 === finalRowsData.length ? lastCellObj?.style : {}
                              }>
                              {cell}
                            </span>
                          ))}
                        </div>
                      );
                })}
              </>
            )}
            {/* table row */}
            {}
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
