var userFunctions = {

	addUser: function(userName, password) {
		var newUser = new User({
			username: userName,
			password: password,
			documents: {}
		});
		newUser.save(function(error, data) {
            if(error) {
            	console.log(error);
            } else {
            	console.log(data);
            }
		})
	}
}