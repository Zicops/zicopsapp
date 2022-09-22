import Select from 'react-select';
import { labeledDropdownWrapper } from '../formComponents.module.scss';
import { customSelectStyles } from '../Logic/formComponents.helper';

export default function LabeledDropdown({
  dropdownOptions,
  styleClass,
  isError,
  changeHandler,
  filterOption,
  isFiftyFifty = false
}) {
  let {
    inputName,
    label,
    placeholder,
    options,
    value,
    isDisabled,
    isReadonly,
    isSearchEnable,
    isMulti,
    noOptionsMessage = 'No Options',
    menuPlacement = 'bottom'
  } = dropdownOptions;

  if (isReadonly) isDisabled = true;

  let containerWidth = '75%';
  if (!label) containerWidth = '100%';

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
        className={`${label ? '' : 'w-100'} ${isError ? 'headShake' : ''}`}
        menuPlacement={menuPlacement}
        styles={customSelectStyles(isFiftyFifty, containerWidth, isError, isReadonly)}
        isSearchable={!!isSearchEnable}
        isDisabled={!!isDisabled}
        isOptionDisabled={(option) => option.disabled}
        noOptionsMessage={() => noOptionsMessage}
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
