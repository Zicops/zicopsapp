import styles from '../formComponents.module.scss';
import StyledSlider from './StyledSlider';

export default function RangeSlider({ options = [], selected, changeHandler, inputName }) {
  return (
    <>
      <div className={`${styles.rsliderContainer}`}>
        <StyledSlider //   aria-label="Temperature"
          defaultValue={selected}
          //   getAriaValueText="no"
          valueLabelDisplay="auto"
          step={1}
          marks={options}
          min={1}
          max={10}
          name={inputName}
          onChange={changeHandler}
        />
      </div>
    </>
  );
}
