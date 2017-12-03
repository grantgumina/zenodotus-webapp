var express = require('express');
var router = express.Router();
const StorageManager = require('zenodotus-storage-manager');

/* GET tags listing */
router.get('/', function (req, res) {
	StorageManager.getTags().then(data => {
		res.json(data);
	}).catch(error => {
		res.json(error);
	});
});

module.exports = router;
