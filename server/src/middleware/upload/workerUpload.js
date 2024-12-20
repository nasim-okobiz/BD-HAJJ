const { Worker } = require('worker_threads');
const path = require('path');

exports.workerUpload = (imgFile) => {
  console.log('worker thread');
  const worker = new Worker(
    path.join(process.cwd(), '/src/middleware/upload/fileUploadWorker.js'),
    {
      workerData: {
        imgFile: imgFile,
      },
    }
  );
  worker.on('message', (message) => {
    return message;
  });
  worker.on('error', (err) => {
    console.log('worker error', err);
    return err;
  });
};
