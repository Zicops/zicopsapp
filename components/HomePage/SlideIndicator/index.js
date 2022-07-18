import styles from '../home.module.scss';

export default function SlideIndicator({
  count = 0,
  activeSlide = 0,
  showSlidesOnScroll = function () {}
}) {
  const currentSlide = activeSlide + 1;

  return (
    <div className={`${styles.slideIndicator}`}>
      {Array(count)
        .fill(null)
        .map((v, i) => (
          <div
            key={i}
            // onClick={() => {
            //   for (let count = 0; count < Math.abs(i - currentSlide) + 1; count++) {
            //     setTimeout(() => {
            //       console.log(count);
            //       showSlidesOnScroll({
            //         deltaY: currentSlide <= i ? Math.random() : -Math.random()
            //       });
            //     }, 50);
            //   }
            // }}
            className={`${currentSlide > i ? styles.active : ''}`}></div>
        ))}
    </div>
  );
}
