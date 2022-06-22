import dynamic from 'next/dynamic';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

export default function RTE({ changeHandler, value, placeholder }) {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ header: '1' }, { header: '2' }, { header: '3' }],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }]
    ]
  };
  /*
   * Quill editor formats
   * See https://quilljs.com/docs/formats/
   */
  const formats = ['header', 'bold', 'italic', 'underline', 'list', 'bullet', 'indent'];

  return (
    <div>
      <QuillNoSSRWrapper
        modules={modules}
        formats={formats}
        onKeyDown={changeHandler}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
}
