import UploadForm from '../common/FormComponents/UploadForm';

export default function BulkUpload() {
  async function CSV_XLSX_File_Selected_Event(e) {
    let ext = e.target.file;
    ext = ext.split('.');
    ext = ext[ext.length - 1];
    var files = inputElement.files || [];
    if (!files.length) return;
    var file = files[0];
    var reader = new FileReader();
    reader.onloadend = async function (event) {
      var arrayBuffer = reader.result;
      var options = { type: 'array' };
      var workbook = XLSX.read(arrayBuffer, options);
      //console.timeEnd();

      var sheetName = workbook.SheetNames;
      var sheet = workbook.Sheets[sheetName];
      var sheet_to_html = XLSX.utils.sheet_to_html(sheet);
      var sheet_to_json = XLSX.utils.sheet_to_json(sheet);

      if (sheet_to_json.length === 0) {
        var sheet_to_csv = [XLSX.utils.sheet_to_csv(sheet)];
        var results = sheet_to_csv;
      }

      if (sheet_to_json.length > 0) {
        var results = sheet_to_json;
      }

      let Parsed_File_Obj = {
        sheet_to_html: sheet_to_html,
        results: results,
        ext: ext
      };

      console.log('Parsed_File_Obj');
      console.log(Parsed_File_Obj);
    };
    reader.readAsArrayBuffer(file);
  }
  return (
    <>
      <UploadForm
        filePath="/templates/user-invite-template.xlsx"
        fileName="Bulk Invite Template"
        handleFileUpload={(e) => {
          console.log(e.target.files);
        }}
      />
    </>
  );
}
