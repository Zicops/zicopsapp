import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import styles from './zicopsFileViewer.module.scss';

export default function ZicopsFileViewer({ filePath = null, isDownloadable = false }) {
  if (!filePath) return <div className={`${styles.noFilePath}`}>No File Path Found</div>;

  return (
    <>
      <div className={`${styles.fileViewerContainer}`}>
        <DocViewer
          pluginRenderers={DocViewerRenderers}
          documents={[{ uri: filePath }]}
          className={`${styles.fileViewer} ${!isDownloadable ? styles.hideDownload : ''}`}
          theme={{
            primary: styles.primary,
            secondary: '#ffffff',
            tertiary: styles.darkThree,
            text_primary: '#ffffff',
            text_secondary: '#5296d8',
            text_tertiary: '#00000099',
            disableThemeScrollbar: false,
          }}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: true,
            },
          }}
        />
      </div>
    </>
  );
}
