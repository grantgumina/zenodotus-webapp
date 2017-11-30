var express = require('express');
var router = express.Router();
const StorageManager = require('../utils/StorageManager.js');

/* GET home page. */
router.get('/', function (req, res) {
	StorageManager.getTags().then(tags => {
		res.render('index', { title: 'Zenodotus', "tags": tags });
	});
});

module.exports = router;
