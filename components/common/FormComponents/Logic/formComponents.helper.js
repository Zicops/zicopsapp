// labeled dropdown react multi select styles
export function customSelectStyles(isFiftyFifty = false, containerWidth = '100%', isReadonly) {
  return {
    container: (provided, state) => ({
      ...provided,
      width: isFiftyFifty ? '50%' : containerWidth,
      boxShadow: state?.isFocused ? '0px 0px 10px 0px var(--primary)' : 'none'
    }),
    control: (provided, state) => {
      let borderStyle = '2px solid var(--dark_three)';

      if (state?.isFocused || state?.hasValue) borderStyle = '2px solid var(--primary)';
      if (state?.isDisabled) borderStyle = '2px solid var(--dark_three)';
      if (isReadonly) borderStyle = 'none';

      return {
        ...provided,
        backgroundColor: 'var(--dark_two)',
        border: borderStyle,
        borderRadius: 0,
        boxShadow: 'none',
        fontSize: '14px',
        '&:hover': {
          borderWidth: '2px'
        }
      };
    },
    input: (provided, state) => ({ ...provided, color: 'var(--white)' }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none !important'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      svg: {
        fill: isReadonly ? 'none' : ''
      }
    }),

    menuList: (provided, state) => ({
      ...provided,
      padding: 0,
      borderRadius: 0,
      maxHeight: '200px',
      /* width */
      '&::-webkit-scrollbar': {
        width: '5px',
        borderRadius: '0px',
        cursor: 'pointer'
      },
      /* Track */
      '&::-webkit-scrollbar-track': {
        background: '#2a2e31',
        borderRadius: '7px'
      },
      /* Handle */
      '&::-webkit-scrollbar-thumb': {
        background: '#969a9d',
        borderRadius: '7px',
        /* Handle on hover */
        '&:hover': {
          background: '#555'
        }
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state?.isFocused ? 'var(--black)' : 'var(--dark_two)',
      color: state?.isSelected ? 'var(--white)' : 'var(--dark_three)',
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'var(--black)',
        color: 'var(--white)'
      }
    }),
    singleValue: (provided, state) => ({ ...provided, color: 'var(--white)' }),
    multiValue: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--primary)'
    }),
    multiValueLabel: (provided, state) => ({
      ...provided,
      color: 'var(--dark_one)',
      fontSize: '14px',
      padding: '5px'
    }),
    multiValueRemove: (provided, state) => ({
      ...provided,
      color: 'var(--dark_one)',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'var(--primary)'
      }
    }),
    noOptionsMessage: (provided) => ({
      ...provided,
      borderRadius: '0',
      backgroundColor: 'var(--dark_two)',
      color: 'var(--dark_three)',
      fontSize: '14px'
    })
  };
}
