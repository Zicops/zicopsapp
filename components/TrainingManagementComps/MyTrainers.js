import EllipsisMenu from '@/components/common/EllipsisMenu';
import ZicopsTable from '@/components/common/ZicopsTable';
import { myTrainers } from './trainingManagement.helper.js';
import { useState, useEffect } from 'react';
import useHandleTrainerData from './Logic/useHandleTrainerData.js';
import AddTrainerPopup from './AddTrainerPopup/AddTrainerPopup.js';
import { useRecoilState } from 'recoil';
import { TrainerDataAtom, getTrainerDataObj } from '@/state/atoms/trainingManagement.atoms.js';
import { isWordIncluded } from '@/helper/utils.helper';

const MyTrainers = () => {
  const [trainerData, setTrainerData] = useRecoilState(TrainerDataAtom);

  const [trainerTableData, setTrainerTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { getPaginatedTrainers, setIsEditTrainerPopupOpen } = useHandleTrainerData();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [individualTrainerData, setIndividualTrainerData] = useState();

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
            handleClick: () => {
              setIndividualTrainerData(params.row);
              setIsEditOpen(true);
              setTrainerData(getTrainerDataObj());
            },
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

  const options = [{ label: 'First Name', value: 'First Name' }];

  return (
    <>
      <ZicopsTable
        data={trainerTableData?.filter((trainer) =>
          isWordIncluded(trainer?.first_name, searchQuery),
        )}
        columns={columns}
        searchProps={{
          handleSearch: (val) => setSearchQuery(val),
          options,
          delayMS: 0,
        }}
        showCustomSearch={true}
      />
      <AddTrainerPopup
        popUpState={[isEditOpen, setIsEditOpen]}
        isEdit={true}
        isView={false}
        individualTrainerData={individualTrainerData}
      />
    </>
  );
};
export default MyTrainers;
