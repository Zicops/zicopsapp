// zicops@temp-365806.iam.gserviceaccount.com
const { google } = require('googleapis');

export default async function googleSheetApiHandler(req, res) {
  console.log('res');
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: 'https://www.googleapis.com/auth/spreadsheets'
  });
  const client = await auth.getClient();
  const googleSheet = google.sheets({ version: 'v4', auth: client });
  const spreadsheetId = '1zR9gTU11oejLOBSQfNkY5JK413z8RWr67u6bgZ4yqfs';

  if (req?.method === 'GET') {
    // const getMetaData = await googleSheet.spreadsheets.get({
    //   auth,
    //   spreadsheetId
    // });

    // res.send(getMetaData);
    const getSheetData = await googleSheet.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Sheet1!A:B'
    });

    res.send(getSheetData);
    return;
  }

  if (req?.method === 'POST') {
    const response = await googleSheet.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: 'Sheet1!A2:B',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [['NextJS', 'The framework for Production']]
      }
    });

    res.send(response);
    return;
  }

  if (req?.method === 'PUT') {
    const response = await googleSheet.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: 'Sheet1!A2:B2',
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [['Jamstack', 'Future of the Web']]
      }
    });

    res.send(response);
    return;
  }
  res.status(200).json({ name: 'John Doe Post' });
  return;
}
