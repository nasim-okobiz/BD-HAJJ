// const { Worker } = require('worker_threads');
// const path = require('path');

// exports.uploadWorker = (file) => {

//   return new Promise((resolve, reject) => {
//     const worker = new Worker(
//       path.join(process.cwd(), '/src/middleware/upload/imgUploadProcessWorker.js'),
//       {
//         workerData: {
//           file,
//         },
//       }
//     );
//     worker.on('message', (message) => {

//       resolve(message);
//     });
//     worker.on('error', (err) => {
//       reject(err);
//     });
//   });
// };


const fs = require('fs');
const path = require('path');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const config = require('../../config/config.js');  // Ensure the path is correct

// Function to handle single image upload
const uploadSingleImg = async (file) => {
  try {
    // Debugging: Check the value of config.uploadFolder and file.originalname



    if (!config.uploadFolder || typeof config.uploadFolder !== 'string') {
      throw new Error('The upload folder is not defined or is not a valid string');
    }

    if (!file.originalname || typeof file.originalname !== 'string') {
      throw new Error('The original filename is not defined or is not a valid string');
    }

    // Ensure the upload folder exists
    await fs.promises.access(config.uploadFolder).catch(() => {
      fs.promises.mkdir(config.uploadFolder, { recursive: true });
    });

    const { buffer, originalname } = file;
    const filePath = path.join(config.uploadFolder, originalname); // Ensure correct path format

    // Debugging: Log the file path to be used


    // Save the file to disk
    fs.writeFileSync(filePath, buffer);


    return { success: true, message: 'File uploaded successfully' };
  } catch (err) {
    console.error('Error during image upload:', err);
    return { success: false, error: err.message || 'An error occurred' };
  }
};

// Worker thread logic
if (!isMainThread) {
  // Worker executes the image upload function
  (async () => {
    const result = await uploadSingleImg(workerData.file);  // Get file from workerData
    parentPort.postMessage(result);  // Send result back to main thread
  })().catch(err => {
    parentPort.postMessage({ success: false, error: err.message });
  });
}

// Main thread function to create the worker and handle file upload
exports.uploadWorker = (file) => {

  return new Promise((resolve, reject) => {
    const worker = new Worker(__filename, {  // Use current file as the worker script
      workerData: { file }
    });

    worker.on('message', (message) => {

      resolve(message);  // Resolve the Promise with the worker's result
    });

    worker.on('error', (err) => {
      console.error('Worker error:', err);
      reject(err);  // Reject the Promise if the worker encounters an error
    });
  });
};
