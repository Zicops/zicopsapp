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
    }
  ];

  return (
    <>
      <div className={`${styles.rsliderContainer}`}>
        <Slider
          //   aria-label="Temperature"
          defaultValue={3}
          //   getAriaValueText="no"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={10}
          sx={{
            '& .MuiSlider-thumb': {
              borderRadius: '0',
              height: '10px',
              width: '10px'
            }
          }}
        />
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
