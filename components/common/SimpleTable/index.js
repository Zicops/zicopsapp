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
                {rowData?.map((rows, rowIndex) => (
                  <div className={`${styles.row}`} key={rowIndex}>
                    {/* table cell */}
                    {rows?.examData?.map((cell, cellIndex) => (
                      <span
                        onClick={() => {
                          console.log(rows, 'cell', cellIndex);
                          router?.push(
                            `/course/${rows?.courseId}?activateExam=${rows?.examId}`,
                            `/course/${rows?.courseId}`
                          );
                        }}
                        className={`w-25 ${
                          cellIndex + 1 === rows.length && lastCellObj && styles.scheduleBtnHover
                        }`}
                        key={cellIndex + cell}
                        style={cellIndex + 1 === rows.length ? lastCellObj?.style : {}}>
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
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
