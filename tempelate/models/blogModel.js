/*用来渲染博客内容的模板  */
const CreateModel = require("../modelTem.js");
const blogSchame = {
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
}

const blogModel = CreateModel('blog', blogSchame);
module.exports = blogModel
