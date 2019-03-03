import mongoose from 'mongoose';

const freightSchema = mongoose.Schema({
    freightNoteNumber: { type: String , required: true },
    user: { type: String , required: true },
    sender: {
        name: { type: String , required: true },
        address: {
            streetAddress: { type: String , required: true },
            zipCode: { type: Number , required: true },
            city: { type: String , required: true },
            country: { type: String , required: true }
        },
        phoneNumber: { type: Number, required: true }
    },
    client: {
        name: { type: String , required: true },
        address: {
            streetAddress: { type: String , required: true },
            zipCode: { type: String , required: true },
            city: { type: String , required: true },
            country: { type: String , required: true }
        },
        phoneNumber: { type: String, required: true }
    },
    package: [
        {
            height: { type: Number , required: true },
            length: { type: Number , required: true },
            width: { type: Number , required: true },
            weight: { type: Number , required: true },
            typeOfPackage: { type: String , required: true }
        }
    ],
    date: { type: String },
    isDelivered: { type: Boolean , required: true },
    status: { type: String , required: true }
}, { versionKey: false })

const outloading = mongoose.model('Outloading', freightSchema)
const delivered = mongoose.model('Delivered', freightSchema)
module.exports = {
    outloading,
    delivered
}