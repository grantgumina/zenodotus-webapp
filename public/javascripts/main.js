const URLREGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const TAGREGEX = /\^([^\s][^0-9][a-z]*)/g;

Vue.component('vue-message', {
    template: '#vue-message-template',
    props: ['message'],
    computed: {
        messageDeeplink: function() {
            var messageDeeplink = this.message.deeplink;

            var foundURLs = this.message.deeplink.match(URLREGEX);
            foundURLs = foundURLs ? foundURLs : [];
            
            foundURLs.forEach(function(url, index) {
                if (!/^(f|ht)tps?:\/\//i.test(url)) {
                    messageDeeplink = "http://" + url;
                }
            });

            return messageDeeplink;
        }
    }
});

var main = new Vue({
    el: '#vue-area',
    
    data: {
        messagesForSelectedTag: [],
        selectedTag: {},
        tags: {}
    },
    
    asyncComputed: {
        asyncTags: {
            get() {
                return axios.get('/tags').then(response => {
                    this.tags = response.data;
                    return this.tags;
                }).catch(error => {
                    console.log(error);
                    return error;
                });
            },

            default: 'Loading...'
        }
    },

    computed: {
        formattedMessagesForSelectedTag: function() {
            return this.messagesForSelectedTag.map(message => {
                var foundURLs = message.body.match(URLREGEX);
                foundURLs = foundURLs ? foundURLs : [];
                
                foundURLs.forEach(function(url, index) {
            
                    let formattedURL = url;
            
                    if (!/^(f|ht)tps?:\/\//i.test(url)) {
                        formattedURL = "http://" + url;
                    }
            
                    message.body = message.body.replace(url, '<a target="_blank" href="' + formattedURL + '">' + url + '</a>');
                });
            
                return message;
            });
        }
    },

    methods: {
        loadMessageForTag: function(tag) {
            axios.get('/messages/tagid/' + tag.id).then(response => {
                this.messagesForSelectedTag = response.data;
                this.selectedTag = tag;
            }).catch(error => {
                console.log(error);
            });
        },

        deleteTagForId: function(tagId) {
            var self = this;

            axios.delete('/tags/tagid/' + tagId).then(response => {
                if (response.data.tagsRowsDeleted >= 1) {
                    // Remove the tag in question
                    self.tags = self.tags.filter(tag => {
                        return tag.id != tagId;
                    });

                    self.messagesForSelectedTag = [];
                }
            }).catch(error => {
                console.log(error);
            });
        },
        
        isTagActive: function(tag) {
            var result = [];
            if (tag == this.selectedTag) {
                result.push('active');
            }

            return result;
        },

        // TODO - figure out how to use the Zenodotus-Shared project here...
        extract: function(regex, text) {
            // found on stackoverflow
            var foundItems = text.match(regex);
            foundItems = foundItems ? foundItems : [];
            
            foundItems.forEach(function(item, index) {
                foundItems[index] = item.trim();
            });
            
            return foundItems;
        },
        
        extractLinks: function(messageText) {
            return this.extract(URLREGEX, messageText);
        },
        
        extractTags: function(messageText) {
            return this.extract(TAGREGEX, messageText);
        }
    }
});