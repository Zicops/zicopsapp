// import dynamic from 'next/dynamic';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import styles from '../formComponents.module.scss';
import LabeledRadioCheckbox from '../LabeledRadioCheckbox';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

export default function RTE2({
  onPostHandler,
  onCancleHandler,
  changeHandler,
  changeImageHandler,
  onAnonymousHandler,
  onAnnouncementHandler,
  checkAnonymous,
  checkPublic,
  checkAnnouncement,
  handleKeyPress,
  value,
  placeholder,
  customStyles = {},
  isReadOnly = false,
  isMessage=true
}) {
  const modules = {
    toolbar: {
      container:[
      ['bold', 'italic', 'underline'],
      [{ header: '1' }, { header: '2' }, { header: '3' }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, 'blockquote' , 'code-block'],
      ['link', 'image' ],
    ],
    handlers: {
         image: changeImageHandler,
       }
    } 
  };
  // /*
  //  * Quill editor formats
  //  * See https://quilljs.com/docs/formats/
  //  */
  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet',  'indent', 'blockquote','code-block', 'link', 'image'];

  return (
    <div className={`${isReadOnly ? styles.rteReadOnly : styles.rteContainer2 }`}>
      <QuillNoSSRWrapper
        contenteditable
        readOnly={isReadOnly}
        modules={modules}
        formats={formats}
        theme={isReadOnly ? 'bubble' : 'snow'}
        style={customStyles}
        placeholder={placeholder}
        className={styles.reactQuill}
        onChange={changeHandler}
        onKeyDown={handleKeyPress}
        value={value}
      />
      {/* <input type="file" onChange={changeImageHandler} /> */}
      {!isReadOnly ? 
      <div className={`${styles.rteButtons}`}>
        <div className={`${styles.post_type}`}>
          {/* <LabeledRadioCheckbox label="Public" type="radio" name="public" isChecked={checkPublic}  changeHandler ={onPublicHandler} /> */}
          <LabeledRadioCheckbox label="Post this anonymously" type="checkbox" name="anonymous" isChecked={checkAnonymous}  changeHandler ={onAnonymousHandler} />
            {isMessage &&
              <>
                <div className={`${styles.button_divider}`}></div>
                <LabeledRadioCheckbox label="Post this as an announcement" type="checkbox" name="announcement" isChecked={checkAnnouncement} changeHandler={onAnnouncementHandler} />
              </>
            }
        </div>
          <div className={`${styles.button_type}`}>
            
        <button className={`${value ? styles.button1 : styles.buttonDisable }`} onClick={onPostHandler}>Post</button>
        <button className={`${styles.button2}`} onClick={onCancleHandler}>Cancel</button>
        </div>
        </div>
        : ""
      }
      </div>
  );
}
