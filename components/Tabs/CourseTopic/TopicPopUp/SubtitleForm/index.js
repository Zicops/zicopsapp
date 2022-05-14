import { useContext } from 'react';
import { useRecoilValue } from 'recoil';
import { TopicSubtitleAtom, uploadStatusAtom } from '../../../../../state/atoms/module.atoms';
import { courseContext } from '../../../../../state/contexts/CourseContext';
import styles from '../../../../../styles/CourseMaster.module.css';
import Bar from '../../../../common/Bar';
import LabeledDropdown from '../../../../common/FormComponents/LabeledDropdown';
import IconButton from '../../../../common/IconButton';
import useAddSubtitles from '../../Logic/useAddSubtitles';

export default function SubtitleForm({ courseId, topicId }) {
  const { fullCourse } = useContext(courseContext);
  const {
    newSubtitles,
    handleSubtitleInput,
    addNewSubtitles,
    isSubtitlesFormVisible,
    toggleSubtitlesForm,
    isSubtitlesReady
  } = useAddSubtitles(courseId, topicId);

  const subtitles = useRecoilValue(TopicSubtitleAtom);
  const uploadStatus = useRecoilValue(uploadStatusAtom);

  const languageOptions = [];
  fullCourse?.language.forEach((lang) => languageOptions.push({ value: lang, label: lang }));

  return (
    <>
      {subtitles &&
        subtitles.map((res, index) => (
          <Bar
            // style={{
            //   background: `linear-gradient(90deg, #86D386 ${
            //     uploadStatus && uploadStatus?.isSubtitle
            //       ? uploadStatus[subtitles.language] * 100
            //       : 0
            //   }%, #868686 0%, #868686 100%)`
            // }}
            key={res.language + index}
            index={index + 1}
            text={res.language}
            type={'File'}
          />
        ))}

      {isSubtitlesFormVisible && (
        <>
          <div
            className="sub-row"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
              padding: '0px'
            }}>
            <div className={styles.center_row}>
              <LabeledDropdown
                isFiftyFifty={true}
                dropdownOptions={{
                  inputName: 'language',
                  placeholder: 'Select Language',
                  options: languageOptions,
                  isSearchEnable: false,
                  value: newSubtitles.language
                    ? { value: newSubtitles.language, label: newSubtitles.language }
                    : null
                }}
                changeHandler={handleSubtitleInput}
              />
            </div>
            <div className={styles.upload_btn_wrapper} style={{}}>
              <button className={styles.btn}>
                <span className={styles.input_icon}>
                  <span>
                    <img src="/images/upload.png" alt="" />
                  </span>
                </span>
                Browse & upload
              </button>
              <input type="file" name="file" onChange={handleSubtitleInput} />
            </div>
          </div>
          <div id="resourceFile" style={{ textAlign: 'center' }}>
            {newSubtitles?.name}
          </div>
          <div
            className="row"
            style={{
              justifyContent: 'center',
              marginTop: '10px',
              padding: '0px'
            }}>
            <button
              type="button"
              onClick={toggleSubtitlesForm}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                backgroundColor: 'transparent',
                border: 'solid 3px #868f8f',
                color: '#868f8f',
                margin: '10px',
                cursor: 'pointer'
              }}>
              Cancel
            </button>
            <button
              type="button"
              onClick={addNewSubtitles}
              className={isSubtitlesReady ? 'button_single' : 'btn_disable'}
              disabled={!isSubtitlesReady}>
              Add
            </button>
          </div>
        </>
      )}

      <div className="row my_30">
        <IconButton styleClass="btnBlack" text="Add Subtitles" handleClick={toggleSubtitlesForm} />
      </div>

      {/* move to .scss */}
      <style jsx>
        {`
        .sub-row{
          display: flex;
          justify-content: center;
        }
          .button_single{
            padding: '10px 20px',
            borderRadius: '30px',
            backgroundColor: 'transparent',
            border: 'solid 1px #868f8f',
            color: '#868f8f',
            margin: '10px',
            cursor: 'pointer'
          }
          
          .btn_disable {
            padding: 10px 40px;
            background-color: transparent;
            color: #858f8f;
            border: 1px solid #303131;
            border-radius: 35px;
            margin: auto;
            margin: 10px;

            cursor: no-drop;
            opacity: 0.5;
          }
        `}
      </style>
    </>
  );
}
