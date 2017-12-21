const URLREGEX = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
const TAGREGEX = /\^([^\s][^0-9][a-z]*)/g;

Vue.component('vue-message', {
    template: '#vue-message-template',
    props: ['message']
});

var main = new Vue({
    el: '#vue-area',
    
    data: {
        messagesForSelectedTag: [],
        selectedTag: {}
    },
    
    asyncComputed: {
        tags: {
            get() {
                return axios.get('/tags').then(response => {
                    return response.data;
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

                    let formattedURL = "";
                    var prefix = 'http://';
                    if (url.substr(0, prefix.length) !== prefix) {
                        formattedURL = prefix + url;
                    }

                    message.body = message.body.replace(url, '<a href="' + formattedURL + '">' + url + '</a>');
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
            })
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