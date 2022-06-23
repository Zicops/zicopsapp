import { useState } from 'react';
import Button from '../common/Button';
import styles from './attemptHistory.module.scss';
import { tableData } from './Logic/attemptHistory.helper';
// const data = [tableData];
// console.log(data);
const AttempHistory = ({ title, handleChange }) => {
  const [data, setData] = useState(tableData);
  return (
    <div className={styles.resultTable}>
      <h2>{title}</h2>
      {/* <table>
        <tr key={'x'}>
          {Object.keys(data[0]).map((key) => (
            <td>{key}</td>
          ))}
        </tr>
        {data.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((val) => (
              <td>{val}</td>
            ))}
          </tr>
        ))}
        <Button text="Close" styleClass={styles.closeBtn} onClick={handleChange} />
      </table> */}
      <table>
        <thead>
          <tr>
            <td>Attempt</td>
            <td>Started At</td>
            <td>Finished At</td>
            <td>Total Duration</td>
            <td>Score</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ color: '#6bcfcf', textDecoration: 'underline' }}>
              {tableData[0].Attempt}
            </td>
            <td>{tableData[0].StartedAt}</td>
            <td>{tableData[0].FinishedAt}</td>
            <td>{tableData[0].TotalDuration}</td>
            <td>{tableData[0].Score}</td>
            <td style={{ color: '#F53D41' }}>{tableData[0].Result}</td>
          </tr>
          <tr>
            <td style={{ color: '#6bcfcf', textDecoration: 'underline' }}>
              {tableData[1].Attempt}
            </td>
            <td>{tableData[1].StartedAt}</td>
            <td>{tableData[1].FinishedAt}</td>
            <td>{tableData[1].TotalDuration}</td>
            <td>{tableData[1].Score}</td>
            <td style={{ color: '#26BA4D' }}>{tableData[1].Result}</td>
          </tr>
        </tbody>
      </table>
      <Button text="Close" styleClass={styles.closeBtn} onClick={handleChange} />
    </div>
  );
};

export default AttempHistory;
