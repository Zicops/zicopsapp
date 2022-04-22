import CheckBoxField from '../../common/CheckBoxField';
import InputField from '../../common/InputField';
import Marks from '../../common/Marks';
import DropdownSelect from '../../Tabs/DropdownSelect';
import styles from './examMaster.module.scss'
const ExamMaster = () => {
  return (
    <>
      <div className="exam_master">
        <InputField
          obj={{ label: 'Question paper name:', placeholder: 'Enter Question Paper Name' }}
        />
        <InputField obj={{ label: 'Exam name:', placeholder: 'Enter Name' }} />
        <InputField obj={{ label: 'Description', placeholder: 'Enter Exam Description' }} />
        {/* <div className="row">
          <div className="col_33">
            <Marks label={'Total Marks:'} placeholder={'Total Marks'} />
          </div>
          <div className="col_33">
            <Marks label={'passing criteria:'} placeholder={'Enter Passing Criteria'} />
          </div>
          <div className="col_33">
            <DropdownSelect
              inputData={{
                inputName: 'course_sub_category',
                label: 'Max Attempts',
                placeholder: 'Select Max Attempts'
              }}
            />
          </div>
        </div> */}
        {/* <div className="exam">
          <Marks label={'Total Marks:'} placeholder={'Total Marks'} className="item1" />
          <Marks
            label={'passing criteria:'}
            placeholder={'Enter Passing Criteria'}
            className="item2"
          />
          <DropdownSelect
            inputData={{
              inputName: 'course_sub_category',
              label: '',
              placeholder: 'None'
            }}
            className="item3"
          /> */}
        {/* </div>

        <div className="max_attempts"> */}
        {/* <CheckBoxField checkBox_label={'Set Max. Attempt Limit'} className="item4" />
          <DropdownSelect
            inputData={{
              inputName: 'course_sub_category',
              label: 'Max. Attempts',
              placeholder: 'None'
            }}
            className="item5"
          /> */}
        {/* </div> */}

        <div className={`row`}>
          <div className={`col_25`}>
            <label htmlFor="totalMarks">Total Marks</label>
          </div>
          <div className={`col_75`}>
            <div className="row">
              <input
                type="number"
                name="totalMarks"
                id="totalMarks"
                placeholder="Total Marks"
                className={`col_25`}
                disabled
              />
              <div className="col_75" style={{marginLeft: '15%'}}>
                <label htmlFor="passingCriteria">
                  Passing Criteria
                </label>
                <input
                  type="text"
                  name="passingCriteria"
                  id="passingCriteria"
                  placeholder="Enter Passing Criteria"
                />
                <select name="sub_category" className={`col_25`}>
                  <option value="">Marks</option>
                  <option value="">Percentage</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`

          .exam_master{
            // border:1px solid white;
            padding:10px 20px;
            // height:300px;
            // overflow:scroll;
          }
          .exam{
            display: grid;
            grid-template-columns: auto auto auto ;
            align-items: center;
          }
          // .max_attempts{
          //   display: grid;
          //   grid-template-columns: auto auto auto;
          //   align-items: center;
           
          // }
          .item4{
            grid-column:2/3;
            }
            .item1{
              grid-column:2/3;
            }`}
      </style>
    </>
  );
};

export default ExamMaster;
