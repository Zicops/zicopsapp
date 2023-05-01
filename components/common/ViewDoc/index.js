import { useState } from 'react';
// import * as RDocs from 'react-documents';
import styles from './viewDoc.module.scss';

export default function ViewDoc({ url, customStyles = {} }) {
  const [isLoaded, setIsLoaded] = useState(null);

  // const { DocumentViewer } = RDocs;

  return (
    <div className={`${styles.container}`}>
      {!isLoaded && (
        <div className={`center-element-with-flex ${styles.spinnerContainer}`}>
          <span className={styles.spinner}></span>
        </div>
      )}

      {/* <DocumentViewer
        style={
          isLoaded
            ? { minHeight: '60vh', width: '100%', ...customStyles }
            : { opacity: 0, height: 0, width: 0 }
        }
        url={url}
        queryParams="hl=en"
        loaded={() => setIsLoaded(true)}
        overrideLocalhost="https://staging.zicops.com/admin/courses"
        // viewerUrl={'https://docs.google.com/gview?url=%URL%&embedded=true'}
        // url={'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc'}
        // viewer="office"
        // viewer={selectedViewer.name}
        // viewerUrl={selectedViewer.viewerUrl}
      /> */}
    </div>
  );
}
