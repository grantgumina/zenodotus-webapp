var express = require('express');
var router = express.Router();
const StorageManager = require('zenodotus-shared/StorageManager');
const Helpers = require('zenodotus-shared/Helpers');

/* GET tags listing */
router.get('/', function(req, res) {
	StorageManager.getTags().then(data => {
		res.json(data);
	}).catch(error => {
		res.json(error);
	});
});

/* DELETE tag */
router.delete('/tagid/:tagId', function(req, res) {
	StorageManager.deleteTagForId(req.params.tagId).then(data => {
		console.log(data);
		res.json(data);
	}).catch(error => {
		console.log(error);
		res.json(error);
	})
});

module.exports = router;
