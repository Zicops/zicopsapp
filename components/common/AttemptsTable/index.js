import styles from './attemptsTable.module.scss';

export default function AttemptsTable({ attemptData = [], totalAttempts = 1, style = {} }) {
  return (
    <>
      <div className={`${styles.congratulations_Body}`}>
        <table className={`${styles.table_style}`} border="1">
          <thead>
            <tr>
              <td>Attempt:</td>
              <td>Exam Score:</td>
              <td>Result:</td>
            </tr>
          </thead>

          <tbody>
            {attemptData?.map((data) => {
              return (
                <tr>
                  <td>{data?.attempt || 1 / totalAttempts || 1}</td>
                  <td>
                    {data?.examScore || 0} / {data?.totalMarks || 0}
                  </td>
                  <td style={{ color: style.color }}>{data.result}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
