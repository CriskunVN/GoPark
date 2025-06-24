import express from 'express';

import {
  signup,
  login,
  protect, // protect dùng để bảo vệ các route yêu cầu người dùng đã đăng nhập
  restrictTo, // restrictTo dùng để giới hạn quyền truy cập vào các route chỉ cho một số vai trò nhất định
  forgotPassword,
  resetPassword,
  updatePassword,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// authentication Middleware
router.use(protect); // Bảo vệ các route bên dưới, yêu cầu người dùng đã đăng nhập

router.patch('/updateMyPassword', updatePassword);

export default router;
