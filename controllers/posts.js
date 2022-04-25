const Post = require('../models/post');

module.exports = {
    index,
    new: newPost,
    create,
    show
}

function index(req, res) {
    Post.find({}, function(err, posts) {
      res.render('posts/index', { title: 'All Posts', posts });
    });
}

function show(req, res) {
    Post.findById(req.params.id, (err, post) => {
        res.render(`posts/show`, { title: 'Post Detail', post });
    });
}

function newPost(req, res) {
    res.render('posts/new', { title: 'Add Post' });
}

function create(req, res) {
    var post = new Post(req.body);
    post.save(function(err) {
        if (err) return res.redirect('/posts/new');
        console.log(post);
        res.redirect(`/posts/${post._id}`);
    });
}

