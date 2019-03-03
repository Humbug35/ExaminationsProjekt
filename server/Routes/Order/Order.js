import express from 'express';
import Order from '../../DB/Datalayer/FreightsDB/freights';
const router = express.Router();

const order = new Order();

router.post('/', (req, res) => {
    order.postOrder(req.body)
        .then(result => {
            if(result) {
                res.status(201).json({
                    success: true
                })
            } else {
                res.status(400).json({
                    success: false
                })
            }
        })
        .catch(error => {
            console.log('Error: ', error)
        })
})

router.get('/:freightnumber', (req, res) => {
    const freightNumber = req.params.freightnumber;
    order.getOrder(freightNumber)
        .then(() => {
            order.getScannedOutloading(freightNumber)
                .then(results => {
                    if(results) {
                        res.status(200).json({
                            success: true,
                            results
                        })
                    } else {
                        res.status(404).json({
                            success: false,
                            message: 'Current freight in order not found'
                        })
                    }
                })
        })
})

module.exports = router;