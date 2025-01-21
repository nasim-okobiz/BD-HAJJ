const catchError = require("../../middleware/errors/catchError.js");
const responseHandler = require("../../utils/responseHandler.js");
const withTransaction = require("../../middleware/transactions/withTransaction.js");
const BlogCategoryService = require("./blog.category.service.js");

class BlogCategoryController {
  //
  createBlogCategory = withTransaction(async (req, res, next, session) => {

    const payload = {
      name: req?.body?.name,
    };
    const blogCategoryResult = await BlogCategoryService.createBlogCategory(
      payload,
      session
    );
    const resDoc = responseHandler(
      201,
      "BlogCategory Created successfully",
      blogCategoryResult
    );
    res.status(resDoc.statusCode).json(resDoc);
  });

  getAllBlogCategory = catchError(async (req, res, next) => {
    const blogCategoryResult = await BlogCategoryService.getAllBlogCategory();
    const resDoc = responseHandler(200, "Get All BlogCategorys", blogCategoryResult);
    res.status(resDoc.statusCode).json(resDoc);
  })

  getAllBlogCategoryWithPagination = catchError(async (req, res, next) => {
    let payload = {
      page: req.query.page,
      limit: req.query.limit,
      order: req.query.order,
    }
    const blogCategory = await BlogCategoryService.getAllBlogCategoryWithPagination(payload);
    const resDoc = responseHandler(200, 'BlogCategorys get successfully', blogCategory);
    res.status(resDoc.statusCode).json(resDoc);
  });

  updateBlogCategory = catchError(async (req, res, next) => {
    const id = req.params.id;
    const payload = {
      name: req?.body?.name,
    };
    const blogCategoryResult = await BlogCategoryService.updateBlogCategory(id, payload);
    const resDoc = responseHandler(201, "BlogCategory Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  updateStatusBlogCategory = catchError(async (req, res, next) => {
    const id = req.params.id;
    const status = req.query.status;
    const blogCategoryResult = await BlogCategoryService.updateStatusBlogCategory(id, status);
    const resDoc = responseHandler(201, "BlogCategory Status Update successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
  deleteBlogCategory = catchError(async (req, res, next) => {
    const id = req.params.id;
    const blogCategoryResult = await BlogCategoryService.deleteBlogCategory(id);
    const resDoc = responseHandler(200, "BlogCategory Deleted successfully");
    res.status(resDoc.statusCode).json(resDoc);
  });
}

module.exports = new BlogCategoryController();

