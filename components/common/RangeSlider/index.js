import { Slider } from '@material-ui/core';
import StyledSlider from './StyledSlider';
import styles from './rangeSlider.module.scss';

const RangeSlider = () => {
  const marks = [
    {
      value: 0,
      label: '0'
    },
    {
      value: 1,
      label: '1'
    },
    {
      value: 2,
      label: '2'
    },
    {
      value: 3,
      label: '3'
    },
    {
      value: 10,
      label: '10'
    },
    {
      value: 4,
      label: '4'
    },
    {
      value: 5,
      label: '5'
    },
    {
      value: 0,
      label: '0'
    },
    {
      value: 6,
      label: '6'
    },
    {
      value: 7,
      label: '7'
    },
    {
      value: 9,
      label: '9'
    },
    {
      value: 8,
      label: '8'
    }
  ];

  return (
    <>
      <div className={`${styles.rsliderContainer}`}>
        <StyledSlider //   aria-label="Temperature"
          defaultValue={3}
          //   getAriaValueText="no"
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={10}
        />
      </div>
    </>
  );
};

export default RangeSlider;
