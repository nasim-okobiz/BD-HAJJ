const { Router } = require('express');
const controller = require('../../modules/blogCategory/blog.category.controller.js');


const BlogCategoryRoute = Router();
// BlogCategoryRoute.use(jwtAuth());
BlogCategoryRoute
  .post('/', controller.createBlogCategory)
  .get('/', controller.getAllBlogCategory)
  .get('/pagination', controller.getAllBlogCategoryWithPagination); 

BlogCategoryRoute
  .route('/:id')
  // .get(controller.getSingleBlogCategory)
  .put( controller.updateBlogCategory) 
  .delete(controller.deleteBlogCategory);
BlogCategoryRoute
  .put('/status/:id', controller.updateStatusBlogCategory)

  module.exports = BlogCategoryRoute;
