import QuestionButton from '../QuestionButton';
import styles from './questionCountStyle.module.scss';

const QuestionCountButtonSection = ({
  data,
  setData,
  current,
  setCurrent,
  filterData,
  setOption,
  setIsQuestion
}) => {
  return (
    <>
      {/*<Grid container spacing={1} pt={0.5} pb={1.5} pr={2} pl={2.5} sx={{width: '102%',height: `calc(54px * 6)`, background: '#040404', my: 2}}>*/}
      {/*    */}
      {/*</Grid>*/}

      <div className={`${styles.questionCountContainer}`}>
        {filterData === 'all' &&
          data.map((each, i) => {
            return (
              <QuestionButton
                setIsQuestion={setIsQuestion}
                each={each}
                key={i}
                data={data}
                setData={setData}
                current={current}
                setCurrent={setCurrent}
                setOption={setOption}
              />
            );
          })}
        {filterData === 'attempted' &&
          data
            .filter((obj) => obj.selectedOption !== null)
            .map((each, i) => {
              return (
                <QuestionButton
                  setIsQuestion={setIsQuestion}
                  each={each}
                  key={i}
                  data={data}
                  setData={setData}
                  current={current}
                  setCurrent={setCurrent}
                  setOption={setOption}
                />
              );
            })}
        {filterData === 'marked' &&
          data
            .filter((obj) => obj.isMarked === true)
            .map((each, i) => {
              return (
                <QuestionButton
                  setIsQuestion={setIsQuestion}
                  each={each}
                  data={data}
                  key={i}
                  setData={setData}
                  current={current}
                  setCurrent={setCurrent}
                  setOption={setOption}
                />
              );
            })}
        {filterData === 'unattempted' &&
          data
            .filter((obj) => obj.isVisited === true && obj.selectedOption === null)
            .map((each, i) => {
              return (
                <QuestionButton
                  setIsQuestion={setIsQuestion}
                  each={each}
                  key={i}
                  data={data}
                  setData={setData}
                  current={current}
                  setCurrent={setCurrent}
                  setOption={setOption}
                />
              );
            })}
        {filterData === 'unvisited' &&
          data
            .filter((obj) => obj.isVisited === false)
            .map((each, i) => {
              return (
                <QuestionButton
                  setIsQuestion={setIsQuestion}
                  filterData={filterData}
                  key={i}
                  each={each}
                  data={data}
                  setData={setData}
                  current={current}
                  setCurrent={setCurrent}
                />
              );
            })}
      </div>
    </>
  );
};

export default QuestionCountButtonSection;
