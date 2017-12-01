
var express = require('express');
var router = express.Router();
const StorageManager = require('../utils/StorageManager.js');

/* GET messages for a tagId */
router.get('/tagid/:tagId', function (req, res) {
	StorageManager.getMessagesForTagId(req.params.tagId).then(data => {
        res.json(data);
    }).catch(error => {
        res.json(error);
    });
});

module.exports = router;