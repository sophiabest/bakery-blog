const Post = require('../models/post');

module.exports = {
    create,
    delete: deleteComment,
    update
};

function update(req, res) {
    Post.findOne({ 'comments._id': req.params.id }, function (err, post) {
        const comment = post.comments.id(req.params.id);
        console.log(comment)
        if (!post.user.equals(req.user._id)) return res.redirect(`/post/${post._id}`);
        console.log(comment.content)
        comment.content = req.body.content;
        post.save(function (err) {
            console.log(err)
            res.redirect(`/posts/${post._id}`);
        });
    });
}

function deleteComment(req, res, next) {
    Post.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id }).then(function (post) {
        if (!post) return res.redirect('/posts');
        post.comments.remove(req.params.id);
        post.save().then(function () {
            res.redirect(`/posts/${post._id}`);
        }).catch(function (err) {
            return next(err);
        });
    });
}

function create(req, res) {
    Post.findById(req.params.id, function (err, post) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        post.comments.push(req.body);
        post.save(function (err) {
            res.redirect(`/posts/${req.params.id}`);
        });
    });
}
