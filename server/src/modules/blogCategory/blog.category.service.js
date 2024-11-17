const { NotFoundError } = require("../../utils/errors.js");
const BaseService = require("../base/base.service.js");
const blogCategoryRepository = require("./blog.category.repository.js");

class BlogCategoryService extends BaseService {
  #repository;
  constructor(repository, serviceName) {
    super(repository, serviceName);
    this.#repository = repository;
  }

  async createBlogCategory(payload) {
    const { name } = payload;
    if (!name) throw new Error("Blog Category Name is required");
    const blogCategoryData = await this.#repository.createBlogCategory(payload);
    return blogCategoryData;
  }

  async getAllBlogCategory() {
    return await this.#repository.findAll({ status: true });
  }

  async getAllBlogCategoryWithPagination(payload) {
    const blogCategory = await this.#repository.getAllBlogCategoryWithPagination(payload);
    return blogCategory;
  }

  async updateBlogCategory(id, payload) {
    const { name } = payload;
    // console.log("files", files);

    if (!name) throw new Error("Blog Category Name is required");

    const blogCategoryData = await this.#repository.updateBlogCategory(id, payload);
    if (!blogCategoryData) throw new NotFoundError("Blog Category Not Find")
    return blogCategoryData;

  }

  async updateStatusBlogCategory(id, status) {
    if (!status) throw new NotFoundError("Status is required");
    status = (status === "true");
    const blogCategory = await this.#repository.updateStatus(id, { status: status });
    console.log("blogCategory", blogCategory);
    if (!blogCategory) throw new NotFoundError("BlogCategory not found");
    return blogCategory;
  }

  async deleteBlogCategory(id) {
    const blogCategory = await this.#repository.findById(id);
    if (!blogCategory) throw new NotFoundError("BlogCategory not found");
    const deletedBlogCategory = await this.#repository.deleteById(id);
    return deletedBlogCategory;
  }
}

module.exports = new BlogCategoryService(blogCategoryRepository, "blogCategory");
