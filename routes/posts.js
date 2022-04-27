var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts');
const isLoggedIn = require('../config/auth');
// 

/* GET users listing. */
// router.get('/posts', (req, res, next) => {
//   res.send('in posts');
// });
//const postsCtrl = require('../controllers/posts');


router.get('/', postsCtrl.index);
router.get('/new', postsCtrl.new);
router.get('/:id', postsCtrl.show);
router.post('/', isLoggedIn, postsCtrl.create);
router.delete('/posts/:id', postsCtrl.delete);

module.exports = router;