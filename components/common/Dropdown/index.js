import { arrayOf, objectOf, shape, string } from 'prop-types';
import Select from 'react-select';

export default function Dropdown({ options, handleChange, value, customStyles }) {
  return (
    <>
      {/* move styles to .scss */}
      <div className="form_row" style={customStyles ? customStyles : { margin: '40px auto 0px' }}>
        <Select
          options={options}
          value={value}
          onChange={handleChange}
          className="zicops_select_container"
          classNamePrefix="zicops_select"
          isSearchable={false}
        />
      </div>
    </>
  );
}

const propStructure = shape({
  value: string,
  label: string
});

Dropdown.propTypes = {
  options: arrayOf(propStructure),
  defaultValue: propStructure
};
