import { get } from 'https';

export default async function overrideCors(req, res) {
  // res.setHeader('content-type', 'text/plain; charset=utf-8');
  get(req?.query?.filePath, (stream) => {
    stream.pipe(res);
  });
  return;
}

  // const filePath = req?.query?.filePath;
  // console.log(req?.query?.filePath);

  // async function getFileFromLink(url) {
  //   const fileRes = await fetch(url).then((res) => console.log(res));
  //   const blob = await fileRes.blob();

  //   let fileName = getFilenameFromContentDisposition(fileRes);
  //   if (!fileName) {
  //     fileName = url.split('/').pop();
  //   }

  //   const file = new File([blob], fileName, {
  //     type: blob.type
  //   });

  //   return file;
  // }

  // const { filePath, ...restHeaders } = req?.query;
  // let fileUrl = filePath;
  // for (const header in restHeaders) {
  //   const element = restHeaders[header];
  //   console.log(element, header);

  //   fileUrl += `&${header}=${element}`;
  // }
  // console.log(fileUrl);

  // const fileArr = await (await fetch(req?.query?.filePath)).arrayBuffer();
  // console.log(fileArr);

  // var file = fs.createWriteStream(req?.headers?.referer);
  // https.get(filePath, function (response) {
  //   response.pipe(file);
  //   file.on('finish', function () {
  //     file.close(() => console.log('callback'));
  //   });
  // });

  // res.status(200).json({ name: req?.query?.filePath, file: fileArr });

  // console.log(imageStream);
  // pipeline(imageStream, res, (error) => {
  //   if (error) console.error(error);
  // });
  // res.json({ hello: 'world' });
