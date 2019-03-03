import express from 'express';

const router = express.Router()

router.get('/', (req, res) => {
    req.session.destroy()
    if(!req.session) {
        res.redirect('http://localhost:3000/login')
    }
})

module.exports = router;