import { Slider } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const StyledSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    borderRadius: '0',
    height: '10px',
    width: '10px',
    marginTop: '-4px',
    marginLeft: '0',
    backgroundColor: 'var(--white)',
    color: 'var(--white)'
  },
  '& .MuiSlider-markActive': {
    backgroundColor: 'var(--white)',
    opacity: '1'
  },

  '& .MuiSlider-rail': {
    backgroundColor: 'var(--secondary_black)',
    height: '3px'
  },
  '& .MuiSlider-mark': {
    height: '10px',
    width: '10px',
    marginTop: '-3px',
    borderRadius: '0',
    color: 'var(--secondary_black)'
    // backgroundColor: '#737373'
  },
  '& .MuiSlider-markLabel': {
    marginLeft: '5px',
    color: 'var(--secondary_black)'
  },
  '& .MuiSlider-markLabelActive': {
    color: 'var(--white)'
  },
  '& .MuiSlider-track': {
    backgroundColor: 'var(--primary)',
    height: '3px'
  },

  '& .MuiSlider-valueLabel': {
    display: 'none'
  }
}));

export default StyledSlider;
