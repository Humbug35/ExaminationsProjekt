import express from 'express';
import bcrypt from 'bcrypt';
import Users from '../../DB/Datalayer/UsersDB/users';

const router = express.Router();
const user = new Users()

router.post('/', (req, res) => {
    if(!req.session.token) {
        return res.status(401).json({
            isAuthenticated: false,
            message: 'Unauthorized'
        });
    }
    const userName = req.body.userName;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    bcrypt.hash(password, 10, (err, hash) => {
        if(err) {
            console.log('Error: ', err)
        }
        return user.createUser(userName, hash, isAdmin)
            .then(user => {
                if(user) {
                    res.status(409).json({
                        success: false,
                        message: 'User aldready exists'
                    })
                } else {
                    res.status(201).json({
                        success: true,
                        message: 'User created'
                    })
                }
        })
    })
})

module.exports = router;