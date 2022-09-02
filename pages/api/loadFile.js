const https = require('https');
const fs = require('fs');
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  // const filePath = req?.query?.filePath;
  console.log(req?.query);

  async function getFileFromLink(url) {
    const fileRes = await fetch(url).then((res) => console.log(res));
    const blob = await fileRes.blob();

    let fileName = getFilenameFromContentDisposition(fileRes);
    if (!fileName) {
      fileName = url.split('/').pop();
    }

    const file = new File([blob], fileName, {
      type: blob.type
    });

    return file;
  }

  // const { filePath, ...restHeaders } = req?.query;
  // let fileUrl = filePath;
  // for (const header in restHeaders) {
  //   const element = restHeaders[header];
  //   console.log(element, header);

  //   fileUrl += `&${header}=${element}`;
  // }
  // console.log(fileUrl);

  const fileArr = await (await fetch(req?.query?.filePath)).arrayBuffer();
  console.log(fileArr);

  // var file = fs.createWriteStream(req?.headers?.referer);
  // https.get(filePath, function (response) {
  //   response.pipe(file);
  //   file.on('finish', function () {
  //     file.close(() => console.log('callback'));
  //   });
  // });

  // res.status(200).json({ name: req?.query?.filePath, file: fileArr });

  res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.send(fileArr);
  return;
}
