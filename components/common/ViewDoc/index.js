import { useState } from 'react';
// import { DocumentViewer } from 'react-documents';
import styles from './viewDoc.module.scss';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';

export default function ViewDoc({ url, customStyles = {}, isDownloadable = false, type = null }) {
  const [isLoaded, setIsLoaded] = useState(null);

  const docs = [
    { uri: url },
    // { uri: require('./example-files/pdf.pdf') }, // Local File
  ];
  if (!url) return <div>No URL Found</div>;

  return (
    <div className={`${styles.container}`}>
      {/* {!isLoaded && (
        <div className={`center-element-with-flex ${styles.spinnerContainer}`}>
          <span className={styles.spinner}></span>
        </div>
      )} */}
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        theme={{
          primary: styles.darkTwo,
          secondary: styles.darkOne,
          tertiary: styles.darkThree,
          text_primary: styles.white,
          text_secondary: styles.neutralWhite,
          text_tertiary: styles.darkThree,
          disableThemeScrollbar: true,
        }}
        className={` ${!isDownloadable ? styles.hideDownload : ''}`}
        config={{
          header: {
            disableHeader: true,
          },
        }}
      />
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
