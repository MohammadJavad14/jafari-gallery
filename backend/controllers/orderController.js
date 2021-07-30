import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Payment from '../models/paymentModel.js';
import axios from 'axios';
import { protect } from '../middleware/authMiddleware.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

const addOrderItems = asyncHandler(async(req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;
    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('سفارشی وجود ندارد');
        return;
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private

const getOrderById = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('سفارش یافت نشد');
    }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private

const updateOrderToPaid = asyncHandler(async(req, res, err) => {
    try {
        const order = await Order.findById(req.params.id);

        const payParams = {
            merchant_id: '6cded376-3063-11e9-a98e-005056a205be',
            amount: order.totalPrice,
            callback_url: `http://localhost:3000/order/${order._id}/paycallback`,
            description: 'خرید از گالری حعفری',
            metadata: [{ eamil: order.eamil }, { mobile: order.phoneNumber }],
        };

        const response = await axios.post(
            'https://api.zarinpal.com/pg/v4/payment/request.json',
            payParams
        );

        if (response.data.data.code == 100) {
            const newPayment = new Payment({
                user: order.user,
                order: order._id,
                amount: order.totalPrice,
                resnumber: response.data.data.authority,
            });

            await newPayment.save();

            res.json({
                url: `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`,
            });
        } else {
            res.redirect('/:id');
        }
    } catch (err) {
        console.log(err);
    }
});

const payCallback = asyncHandler(async(req, res, next) => {
    try {
        // if (req.query.Status && req.query.Status !== 'OK') {
        //     return res.send('تراکنش ناموفق');
        // }
        const authority = req.headers.referer.split('=')[1].split('&')[0];

        const payment = await Payment.findOne({ resnumber: authority });

        const order = await Order.findById(payment.order);

        if (!payment) return res.send('این تراکنش وجود ندارد');

        const payParams = {
            merchant_id: '6cded376-3063-11e9-a98e-005056a205be',
            amount: payment.amount,
            authority: req.query.authority,
        };

        const response = await axios.post(
            'https://api.zarinpal.com/pg/v4/payment/verify.json',
            payParams
        );

        if (response.data.data.code != 100) {
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();

                const updatedOrder = await order.save();
                res.json(updatedOrder);
            } else {
                res.status(404);
                throw new Error('سفارش مربوط به این تراکنش یافت نشد');
            }
        } else {
            return res.send('تراکنش ناموفق');
        }
    } catch (err) {
        next(err);
    }
});

// @desc    GET logged in user orders
// @route   GET /api/orders/myorders
// @access  Private

const getMyOrders = asyncHandler(async(req, res, err) => {
    try {
        const orders = await Order.find({ user: req.user._id });

        res.json(orders);
    } catch (err) {
        console.log(err);
    }
});
export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    payCallback,
    getMyOrders,
};