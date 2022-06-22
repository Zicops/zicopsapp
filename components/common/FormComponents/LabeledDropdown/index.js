import Select from 'react-select';
import { labeledDropdownWrapper } from '../formComponents.module.scss';
import { customSelectStyles } from '../Logic/formComponents.helper';

export default function LabeledDropdown({
  dropdownOptions,
  styleClass,
  changeHandler,
  filterOption,
  isFiftyFifty = false
}) {
  const {
    inputName,
    label,
    placeholder,
    options,
    value,
    isDisabled,
    isSearchEnable,
    isMulti,
    menuPlacement = 'auto'
  } = dropdownOptions;

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
        className={`${label ? '' : 'w-100'}`}
        menuPlacement={menuPlacement}
        styles={customSelectStyles(isFiftyFifty, containerWidth)}
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
