import Select from 'react-select';
import { labeledDropdownWrapper } from '../formComponents.module.scss';

export default function LabeledDropdown({
  dropdownOptions,
  styleClass,
  changeHandler,
  filterOption,
  isFiftyFifty = false
}) {
  const { inputName, label, placeholder, options, value, isDisabled, isSearchEnable, isMulti } =
    dropdownOptions;

  let containerWidth = '75%';
  if (!label) containerWidth = '100%';

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: isFiftyFifty ? '50%' : containerWidth,
      boxShadow: state.isFocused ? '0px 0px 10px 0px var(--primary)' : 'none'
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'var(--dark_two)',
      border:
        !state.isFocused && !state.hasValue
          ? '2px solid var(--dark_three)'
          : '2px solid var(--primary)',
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: '14px',
      '&:hover': {
        borderWidth: '2px'
      }
    }),
    input: (provided, state) => ({ ...provided, color: 'var(--white)' }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: 'none !important'
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
      backgroundColor: state.isFocused ? 'var(--black)' : 'var(--dark_two)',
      color: state.isSelected ? 'var(--white)' : 'var(--dark_three)',
      borderRadius: 0,
      boxShadow: 'none',
      fontSize: '14px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'var(--black)'
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

  let selectedValue = null;
  if (value?.value) selectedValue = value;
  if (isMulti && value?.length) selectedValue = value;

  return (
    <div className={`${labeledDropdownWrapper} ${styleClass}`}>
      {!!label && (
        <label
          htmlFor={inputName}
          aria-label={inputName}
          style={isFiftyFifty ? { width: '50%' } : {}}>
          {label}
        </label>
      )}
      <Select
        options={options}
        value={selectedValue}
        filterOption={filterOption}
        name={inputName}
        placeholder={placeholder}
        onChange={changeHandler}
        className={`${label ? '' : 'w-100'}`}
        styles={customStyles}
        isSearchable={!!isSearchEnable}
        isDisabled={!!isDisabled}
        isOptionDisabled={(option) => option.disabled}
        isMulti={!!isMulti}
        isClearable={false}
      />
    </div>
  );
}

// const propStructure = shape({
//   value: string,
//   label: string
// });

// Dropdown.propTypes = {
//   options: arrayOf(propStructure),
//   defaultValue: propStructure
// };
