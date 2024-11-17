const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogschema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    photo:{
        type: String,
    },
    textEditor:{
        type: String,
    },
    blogCategoryRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogCategory'
    },
    status: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

module.exports.BlogSchema = mongoose.model("blog", blogschema);
