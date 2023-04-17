import styles from '../zicopsCarousel.module.scss';

let prevItem = null;

export function getTwoRowCarousel(arrWithData = [], callbackFuncToRenderComp = () => {}) {
  return arrWithData.map((data, i) => {
    // for last row
    if (i + 1 == arrWithData.length) {
      return (
        <div key={data + i + prevItem} className={`${styles.singleColum}`}>
          {prevItem && callbackFuncToRenderComp(prevItem)}
          {callbackFuncToRenderComp(data)}
          {(prevItem = null)}
        </div>
      );
    }

    // skip every seconds comp render because it was already rendered in previous column
    if (i % 2 == 0) {
      prevItem = data;
      return null;
    }

    // render 2 rows in a single column
    return (
      <div key={data + i + prevItem} className={`${styles.singleColum}`}>
        {callbackFuncToRenderComp(prevItem)}
        {callbackFuncToRenderComp(data)}

        {/* reset prevItem */}
        {(prevItem = null)}
      </div>
    );
  });
}
