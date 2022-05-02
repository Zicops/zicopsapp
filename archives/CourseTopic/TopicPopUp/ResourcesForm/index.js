import { useRecoilValue } from 'recoil';
import { ResourcesAtom } from '../../../../state/atoms/module.atoms';
import styles from '../../../../styles/CourseMaster.module.css';
import IconButton from '../../../common/IconButton';
import useAddResources from '../../Logic/useAddResources';
import QuizAdded from '../../../small/QuizAdded';

export default function ResourcesForm({ courseId, topicId }) {
  const {
    newResource,
    handleResourceInput,
    addNewResource,
    isResourcesFormVisible,
    toggleResourceForm
  } = useAddResources(courseId, topicId);

  const resources = useRecoilValue(ResourcesAtom);
  return (
    <>
      {resources &&
        resources.map((res, index) => (
          <QuizAdded key={res.name + index} index={index + 1} text={res.name} type={res.type} />
        ))}

      {isResourcesFormVisible && (
        <>
          <div className={styles.center_row}>
            <select name="type" onChange={handleResourceInput} value={resources.type}>
              <option hidden>Select Resources Type</option>
              <option>PDF</option>
              <option>EXCEL</option>
              <option>DOC</option>
            </select>
          </div>
          <div
            className="row"
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
              padding: '0px'
            }}>
            <input
              type="text"
              autoComplete="name"
              id="name"
              placeholder="Enter document name"
              required
              name="name"
              onChange={handleResourceInput}
              value={newResource.name}
            />

            <div className={styles.upload_btn_wrapper} style={{}}>
              <button className={styles.btn}>
                <span className={styles.input_icon}>
                  <span>
                    <img src="/images/upload.png" alt="" />
                  </span>
                </span>
                Browse & upload
              </button>
              <input
                type="file"
                name="file"
                accept={`
                  ${newResource.type === 'EXCEL' ? '.csv, .xls, .xlsx' : ''} 
                  ${newResource.type === 'DOC' ? '.doc, .docx' : ''} 
                  ${newResource.type === 'PDF' ? '.pdf' : ''}
                `}
                onChange={handleResourceInput}
              />
            </div>
          </div>
          <div id="resourceFile" style={{ textAlign: 'center' }}>
            {/* {resInput.current} */}
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
              onClick={toggleResourceForm}
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
              onClick={addNewResource}
              style={{
                padding: '10px 20px',
                borderRadius: '30px',
                backgroundColor: 'transparent',
                border: 'solid 1px #868f8f',
                color: '#868f8f',
                margin: '10px',
                cursor: 'pointer'
              }}>
              Add
            </button>
          </div>
        </>
      )}

      <div className="row my_30">
        <IconButton styleClass="btnBlack" text="Add Resources" handleClick={toggleResourceForm} />
      </div>
    </>
  );
}
