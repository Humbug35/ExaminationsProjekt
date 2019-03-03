import express from 'express';
import Outloading from '../../../DB/Datalayer/FreightsDB/freights';
const router = express.Router();

const outloading = new Outloading();

router.post('/', (req, res) => {
    outloading.sendOutloading(req.body)
        .then(result => {
            if(result) {
                res.status(201).json({
                    success: true,
                    message: 'Created Outloading'
                })
            }
        })
})

router.get('/', (req, res) => {
    let user = req.query.user;
    let freightNumber = req.query.freightnumber;
    let status = req.query.status;
    outloading.getAllOutloading(user, freightNumber, status)
        .then(result => {
            if(result.length >= 1) {
                res.status(200).json({
                    success: true,
                    result
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "No outloading freights found"
                })
            }
        })
})

router.get('/:freightnumber', (req, res) => {
    let freightNumber = req.params.freightnumber;
    outloading.getSingleOutloading(freightNumber)
        .then(result => {
            if(result) {
                res.status(200).json({
                    success: true,
                    result
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: "Single outloading freight not found"
                })
            }
        })
})

router.post('/gotoouloading', (req, res) => {
    outloading.getFromOrder(req.body.freightNumber, req.body.user)
        .then(() => {
            outloading.getScannedOutloading(req.body.freightNumber)
                .then(user => {
                    if(user) {
                        res.status(200).json({
                            success: true,
                            user
                        })
                    } else {
                        res.status(404).json({
                            success: false,
                            message: 'Ordered freight not found'
                        })
                    }
                })
        })
})

router.get('/user/:user', (req, res) => {
    outloading.getUserOutloading('Linus')
        .then(freights => {
            if(freights.length < 1) {
                res.status(404).json({
                    success: false,
                    message: 'No outloading freights for current user'
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