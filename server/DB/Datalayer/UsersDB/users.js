import Users from '../../Schema/userSchema';

class User {
    createUser(userName, password, admin) {
        return Users.findOne({ userName: userName }, (err, result) => {
            if(err) {
                console.log('Error: ', err)
            }
            if(result) {
                return result
            } else {
                return new Users({
                    userName: userName,
                    password: password,
                    isAdmin: admin
                }).save()
            }
        })
    }

    loginUser(userName) {
        return Users.findOne({ userName: userName }, (err) => {
            if(err) {
                console.log('DBError: ', err)
            }
        })
    }
}

module.exports = User;