const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
// const {
//   convertFileNameWithPdfExt,
//   convertFileNameWithWebpExt,
//   convertImgArrayToObject,
//   convertObjOriginalImgNameWithWebpExt,
//   removeUploadFile,
//   uploadWorker,
// } = require("../../middleware/upload/index.js");
const isArrayElementExist = require("../../utils/isArrayElementExist.js");
const blogRepository = require("./blog.repository.js");
const { isMainThread } = require("worker_threads");
const { log } = require("console");
const { convertFileNameWithPdfExt } = require("../../middleware/upload/convertFileNameWithPdfExt.js");
const { convertFileNameWithWebpExt } = require("../../middleware/upload/convertFileNameWithWebpExt.js");
const { uploadWorker } = require("../../middleware/upload/uploadWorker.js");
const { convertImgArrayToObject } = require("../../middleware/upload/convertImgArrayToObject.js");
const { removeUploadFile } = require("../../middleware/upload/removeUploadFile.js");


class BlogService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBlog(payloadFiles, payload) {
    const { files } = payloadFiles;

    if (!files) throw new Error("Photo is required");
    const { title, description,
      textEditor, blogCategoryRef } = payload;
    if (!title || !description || !textEditor || !blogCategoryRef) throw new Error("All fields are required");

    let images;
    if (Array.isArray(files) && files.length > 0 && isMainThread) {
      // Map over the files and prepare them for upload
      const imgFile = files.map(({ buffer, originalname, fieldname, mimetype }) => ({
        buffer,
        originalname: 
          mimetype === "application/pdf"
            ? convertFileNameWithPdfExt(originalname)
            : convertFileNameWithWebpExt(originalname),
        fieldname,
        mimetype,
      }));
    
      console.log("imgFile", imgFile);
    
      // Handle the upload of each file
      for (let file of imgFile) {
        try {
          await uploadWorker(file);  // Assuming uploadWorker can handle one file at a time
        } catch (error) {
          console.error('Error uploading file:', error);
          throw new Error('File upload failed');
        }
      }
    
      // After upload, convert imgFile array to object format
      images = convertImgArrayToObject(imgFile);
    } else {
      throw new Error("Invalid or empty files array");
    }

    for (const key in images) {
      payload[key] = images[key];
    }

    const blogData = await this.#repository.createBlog(payload);
    return blogData;
  }

  async getAllBlog() {
    return await this.#repository.findAll({ status: true }, ["blogCategoryRef"]);
  }
  async getSingleBlog(id) {
    const blogData = await this.#repository.findOne({ status: true, _id: id }, ["blogCategoryRef"]);
    if (!blogData) throw new NotFoundError("Blog not found");
    return blogData;
  }

  async getAllBlogWithPagination(payload) {
    const blogs = await this.#repository.getAllBlogWithPagination(payload);
    return blogs;
  }

  async updateBlog(id, payloadFiles, payload) {
    const { files } = payloadFiles;
    const { title, description,
      textEditor, blogCategoryRef } = payload;
    if (!title || !description || !textEditor || !blogCategoryRef) throw new Error("All fields are required");

  if(files.length){
    if (!files) throw new Error("Photo is required");
    let images;
    if (Array.isArray(files) && files.length > 0 && isMainThread) {
      // Map over the files and prepare them for upload
      const imgFile = files.map(({ buffer, originalname, fieldname, mimetype }) => ({
        buffer,
        originalname: 
          mimetype === "application/pdf"
            ? convertFileNameWithPdfExt(originalname)
            : convertFileNameWithWebpExt(originalname),
        fieldname,
        mimetype,
      }));
    
      console.log("imgFile", imgFile);
    
      // Handle the upload of each file
      for (let file of imgFile) {
        try {
          await uploadWorker(file);  // Assuming uploadWorker can handle one file at a time
        } catch (error) {
          console.error('Error uploading file:', error);
          throw new Error('File upload failed');
        }
      }
    
      // After upload, convert imgFile array to object format
      images = convertImgArrayToObject(imgFile);
    } else {
      throw new Error("Invalid or empty files array");
    }

    for (const key in images) {
      payload[key] = images[key];
    }
  }
    const blogData = await this.#repository.updateBlog(id, payload);
    if (!blogData) throw new Error("Blog not found");
    if (files.length && blogData) {
      await removeUploadFile(blogData?.photo)
    }
    return blogData;

  }

  async updateStatusBlog(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const blog = await this.#repository.updateStatus(id, { status: status });
    console.log("blog", blog);
    if (!blog) throw new NotFoundError("Blog not found");
    return blog;
  }

  async getCategoryWiseBlog(id) {
    const blog = await this.#repository.getCategoryWiseBlog(id);
    if (!blog) throw new NotFoundError("Blog not found");
    return blog;
  }

  async deleteBlog(id) {
    const blog = await this.#repository.findById(id);
    if (!blog) throw new NotFoundError("Blog not found");
    const deletedBlog = await this.#repository.deleteById(id);
    if (deletedBlog && blog?.photo) {
      await removeUploadFile(blog?.photo)
    }
    return deletedBlog;
  }
}

module.exports = new BlogService(blogRepository, "blog");
