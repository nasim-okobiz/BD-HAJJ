const { BlogCategorySchema } = require("../../models/index.js");
const pagination = require("../../utils/pagination.js");
const BaseRepository = require("../base/base.repository.js");


class BlogCategoryRepository extends BaseRepository {
  #model;
  constructor(model) {
    super(model);
    this.#model = model;
  }

  async createBlogCategory(payload) {
    const newBlogCategory = await this.#model.create(payload);
    return newBlogCategory;
  }

 async updateBlogCategory(id, payload) {
   const updatedBlogCategory = await this.#model.findByIdAndUpdate(id, payload);
   return updatedBlogCategory;
 }

 async getAllBlogCategoryWithPagination(payload) {
  try {
    const blogCategorys = await pagination(payload, async (limit, offset, sortOrder) => {
      const blogCategorys = await this.#model.find({
      })
        .sort({ createdAt: sortOrder , }) 
        .skip(offset)
        .limit(limit)
        // .populate('') 
        // .populate('') 


      // Count total documents
      const totalBlogCategory = await this.#model.countDocuments();

      return { doc: blogCategorys, totalDoc: totalBlogCategory };
    });

    return blogCategorys;
  } catch (error) {
    console.error("Error getting blogCategorys with pagination:", error);
    throw error;
  }
}
}
module.exports = new BlogCategoryRepository(BlogCategorySchema);

