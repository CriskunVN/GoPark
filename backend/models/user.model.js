import mongoose from 'mongoose';
import { type } from 'os';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: { type: String, required: true, minlength: 8, select: false },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must have a passwordConfirm'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same!',
    },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ['user', 'admin', 'parking_owner'],
    default: 'user',
  },
  profilePicture: { type: String, default: '' }, // hình đại diện người dùng
  phoneNumber: { type: String, default: '' },
  isActive: { type: Boolean, default: true, select: false },
  passwordChangeAt: { type: Date, default: Date.now },
  // the password reset token of the user
  passwordResetToken: String,
  // the password reset expires date of the user
  passwordResetExpires: Date,
});

// Middleware để hash mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre('save', async function (next) {
  // Chỉ hash password nếu nó đã được sửa đổi hoặc là mới
  if (!this.isModified('password') && !this.isNew) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // xóa passwordConfirm sau khi đã hash để bảo mật
  next();
});

// middleware dùng để cập nhật passwordChangeAt
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }
  // Cập nhật thời gian thay đổi mật khẩu
  // thời gian này luôn nhỏ hơn thời gian hết hạn của token JWT.
  this.passwordChangeAt = Date.now() - 1000;
  next();
});

// check password login with hashed password in the database
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check if the password is changed after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp; // false means NOT changed
  }
  return false;
};

// create password reset token
userSchema.methods.createPasswordResetToken = function () {
  // create random token
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  // set expire time for the token
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
