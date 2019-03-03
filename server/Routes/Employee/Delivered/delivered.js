import express from 'express';
import Delivered from '../../../DB/Datalayer/FreightsDB/freights';
const router = express.Router();

const delivered = new Delivered();
router.post('/', (req, res) => {
    delivered.sendDelivered(req.body)
        .then(result => {
            if(result) {
                res.status(201).json({
                    message: "Created Delivery"
                })
            }
        })
})

router.get('/', (req, res) => {
    let user = req.query.user;
    let freightNumber = req.query.freightnumber;
    let status = req.query.status;
    delivered.getAllDelivered(user, freightNumber, status)
        .then(result => {
            if(result.length >= 1) {
                res.status(200).json({
                    success: true,
                    result
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "No freights found"
                })
            }
        })
})

router.get('/:freightnumber', (req, res) => {
    let freightnumber = req.params.freightnumber;
    delivered.getSingleDelivered(freightnumber)
        .then(result => {
            if(result) {
                res.status(200).json({
                    success: true,
                    result
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Freight does not exist"
                })
            }
        })
})

// Should be a get instead
router.get('/:freightnumber', (req, res) => {
    let freightnumber = req.params.freightnumber;
    delivered.sendSingleDelivery(freightnumber)
        .then(() => {
           delivered.getSingleDelivered(freightnumber)
            .then(result => {
                if(result.isDelivered) {
                    res.status(200).json({
                        success: true
                    })
                } else {
                    res.status(400).json({
                        success: false
                    })
                }
            })
        })
})

router.post('/gotodelivery', (req, res) => {
    delivered.getFromOutloading(req.body.freightNumber, req.body.user)
        .then(() => {
            delivered.getSingleDelivered(req.body.freightNumber)
                .then(user => {
                    if(user) {
                        res.status(200).json({
                            success: true,
                            user
                        })
                    } else {
                        res.status(404).json({
                            success: false,
                            message: 'Outloading freight not found'
                        })
                    }
                })
        })
})

router.get('/user/:user', (req, res) => {
    delivered.getUserDelivered('Linus')
        .then(freights => {
            if(freights.length < 1) {
                res.status(404).json({
                    success: false,
                    message: 'No delivered freights found for current user'
                })
            } else {
                res.status(200).json({
                    success: true,
                    freights
                })
            }
        })
})

module.exports = router;