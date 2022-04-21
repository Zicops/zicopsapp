import { width } from '@mui/system';
import { DocumentViewer } from 'react-documents';

export default function ViewDoc({ url }) {
  return (
    <DocumentViewer
      style={{ minHeight: '60vh', width: '100%' }}
      // viewerUrl={'https://docs.google.com/gview?url=%URL%&embedded=true'}
      // url={'https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc'}
      // viewer="office"
      url={url}
      queryParams="hl=Nl"
      // viewer={selectedViewer.name}
      // viewerUrl={selectedViewer.viewerUrl}
      overrideLocalhost="https://demo.zicops.com/admin/courses"></DocumentViewer>
  );
}
