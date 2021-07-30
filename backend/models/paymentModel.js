import mongoose from 'mongoose';

const paymentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Order',
    },
    resnumber: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },

    payment: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;