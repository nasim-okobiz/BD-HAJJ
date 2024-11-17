const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const BlogService = require("./blog.service.js");


class BlogController {
  //
  createBlog = withTransaction(async (req, res, next, session) => {
    console.log(req.body);
    const payloadFiles = {
      files: req.files,
    };
    const payload = {
      title: req.body.title,
      description: req.body.description,
      textEditor: req.body.textEditor,
      blogCategoryRef: req.body.blogCategoryRef,
    }
    const blogResult = await BlogService.createBlog(
      payloadFiles,
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "Blog Created successfully",
      blogResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllBlog = catchError(async (req, res, next) => {
    const blogResult = await BlogService.getAllBlog();
    const resDoc = responseHandler(200, "Get All Blogs", blogResult);
    res.status(resDoc.statusCode).json(resDoc);
  })
  getSingleBlog = catchError(async (req, res, next) => {
    const id = req.params.id;
    const blogResult = await BlogService.getSingleBlog(id);
    const resDoc = responseHandler(200, "Get Single Blog", blogResult);
    res.status(resDoc.statusCode).json(resDoc);
  });
  getAllBlogWithPagination = catchError(async (req, res, next) => {
    let payload={
			page: req.query.page,
			limit: req.query.limit,
			order: req.query.order,
      blogCategoryRef: req.query.blogCategoryRef,
		}
    const blogResult = await BlogService.getAllBlogWithPagination(payload);
    const resDoc = responseHandler(200, 'Blogs get successfully', blogResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBlog = catchError(async (req, res, next) => {
    const id = req.params.id;
    console.log("id", id);
    const payloadFiles = {
      files: req?.files,
    };
    const payload = {
      title: req.body.title,
      description: req.body.description,
      textEditor: req.body.textEditor,
      blogCategoryRef: req.body.blogCategoryRef,
    }
    const blogResult = await BlogService.updateBlog(id, payloadFiles, payload);
    const resDoc = responseHandler(201, "Blog Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateStatusBlog = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const blogResult = await BlogService.updateStatusBlog(id, status);
    const resDoc = responseHandler(201, "Blog Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });

  getCategoryWiseBlog = catchError(async (req, res, next) => {
    const id = req?.params?.id;
    const blogResult = await BlogService.getCategoryWiseBlog(id);
    const resDoc = responseHandler(200, "Get Category Wise Blogs", blogResult);
    res.status(resDoc.statusCode).json(resDoc);
  });

  deleteBlog = catchError(async (req, res, next) => {
    const id = req.params.id;
    const blogResult = await BlogService.deleteBlog(id);
    const resDoc = responseHandler(200, "Blog Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new BlogController();

