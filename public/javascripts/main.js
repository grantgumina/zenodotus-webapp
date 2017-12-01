var main = new Vue({
    el: '#vue-area',
    
    data: {
        messagesOnView: []
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
        loadMessageForTagId: function(tagId) {
            axios.get('/messages/tagid/' + tagId).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        }
    }
});