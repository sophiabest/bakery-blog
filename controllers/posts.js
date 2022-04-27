const Post = require('../models/post');

module.exports = {
    index, 
    show,
    new: newPost,
    create,
    delete: deletePost
   
}

function index(req, res) {
    Post.find({}, function (err, posts) {
       res.render('posts/index', { title: 'All Posts', posts  })
    });
}

function show(req, res) {
    Post.findById(req.params.id, function(err, post) {
            res.render(`posts/show`, { title: 'Post Detail', post })
    });
}

function newPost(req, res) {
    res.render('posts/new', { title: 'Add Post' });
}

function create(req, res) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar =  req.user.avatar;
    Post.create(req.body, function(err, post) {
        res.redirect('/posts')
    });
}

function deletePost(req, res, next) {
    Post.findOne({'post._id': req.params.id, 'post.user': req.params.id}).then(function(post) {
        if (!post) return res.redirect('/posts');
        post.remove(req.params.id);
        post.save().then(function() {
            res.redirect('/posts');
        }).catch(function(err) {
            return next(err)
        })
    })
}
