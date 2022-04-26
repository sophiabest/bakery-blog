const Post = require('../models/post');

module.exports = {
    index, 
    show,
    new: newPost,
    create
   
}

function index(req, res) {
    Post.find({}, function (err, posts) {
       res.render('posts/index', { posts })
    });
}

function show(req, res) {
    Post.findById(req.params.id, function(err, post) {
            res.render(`posts/show`, { show })
    });
}

function newPost(req, res) {
    res.render('posts/new', { title: 'Add Post' });
}

function create(req, res) {
    Post.create(req.body);
    res.redirect('/posts')
}



