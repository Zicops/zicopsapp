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
  const spreadsheetId = '10Nn5Wn3jwp7dHjY0AekjQvzT1B25SXsc1_VNR5XW4H8';

  if (req?.method === 'GET') {
    // const getMetaData = await googleSheet.spreadsheets.get({
    //   auth,
    //   spreadsheetId
    // });

    // res.send(getMetaData);
    const getSheetData = await googleSheet.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Sheet1!A:J'
    });

    res.send(getSheetData);
    return;
  }

  if (req?.method === 'POST') {
    // console.log(req?.body?.sheet,'ufui');
    try {
      let sheet = !!req?.body?.sheet ? req?.body?.sheet : 'Sheet1';
      // const range = `${sheet}!A2:B`
      // console.log(sheet,'sfs')
      const response = await googleSheet.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: `${sheet}!A2:B`,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [req?.body?.data || []]
        }
      });

      res.send(response);
    } catch (err) {
      res.status(501).json({ 'Error :': err });
    }
    return;
  }

  if (req?.method === 'PUT') {
    const response = await googleSheet.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `Sheet1!K${req?.body?.rowStart}:AZ`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [req?.body?.data || []]
      }
    });

    res.send(response);
    return;
  }
  res.status(200).json({ name: 'John Doe Post' });
  return;
}
