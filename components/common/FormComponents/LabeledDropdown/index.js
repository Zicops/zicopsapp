import Select from 'react-select';
import Creatable from 'react-select/creatable';
import { labeledDropdownWrapper } from '../formComponents.module.scss';
import { customSelectStyles } from '../Logic/formComponents.helper';

export default function LabeledDropdown({
  dropdownOptions,
  styleClass,
  isError,
  isLoading = false,
  changeHandler,
  filterOption,
  isFiftyFifty = false,
  customDropdownStyles = {},
  isCreateable = false
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
      {!isCreateable ? (
        <Select
          options={options}
          value={selectedValue}
          filterOption={filterOption}
          name={inputName}
          placeholder={placeholder}
          onChange={changeHandler}
          className={`${label ? '' : 'w-100'} ${isError ? 'headShake' : ''}`}
          menuPlacement={menuPlacement}
          styles={customSelectStyles(
            isFiftyFifty,
            containerWidth,
            isError,
            isReadonly,
            customDropdownStyles
          )}
          isSearchable={!!isSearchEnable}
          isDisabled={!!isDisabled}
          isLoading={isLoading}
          isOptionDisabled={(option) => option.disabled}
          noOptionsMessage={() => noOptionsMessage}
          isMulti={!!isMulti}
          isClearable={false}
        />
      ) : (
        <Creatable
          options={options}
          value={selectedValue}
          filterOption={filterOption}
          name={inputName}
          placeholder={placeholder}
          onChange={changeHandler}
          className={`${label ? '' : 'w-100'} ${isError ? 'headShake' : ''}`}
          menuPlacement={menuPlacement}
          styles={customSelectStyles(
            isFiftyFifty,
            containerWidth,
            isError,
            isReadonly,
            customDropdownStyles
          )}
          isSearchable={!!isSearchEnable}
          isDisabled={!!isDisabled}
          isLoading={isLoading}
          isOptionDisabled={(option) => option.disabled}
          noOptionsMessage={() => noOptionsMessage}
          isMulti={!!isMulti}
          isClearable={false}
        />
      )}
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
