import LabeledInput from '@/components/common/FormComponents/LabeledInput';
import { loadQueryDataAsync } from '@/helper/api.helper';
import { QuestionPaperTabDataAtom } from '@/state/atoms/exams.atoms';
import { FeatureFlagsAtom } from '@/state/atoms/global.atom';
import { GET_FIXED_QUESTION } from 'API/Queries';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DIFFICULTY, getPageSizeBasedOnScreen } from '../../../../../../../helper/utils.helper';
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
  const [questionPaperTabData, setQuestionPaperTabData] = useRecoilState(QuestionPaperTabDataAtom);
  const { isDev } = useRecoilValue(FeatureFlagsAtom);

  const [searchQuery, setSearchQuery] = useState(null);
  const [allQb, setAllQb] = useState(qbQuestions);
  const [filteredQb, setFilteredQb] = useState(qbQuestions);

  useEffect(async () => {
    const alreadySelectedQuestionIds = [];
    for (let i = 0; i < questionPaperTabData.mappedQb?.length; i++) {
      const mapping = questionPaperTabData.mappedQb[i];
      if (
        mapping?.qbId === metaData?.qbId &&
        metaData?.difficulty_level === mapping?.difficulty_level
      ) {
        if (mapping?.retrieve_type === 'random') continue;

        const data = await loadQueryDataAsync(GET_FIXED_QUESTION, { mapping_id: mapping?.id });

        alreadySelectedQuestionIds.push(
          ...data.getSectionFixedQuestions[0]?.QuestionId?.split(',')
        );
      }
    }

    const filteredBasedOnDifficulty = allQb.filter((q) => {
      if (alreadySelectedQuestionIds.includes(q?.id) && !selectedQuestionIds?.includes(q?.id))
        return false;

      return DIFFICULTY[metaData?.difficulty_level]?.includes(q?.Difficulty);
    });

    // clear selected id if one of selected question id is filtered due to difficulty
    const isAllIdPresent = selectedQuestionIds?.every((id) => {
      const index = filteredBasedOnDifficulty?.findIndex((q) => q?.id === id);
      return index >= 0;
    });
    if (!isAllIdPresent) setSelectedQuestionIds([]);

    setAllQb(filteredBasedOnDifficulty);
    setFilteredQb(filteredBasedOnDifficulty);
  }, []);

  useEffect(() => {
    if (!searchQuery) return;

    setFilteredQb(
      allQb.filter((q) => q?.Description?.toLowerCase().includes(searchQuery?.toLowerCase()))
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
      flex: 0.7
    }
  ];

  return (
    <>
      {isDev ? (
        <></>
      ) : (
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
      )}

      <ZicopsTable
        columns={columns}
        data={filteredQb}
        pageSize={isDev ? 5 : getPageSizeBasedOnScreen()}
        rowsPerPageOptions={[3]}
        tableHeight="50vh"
        showCustomSearch={isDev}
        searchProps={{
          handleSearch: (val) => setSearchQuery(val),
          delayMS: 0,
          customElement: <p className={`w-100 ${styles.qbName}`}>{selectedQb?.name}</p>
        }}
      />
    </>
  );
}
