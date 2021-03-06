var express = require('express');
var router = express.Router();
const postsCtrl = require('../controllers/posts');
const isLoggedIn = require('../config/auth');


router.get('/', postsCtrl.index);
router.get('/new', postsCtrl.new);
router.get('/:id', postsCtrl.show);
router.post('/', isLoggedIn, postsCtrl.create);
router.delete('/:id', isLoggedIn, postsCtrl.delete);


module.exports = router;