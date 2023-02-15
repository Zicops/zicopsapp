import { arrayOf, objectOf, shape, string } from 'prop-types';
import Select from 'react-select';
import styles from './dashboardDropdown.module.scss';

export default function DashboardDropdown({
  options,
  handleChange,
  value,
  customStyles,
  maxMenuHeight = null
}) {
  return (
    <>
      {/* move styles to .scss */}
      <div className={`${styles.row}`}>
        <Select
          options={options}
          value={value}
          onChange={handleChange}
          className={`${styles.select_container}`}
          classNamePrefix={`${styles.select}`}
          maxMenuHeight={maxMenuHeight}
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

// Dropdown.propTypes = {
//   options: arrayOf(propStructure),
//   defaultValue: propStructure
// };
