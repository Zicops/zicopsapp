import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '@/components/common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '@/components/common/ZicopsTable';
import styles from '../../../../userComps.module.scss';

const data = [
  {
    id: 'uniwfcno3wo1oe31u9qdj',
    email: 'abc@zicops.com',
    firstName: 'Harshad',
    lastName: 'Gholap'
  },
  {
    id: 2,
    email: 'abc@zicops.com',
    firstName: 'Wasim',
    lastName: 'Khan'
  },
  {
    id: 3,
    email: 'abc@zicops.com',
    firstName: 'Ravant',
    lastName: 'Kumar'
  },
  {
    id: 4,
    email: 'abc@zicops.com',
    firstName: 'Abhishek',
    lastName: 'Ghosh'
  },
  {
    id: 5,
    email: 'abc@zicops.com',
    firstName: 'Ravant',
    lastName: 'Kumar'
  },
  {
    id: 6,
    email: 'abc@zicops.com',
    firstName: 'Joy',
    lastName: 'Boy'
  },
  {
    id: 7,
    email: 'abc@zicops.com',
    firstName: 'Skyline',
    lastName: 'Meridian'
  },
  {
    id: 8,
    email: 'abc@zicops.com',
    firstName: 'Vajresh',
    lastName: 'Patkar'
  },
  {
    id: 9,
    email: 'abc@zicops.com',
    firstName: 'Puneet',
    lastName: 'Saraswat'
  },
  {
    id: 64,
    email: 'abc@zicops.com',
    firstName: 'Ron',
    lastName: 'Doe'
  }
];

const AddUsers = () => {
  const CohortName = 'Developement Cohort';
  const selectedUsers = '50/200';

  const columns = [
    {
      field: 'firstName',
      headerClassName: 'course-list-header',
      flex: 1,
      renderHeader: (params) => (
        <div className="center-elements-with-flex">
          <LabeledRadioCheckbox
            type="checkbox"
            // isChecked={userId.length === data.length}
            // changeHandler={(e) => {
            //   setUserId(e.target.checked ? [...data.map((row) => row.id)] : []);
            // }}
          />
          First Name
        </div>
      ),
      renderCell: (params) => {
        return (
          <div className="center-elements-with-flex">
            <LabeledRadioCheckbox
              type="checkbox"
              //   isChecked={userId?.includes(params.id)}
              //   changeHandler={(e) => {
              //     const userList = [...userId];

              //     if (e.target.checked) {
              //       userList.push(params.id);
              //     } else {
              //       const index = userList.findIndex((id) => id === params.id);
              //       userList.splice(index, 1);
              //     }

              //     setUserId(userList);
              //   }}
            />
            {params.row?.firstName}
          </div>
        );
      }
    },
    {
      field: 'lastName',
      headerClassName: 'course-list-header',
      headerName: 'Last Name',
      flex: 1
    },
    {
      field: 'email',
      headerClassName: 'course-list-header',
      headerName: 'Email ID',
      flex: 1
    }
  ];
  return (
    <div className={`${styles.addUsersContainer}`}>
      <div className={`${styles.addUserTopContainer}`}>
        <div className={`${styles.imageContainer}`}>
          <img src="/images/UserCohort.png" height={60} alt="" />
          <div className={`${styles.titleContainer}`}>
            <span className={`${styles.cohortTitle}`}>{CohortName}</span>
            <span>Add Users</span>
          </div>
        </div>
        <div className={`${styles.searchBarContainer}`}>
          <img src="/images/svg/search-icon.svg" height={20} alt="" />

          <LabeledInput
            styleClass={styles.inputField}
            inputOptions={{
              inputName: 'search',
              placeholder: 'Search Users'
            }}
          />
        </div>
      </div>
      <ZicopsTable
        columns={columns}
        data={data}
        tableHeight="60vh"
        customStyles={{ padding: '10px 0' }}
        hideFooterPagination={true}
      />
      <div className={`${styles.addUserBottomContainer}`}>
        <div className={`${styles.leftSide}`}>
          Users selected: <span>{selectedUsers}</span>
        </div>
        <div className={`${styles.buttonContainer}`}>
          <button className={`${styles.cohortButton3}`}>Cancel</button>
          <button className={`${styles.cohortButton1}`}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
<></>;
