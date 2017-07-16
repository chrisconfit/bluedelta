'use strict';
let rfr = require('rfr');
let wrapper = rfr('wrapper');
let users = rfr('users');
let data = rfr('data');
let UsersTable = new data.UsersTable();

function handler(event, context) {

    if (event.triggerSource && event.triggerSource === 'PostConfirmation_ConfirmSignUp') {
	     	
	     	let attrs = event.request.userAttributes;
	    	let newUser = {identityId: attrs.sub};
	    	
	    	if (attrs.name) newUser.name = attrs.name;
	    	if (attrs.email) newUser.email = attrs.email;
	    	
        let payload = {
            pathParameters: {
                identityId: event.request.userAttributes.sub,
            },
            body: JSON.stringify(newUser),
        };
        return users.Get(payload)
            .then((data) => {
                console.log('User already exists in datastore : (' + data.userId + ')');
            })
            .catch((err) => {
                if (err.statusCode == 404) {
                    return UsersTable.put(JSON.parse(payload.body));
                } else {
                    throw err;
                }
            });
    }
}

module.exports = wrapper.wrapCognitoModule({
    handler,
});
