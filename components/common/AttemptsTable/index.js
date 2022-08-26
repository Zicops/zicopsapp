import styles from './attemptsTable.module.scss';

export default function AttemptsTable({ attemptData = [], totalAttempts = 1, style = {} }) {
  return (
    <>
      <div className={`${styles.congratulations_Body}`}>
        <table className={`${styles.table_style}`}>
          <thead>
            <tr>
              <td>Attempt:</td>
              <td>Exam Score:</td>
              <td>Result:</td>
            </tr>
          </thead>

          <tbody>
            {attemptData?.map((data, i) => {
              return (
                <tr key={i}>
                  <td>{data?.attempt || 1 / totalAttempts || 1}</td>
                  <td>
                    {data?.examScore || 0} / {data?.totalMarks || 0}
                  </td>
                  <td style={{ color: data.result?.includes('failed') ? '#F53D41' : '#26BA4D' }}>
                    {data.result}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
