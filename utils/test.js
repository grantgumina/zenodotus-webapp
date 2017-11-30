const StorageManager = require('./StorageManager.js');

// StorageManager.getMessagesForTagId(5).then(data => {
//     console.log(data);
// }).catch(error => {
//     console.log(error);
// });

StorageManager.getTags().then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});