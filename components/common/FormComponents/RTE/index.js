// import dynamic from 'next/dynamic';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import styles from '../formComponents.module.scss';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

export default function RTE({
  changeHandler,
  value,
  placeholder,
  customStyles = {},
  isReadOnly = false
}) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: '1' }, { header: '2' }, { header: '3' }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }]
    ]
  };
  // /*
  //  * Quill editor formats
  //  * See https://quilljs.com/docs/formats/
  //  */
  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'indent'];

  // return (
  //   <div>
  //     <QuillNoSSRWrapper
  //       modules={modules}
  //       formats={formats}
  //       onKeyDown={changeHandler}
  //       value={value}
  //       placeholder={placeholder}
  //     />
  //   </div>
  // );
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content: '<h1>Hello World! 🌎️</h1>'
  // });

  return (
    <div className={`${styles.rteContainer}`}>
      <QuillNoSSRWrapper
        readOnly={isReadOnly}
        modules={modules}
        formats={formats}
        theme={isReadOnly ? 'bubble' : 'snow'}
        style={customStyles}
        placeholder={placeholder}
        className={styles.reactQuill}
        onChange={changeHandler}
        value={value}
      />

      {/* <EditorContent editor={editor} /> */}
    </div>
  );
}
