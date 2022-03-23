import Select from 'react-select'
const Dropdown = ( {options} ) => {
    return ( 
        <>
        <div className='row' style={{margin:'40px 0 0'}}>
            <Select 
              options={options} 
              defaultValue={{ value: 'module1', label: 'Module 1' }}
              className='zicops_select_container'
              classNamePrefix="zicops_select"
              />
        </div>
        </>
     );
}
 
export default Dropdown;