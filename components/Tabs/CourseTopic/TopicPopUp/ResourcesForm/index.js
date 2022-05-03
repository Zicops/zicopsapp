import { useRecoilValue } from 'recoil';
import { ResourcesAtom } from '../../../../../state/atoms/module.atoms';
import styles from '../../../../../styles/CourseMaster.module.css';
import IconButton from '../../../../common/IconButton';
import QuizAdded from '../../../../small/QuizAdded';
import useAddResources from '../../Logic/useAddResources';

export default function ResourcesForm({ courseId, topicId }) {
  const {
    newResource,
    handleResourceInput,
    addNewResource,
    isResourcesFormVisible,
    toggleResourceForm,
    isResourceReady
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
            <select name="type" onChange={handleResourceInput} value={newResource.type}>
              <option hidden>Select Resources Type</option>
              <option>PDF</option>
              <option>EXCEL</option>
              <option>DOC</option>
              <option>LINK</option>
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
            {console.log(newResource.type)}
            {newResource.type === 'LINK' ? (
              <input
                type="url"
                placeholder="Enter document url"
                name="url"
                required
                onChange={handleResourceInput}
                value={newResource.url}
              />
            ) : (
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
            )}
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
              className={isResourceReady ? 'button_single' : 'btn_disable'}
              disabled={!isResourceReady}>
              Add
            </button>
          </div>
        </>
      )}

      <div className="row my_30">
        <IconButton styleClass="btnBlack" text="Add Resources" handleClick={toggleResourceForm} />
      </div>

      {/* move to .scss */}
      <style jsx>
        {`
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
