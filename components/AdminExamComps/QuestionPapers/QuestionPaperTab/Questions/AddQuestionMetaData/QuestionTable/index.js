import { useEffect, useState } from 'react';
import { getPageSizeBasedOnScreen } from '../../../../../../../helper/utils.helper';
import LabeledInput from '../../../../../../common/FormComponents/LabeledInput';
import LabeledRadioCheckbox from '../../../../../../common/FormComponents/LabeledRadioCheckbox';
import ZicopsTable from '../../../../../../common/ZicopsTable';
import { acceptedFileTypes } from '../../../../../QuestionBanks/Logic/questionBank.helper';
import styles from '../../../questionPaperTab.module.scss';

export default function QuestionTable({
  qbQuestions,
  metaData,
  selectedQb,
  handleSelectedQuestions,
  selectedQuestionIds,
  setSelectedQuestionIds
}) {
  const [searchQuery, setSearchQuery] = useState(null);
  const [allQb, setAllQb] = useState(qbQuestions);
  const [filteredQb, setFilteredQb] = useState(qbQuestions);

  const difficulty = {
    Beginner: [0, 1, 2, 3],
    Competent: [4, 5, 6, 7],
    Proficient: [8, 9, 10]
  };
  useEffect(() => {
    const filteredBasedOnDifficulty = allQb.filter((qb) => {
      return difficulty[metaData?.difficulty_level]?.includes(qb?.Difficulty);
    });

    // clear selected id if one of selected question id is filtered due to difficulty
    if (
      !filteredBasedOnDifficulty?.length ||
      filteredBasedOnDifficulty.some((qb) => !selectedQuestionIds?.includes(qb?.id))
    ) {
      setSelectedQuestionIds([]);
    }
    setAllQb(filteredBasedOnDifficulty);
    setFilteredQb(filteredBasedOnDifficulty);
  }, []);

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

            {acceptedFileTypes.includes(params.row?.AttachmentType) && (
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
              value: searchQuery || ''
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
