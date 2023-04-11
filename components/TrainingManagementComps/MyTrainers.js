import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { myTrainers } from './trainingManagement.helper.js';

const MyTrainers = () => {
  const columns = [
    {
      field: 'name',
      headerClassName: 'course-list-header',
      headerName: 'Trainer Name',
      flex: 2
    },
    {
      field: 'email',
      headerClassName: 'course-list-header',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'type',
      headerClassName: 'course-list-header',
      headerName: 'Type',
      flex: 1
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
            handleClick: ''
          },
          {
            text: 'Edit',
            handleClick: ''
          },
          {
            text: 'disable',
            handleClick: ''
          }
        ];
        return (
          <>
            <EllipsisMenu buttonArr={buttonArr} />
          </>
        );
      }
    }
  ];

  const options = [{ label: 'Name', value: 'name' }];

  return (
    <>
      <ZicopsTable data={myTrainers} columns={columns} />
    </>
  );
};
export default MyTrainers;
