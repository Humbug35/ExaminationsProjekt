import moment from 'moment';
import FreightSchema from '../../Schema/freightSchema';
import Order from '../../Schema/orderSchema';

const Outloading = FreightSchema.outloading
const Delivered = FreightSchema.delivered

class Freights {
    sendOutloading(body) {
        return new Outloading({
            freightNoteNumber: body.freightNoteNumber,
            user: body.user,
            sender: body.sender,
            client: body.client,
            package: body.package,
            date: moment().locale('sv').format('lll'),
            isDelivered: body.isDelivered,
            status: body.status
        }).save()
    }

    getAllOutloading(user, freightNumber, status) {
        return Outloading.find()
            .select('freightNoteNumber user sender client package date isDelivered status')
            .where( user ? Outloading.find({ 'user': user }) : Outloading.find() )
            .where( freightNumber ? Outloading.find({ 'freightNoteNumber': freightNumber }) : Outloading.find() )
            .where( status === 'On the way' ? Outloading.find({ 'status': status }) : Outloading.find() )
    }

    getSingleOutloading(freightNoteNumber) {
        return Outloading.findOne({ freightNoteNumber: freightNoteNumber }, () => {

        })
        .select('freightNoteNumber user sender client package date isDelivered status')
    }

    sendDelivered(body) {
        return new Delivered({
            freightNoteNumber: body.freightNoteNumber,
            user: body.user,
            sender: body.sender,
            client: body.client,
            package: body.package,
            date: moment().locale('sv').format('lll'),
            isDelivered: body.isDelivered,
            status: body.status
        }).save()
    }

    getAllDelivered(user, freightnumber, status) {
        return Delivered.find()
            .select('freightNoteNumber user sender client package date isDelivered status')
            .where( user ? Delivered.find({ 'user': user }) : Delivered.find() )
            .where( freightnumber ? Delivered.find({ 'freightNoteNumber': freightnumber }) : Delivered.find() )
            .where( status === 'On the way' ? Delivered.find({ 'status': status }) : Delivered.find() )
    }

    getSingleDelivered(freightNoteNumber) {
        return Delivered.findOne({ freightNoteNumber: freightNoteNumber }, () => {
            
        })
        .select('freightNoteNumber user sender client package date isDelivered status')
    }

    postOrder(body) {
        return new Order({
            freightNoteNumber: body.freightNoteNumber,
            sender: body.sender,
            client: body.client,
            package: body.package,
            date: body.date,
            isDelivered: body.isDelivered,
            status: body.status
        }).save()
    }

    getScannedOutloading(freightNumber) {
        return Outloading.findOne({ freightNoteNumber: freightNumber })
    }

    getFromOrder(freigthNumber, user) {
        return Order.findOne({ freightNoteNumber: freigthNumber }, { _id: 0}, (err, results) => {
            if(err || !results) {
                console.log('Error', err)
                return null
            }
            let docs = JSON.parse(JSON.stringify(results))
            docs.date = moment().locale('sv').format('lll')
            docs.user = user
            docs.status = 'On the way'
            let outloadingFreight = new Outloading(docs)
            outloadingFreight.save()
            Order.findOneAndDelete({ freightNoteNumber: freightNumber }, () => {

            })
        })
    }

    getFromOutloading(freightNumber, user) {
        return Outloading.findOne({ freightNoteNumber: freightNumber, user: user }, { _id: 0 }, (err, results) => {
            if(err || !results) {
                console.log('Error', err)
            }
            let docs = JSON.parse(JSON.stringify(results))
            docs.date = moment().local('sv').format('lll')
            docs.status = 'Delivered'
            docs.isDelivered = true
            let deliveredFreight = new Delivered(docs)
            deliveredFreight.save()
            Outloading.findOneAndDelete({ freightNoteNumber: freightNumber }, () => {

            })
        })
    }

    getUserOutloading(user) {
        return Outloading.find({ user: user }, (err, results) => {
            if(err || !results) {
                console.log('Error: ', err)
            }
        })
    }

    getUserDelivered(user) {
        return Delivered.find({ user: user }, (err, results) => {
            if(err || !results) {
                console.log('Error: ', err)
            }
        })
    }
}

module.exports = Freights;