import { useEffect, useState } from 'react';
import { getPageSizeBasedOnScreen } from '../../../helper/utils.helper';
import EllipsisMenu from '../../common/EllipsisMenu';
import LabeledRadioCheckbox from '../../common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '../../common/ZicopsTable';

const data = [
  {
    id: 'uniwfcno3wo1oe31u9qdj',
    emailId: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 2,
    emailId: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 3,
    emailId: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 4,
    emailId: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 5,
    emailId: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 6,
    emailId: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 7,
    emailId: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  },
  {
    id: 8,
    emailId: 'abc@zicops.com',
    firstName: 'ABC',
    lastName: 'DEF',
    role: 'Learner',
    status: 'Invited'
  }
];

export default function UserTable({ selectedUser }) {
  const [userId, setUserId] = useState([]);

  useEffect(() => {
    selectedUser(userId);
  }, [userId]);

  const columns = [
    {
      field: 'emailId',
      headerClassName: 'course-list-header',
      flex: 1,
      renderHeader: (params) => (
        <div className="center-elements-with-flex">
          <LabeledRadioCheckbox
            type="checkbox"
            isChecked={userId.length === data.length}
            changeHandler={(e) => {
              setUserId(e.target.checked ? [...data.map((row) => row.id)] : []);
            }}
          />
          Email Id
        </div>
      ),
      renderCell: (params) => {
        return (
          <div className="center-elements-with-flex">
            <LabeledRadioCheckbox
              type="checkbox"
              isChecked={userId?.includes(params.id)}
              changeHandler={(e) => {
                const userList = [...userId];

                if (e.target.checked) {
                  userList.push(params.id);
                } else {
                  const index = userList.findIndex((id) => id === params.id);
                  userList.splice(index, 1);
                }

                setUserId(userList);
              }}
            />
            {params.row?.emailId}
          </div>
        );
      }
    },
    {
      field: 'firstName',
      headerClassName: 'course-list-header',
      headerName: 'First Name',
      flex: 0.5
    },
    {
      field: 'lastName',
      headerClassName: 'course-list-header',
      headerName: 'Last Name',
      flex: 0.5
    },
    {
      field: 'role',
      headerClassName: 'course-list-header',
      headerName: 'Role',
      flex: 0.5
    },
    {
      field: 'status',
      headerClassName: 'course-list-header',
      headerName: 'Status',
      flex: 0.5
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params) => (
        <>
          <EllipsisMenu buttonArr={[<li>Disable</li>]} />
        </>
      )
    }
  ];

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={data}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="75vh"
      />
    </>
  );
}
