import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { myTrainers } from './trainingManagement.helper.js';
import { useState, useEffect } from 'react';
import useHandleTrainerData from './Logic/useHandleTrainerData.js';
import AddTrainerPopup from './AddTrainerPopup/AddTrainerPopup.js';

const MyTrainers = () => {
  const [trainerTableData, setTrainerTableData] = useState([]);

  const { getPaginatedTrainers, setIsEditTrainerPopupOpen } = useHandleTrainerData();

  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    getPaginatedTrainers()?.then((data) => {
      setTrainerTableData(data || []);
    });
  }, []);

  const columns = [
    {
      field: 'first_name',
      headerClassName: 'course-list-header',
      headerName: 'First Name',
      flex: 1,
    },
    {
      field: 'last_name',
      headerClassName: 'course-list-header',
      headerName: 'Last Name',
      flex: 1,
    },
    {
      field: 'email',
      headerClassName: 'course-list-header',
      headerName: 'Email',
      flex: 2,
    },
    {
      field: 'type',
      headerClassName: 'course-list-header',
      headerName: 'Type',
      flex: 1,
    },
    {
      field: 'action',
      headerClassName: 'course-list-header',
      headerName: 'Action',
      flex: 0.5,
      renderCell: (params) => {
        const buttonArr = [
          {
            text: 'View',
            handleClick: () => setIsEditOpen(true),
          },
          {
            text: 'Edit',
            handleClick: () => setIsEditOpen(true),
          },
          {
            text: 'disable',
            handleClick: '',
          },
        ];
        return (
          <>
            <EllipsisMenu buttonArr={buttonArr} />
          </>
        );
      },
    },
  ];

  const options = [{ label: 'Name', value: 'name' }];

  return (
    <>
      <ZicopsTable data={trainerTableData} columns={columns} />
      <AddTrainerPopup popUpState={[isEditOpen, setIsEditOpen]} isEdit={true} isView={true} />
    </>
  );
};
export default MyTrainers;
