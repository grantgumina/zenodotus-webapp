
var express = require('express');
var router = express.Router();
const StorageManager = require('zenodotus-shared/StorageManager');
const Helpers = require('zenodotus-shared/Helpers');

/* GET messages for a tagId */
router.get('/tagid/:tagId', function (req, res) {
	StorageManager.getMessagesForTagId(req.params.tagId).then(data => {

        data.forEach(d => {
            let links = Helpers.extractLinks(d.body);
            d.links = links;
        });

        res.json(data);
    }).catch(error => {
        res.json(error);
    });
});

module.exports = router;