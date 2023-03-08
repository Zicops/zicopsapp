import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import styles from '../courseBody.module.scss';

// Create styles
const customStyles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    height: '500px',
    position: 'relative'
  },
  dynamicContent: {
    position: 'absolute',
    top: '55%',

    textAlign: 'center',
    width: '100%',
    height: '100%'
  },
  name: { color: styles.primary, fontSize: '25px' },
  courseName: { color: styles.white, fontSize: '10px', margin: '10px 50px' }
});

export default function ZicopsCourseCertificate({ courseName = '', to = '', completionDate = '' }) {
  return (
    <>
      <Document>
        <Page size="A5" orientation="landscape" style={customStyles.page}>
          <View style={customStyles.section}>
            <Image src={'/templates/zicops-certificate-template.png'} />
          </View>
          <View style={customStyles.dynamicContent}>
            <Text style={customStyles.name}>{to}</Text>
            <Text style={customStyles.courseName}>
              In appreciation of completing {courseName} ({completionDate}) with Zicops.
            </Text>
          </View>
        </Page>
      </Document>
    </>
  );
}

// export default function ZicopsCourseCertificate({ courseName = '', to = '', completionDate = '' }) {
//   return (
//     <>
//       <div className={`${styles.zicopsCourseCertificate}`}>
//         <div>
//           <img src={'/templates/zicops-certificate-template.png'} />
//         </div>
//         <div className={`${styles.dynamicContent}`}>
//           <p className={`${styles.userName}`}>{to}</p>
//           <p>
//             In appreciation of completing {courseName} ({completionDate}) with Zicops.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }
