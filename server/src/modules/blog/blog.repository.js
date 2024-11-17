const { BlogSchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class BlogRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createBlog(payload) {
    const newTransaction = await this.#model.create(payload);
    return newTransaction;
  }

  async updateBlog(id, payload) {
    const updatedTransaction = await this.#model.findByIdAndUpdate(id, payload);
    return updatedTransaction;
  }
  async getCategoryWiseBlog(id) {
    return this.#model.find({ blogCategoryRef: id }).populate('blogCategoryRef').sort({ createdAt: -1 }); ;
  }

  async getAllBlogWithPagination(payload) {
    try {
      const { blogCategoryRef } = payload;
      const blogs = await pagination(payload, async (limit, offset, sortOrder) => {
        const query = {};
        if (blogCategoryRef) {
          query.blogCategoryRef = blogCategoryRef;
        }
        const blogs = await this.#model.find(query)
          .sort({ createdAt: sortOrder, })
          .skip(offset)
          .limit(limit)
        // .populate('') 
        // .populate('') 


        // Count total documents
        const totalBlog = await this.#model.countDocuments();

        return { doc: blogs, totalDoc: totalBlog };
      });

      return blogs;
    } catch (error) {
      console.error("Error getting blogs with pagination:", error);
      throw error;
    }
  }
}

module.exports = new BlogRepository(BlogSchema);

