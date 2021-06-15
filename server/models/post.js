const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    "title": String,
    "content": String,
    "author": String,
    "tags": [String],
}, { timestamps: true });

const Post = mongoose.model('post', postSchema);

module.exports = Post;