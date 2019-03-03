import mongoose from 'mongoose';

let orderSchema = mongoose.Schema({
    freightNoteNumber: { type: String, required: true },
    sender: {
        name: { type: String, required: true },
        address: {
            streetAddress: { type: String, required: true },
            zipCode: { type: Number, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true }
        },
        phoneNumber: { type: Number, required: true }
    },
    client: {
        name: { type: String, required: true },
        address: {
            streetAddress: { type: String, required: true },
            zipCode: { type: Number, required: true },
            city: { type: String, required: true },
            country: { type: String, required: true }
        },
        phoneNumber: { type: Number, required: true }
    },
    package: [
        {
            height: { type: Number, required: true },
            length: { type: Number, required: true },
            width: { type: Number, required: true },
            weight: { type: Number, required: true },
            typeOfPackage: { type: String, required: true }
        }
    ],
    date: { type: String, required: true },
    isDelivered: { type: Boolean, required: true },
    status: { type: String, required: true }
}, { versionKey: false })

module.exports = mongoose.model('Order', orderSchema)