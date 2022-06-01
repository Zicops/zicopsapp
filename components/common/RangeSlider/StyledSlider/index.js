import { Slider } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    borderRadius: '0',
    height: '10px',
    width: '10px',
    marginTop: '-4px',
    marginLeft: '0',
    backgroundColor: '#6bcfcf',
    color: '#6bcfcf'
  },
  '& .MuiSlider-markActive': {
    backgroundColor: '#6bcfcf',
    opacity: '1'
  },

  '& .MuiSlider-rail': {
    backgroundColor: '#737373',
    height: '3px'
  },
  '& .MuiSlider-mark': {
    height: '10px',
    width: '10px',
    marginTop: '-3px',
    borderRadius: '0',
    color: '#737373'
    // backgroundColor: '#737373'
  },
  '& .MuiSlider-markLabel': {
    marginLeft: '5px',
    color: '#737373'
  },
  '& .MuiSlider-markLabelActive': {
    color: '#6bcfcf'
  },
  '& .MuiSlider-track': {
    backgroundColor: '#6bcfcf',
    height: '3px'
  },

  '& .MuiSlider-valueLabel': {
    display: 'none'
  }
}));

export default StyledSlider;
