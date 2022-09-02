import Editor from '@monaco-editor/react';
import { useState } from 'react';
import styles from '../labs.module.scss';

export default function ZicopsEditor({ language = '' }) {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body></body>
</html>`);

  function setEditorTheme(monaco) {
    monaco.editor.defineTheme('night-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#202124'
      }
    });
  }

  return (
    <div className={`${styles.zicopsEditor}`}>
      <Editor
        beforeMount={setEditorTheme}
        height="90vh"
        defaultLanguage={language}
        className={`${styles.editor}`}
        theme="dark"
        // options={{
        //   lineWrapping: true,
        //   lint: true,
        //   mode: language,
        //   lineNumbers: true
        // }}
        // defaultValue="// some comment"
        defaultValue={code}
        onChange={(e) => setCode(e)}
      />

      <div className={`${styles.codePreviewContainer}`}>
        <iframe
          srcDoc={code}
          title="output"
          className={`${styles.codePreview}`}
          frameBorder="1"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}
