const { Router } = require('express');
const controller = require('../../modules/blog/blog.controller.js');
const { upload } = require('../../middleware/upload/upload.js');


const BlogRoute = Router();
// BlogRoute.use(jwtAuth());
BlogRoute
  .post('/',upload.any(), controller.createBlog)
  .get('/', controller.getAllBlog)
  .get('/pagination', controller.getAllBlogWithPagination); 

BlogRoute
  .route('/:id')
  .get(controller.getSingleBlog)
  .put(upload.any(), controller.updateBlog) 
  .delete(controller.deleteBlog);
BlogRoute
  .put('/status/:id', controller.updateStatusBlog)
  .get('/category/:id', controller.getCategoryWiseBlog)

  module.exports = BlogRoute;

