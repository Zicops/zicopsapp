import styles from './attemptsTable.module.scss';

export default function AttemptsTable({ attemptData = [], totalAttempts = -1, customStyle = {} }) {
  return (
    <>
      <div className={`${styles.congratulations_Body}`} style={customStyle}>
        <table className={`${styles.table_style}`}>
          <thead style={attemptData?.length > 2 ? {} : { width: 'calc(100% - 4px)' }}>
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
                  <td>{`${data?.attempt || 1}${+totalAttempts > 0 ? `/${totalAttempts}` : ''}`}</td>
                  <td>
                    {data?.examScore || 0} / {data?.totalMarks || 0}
                  </td>
                  <td
                    style={{
                      color: data.result?.toLowerCase()?.includes('fail') ? '#F53D41' : '#26BA4D'
                    }}>
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
