import { Slider } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const StyledSlider = styled(Slider)(({ theme }) => ({
  //   width: 300,
  //   color: theme.palette.success.main,
  '& .MuiSlider-thumb': {
    borderRadius: '0',
    height: '10px',
    width: '10px',
    marginTop: '-4px',
    marginLeft: '0'
  },
  '& .MuiSlider-markActive': {
    backgroundColor: '#6bcfcf'
  },

  '& .MuiSlider-mark': {
    height: '10px',
    width: '10px',
    marginTop: '-4px',
    borderRadius: '0'
  },
  '& .MuiSlider-markLabel': {
    marginLeft: '5px',
    color: 'white'
  },
  '& .MuiSlider-markLabelActive': {
    color: '#6bcfcf'
  }
}));

export default StyledSlider;
