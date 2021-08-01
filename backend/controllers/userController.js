import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('ایمیل یا رمز عبور صحیح نیست');
    }
});

// @desc    Rgister a new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('با این ایمیل قبلا ثبت نام شده است');
    }

    const user = await User.create({
        name,
        email,
        password,
        phoneNumber,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('اطلاعات وارد شده صحیح نمی باشد');
    }
});

// @desc    Updtate user profile
// @route   PUT /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('کاربر یافت نشد');
    }
});

const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error('کاربر یافت نشد');
    }
});

// @desc    GET all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({});

    res.json(users);
});

export { authUser, getUserProfile, registerUser, updateUserProfile, getUsers };