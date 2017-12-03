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
                    console.log(response.data);
                    return response.data;
                }).catch(error => {
                    console.log(error);
                    return error;
                });
            },

            default: 'Loading...'
        }
    },

    methods: {
        loadMessageForTag: function(tag) {
            // var self = this;
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
        }
    }
});