import { getPageSizeBasedOnScreen } from '../../../../../../../helper/utils.helper';
import LabeledRadioCheckbox from '../../../../../../common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '../../../../../../common/ZicopsTable';
import { imageTypes } from '../../../../../QuestionBanks/Logic/questionBank.helper';

export default function QuestionTable({
  qbQuestions,
  handleSelectedQuestions,
  selectedQuestionIds
}) {
  const columns = [
    {
      field: 'Description',
      headerName: 'Questions',
      headerClassName: 'course-list-header',
      flex: 5,
      renderCell: (params) => {
        return (
          <div>
            <LabeledRadioCheckbox
              type="checkbox"
              isChecked={selectedQuestionIds?.includes(params.row.id)}
              changeHandler={(e) => handleSelectedQuestions(params.row.id, e.target.checked)}
            />
            {params.row?.Description}

            {imageTypes.includes(params.row?.AttachmentType) && (
              <div>
                <img src={params.row?.Attachment} height={30} alt="" />
              </div>
            )}
          </div>
        );
      }
    },
    {
      field: 'Type',
      headerClassName: 'course-list-header',
      headerName: 'Type',
      flex: 0.5
    }
  ];

  return (
    <>
      <ZicopsTable
        columns={columns}
        data={qbQuestions}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="50vh"
      />
    </>
  );
}
