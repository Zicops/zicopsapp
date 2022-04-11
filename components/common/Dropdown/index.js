import { arrayOf, objectOf, shape, string } from 'prop-types';
import Select from 'react-select';

export default function Dropdown({ options, handleChange, value }) {
  console.log('Value', value);
  return (
    <>
      {/* move styles to .scss */}
      <div className="row" style={{ margin: '40px 0 0' }}>
        <Select
          options={options}
          value={value}
          onChange={handleChange}
          className="zicops_select_container"
          classNamePrefix="zicops_select"
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
