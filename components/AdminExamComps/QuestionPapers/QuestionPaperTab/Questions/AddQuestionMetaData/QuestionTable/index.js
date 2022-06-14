import { useEffect, useState } from 'react';
import { getPageSizeBasedOnScreen } from '../../../../../../../helper/utils.helper';
import LabeledInput from '../../../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../../../common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '../../../../../../common/ZicopsTable';
import { imageTypes } from '../../../../../QuestionBanks/Logic/questionBank.helper';
import styles from '../../../questionPaperTab.module.scss';

export default function QuestionTable({
  qbQuestions,
  selectedQb,
  handleSelectedQuestions,
  selectedQuestionIds
}) {
  const [searchQuery, setSearchQuery] = useState(null);
  const [allQb, setAllQb] = useState(qbQuestions);
  const [filteredQb, setFilteredQb] = useState(qbQuestions);

  useEffect(() => {
    if (!searchQuery) return;

    setFilteredQb(
      allQb.filter((qb) => qb?.Description?.toLowerCase().includes(searchQuery?.toLowerCase()))
    );
  }, [searchQuery]);

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
      <div className={styles.topbarTable}>
        <p className="w-100">{selectedQb?.name}</p>

        <div className={styles.searchInputContainer}>
          <img src="/images/magnifier.png" height={20} alt="" />

          <LabeledInput
            inputOptions={{
              inputName: 'qbFilter',
              placeholder: 'Search Questions',
              value: searchQuery
            }}
            changeHandler={({ target: { value } }) => setSearchQuery(value)}
            isFiftyFifty={true}
          />
        </div>
      </div>
      <ZicopsTable
        columns={columns}
        data={filteredQb}
        pageSize={getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="50vh"
      />
    </>
  );
}
