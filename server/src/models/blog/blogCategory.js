const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogCategoryschema = new Schema({
    name: {
        type: String,
    },
    status:{
        type: Boolean,
        default:true
    }

}, { timestamps: true });

module.exports.BlogCategorySchema = mongoose.model("blogCategory", blogCategoryschema);


