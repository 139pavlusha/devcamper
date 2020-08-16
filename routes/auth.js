const express = require('express');
const { protect } = require('../middleware/auth');
const {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword,
    updateDetalis,
    updatePassword } = require('../controllers/auth');

const router = express.Router();

router.post('/register', register)
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);
router.put('/updatedetalis', protect, updateDetalis);
router.put('/updatepassword', protect, updatePassword);


module.exports = router;