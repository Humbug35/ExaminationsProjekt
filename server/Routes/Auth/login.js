import express from 'express';
import bcrypt from 'bcrypt';
import Users from '../../DB/Datalayer/UsersDB/users';
import { session_id } from '../../sessiontoken';

const router = express.Router();
const user = new Users();

router.post('/', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    user.loginUser(userName)
        .then(user => {
            if(user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) {
                        console.log('RouteError: ', err)
                    }
                    if(result) {
                        req.session.token = req.sessionID;
                        const loggedInUser = {
                            user: user.userName,
                            isAdmin: user.isAdmin
                        }
                        req.session.user = loggedInUser
                        req.session.save()
                        if(user.isAdmin) {
                            res.redirect('http://localhost:3000/admin')
                        } else {
                            res.redirect('http://localhost:3000/employee')
                        }
                    } else {
                        res.redirect('http://localhost:3000/login/fail')
                    }
                })
            } else {
                res.redirect('http://localhost:3000/login/fail')
            }
        })
})

module.exports = router;