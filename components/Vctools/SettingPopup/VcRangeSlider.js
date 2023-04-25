import StyledSlider from "@/components/common/FormComponents/RangeSlider/StyledSlider";

export default function VcRangeSlider({ options = [], selected, changeHandler, inputName }) {
    return (
      <>
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
      </>
    );
  };