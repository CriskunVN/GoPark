import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import userRouter from './routes/user.route.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// 1. GLOBAL MIDDLEWARE

// Middleware bảo mật
app.use(helmet());

// Middleware log request
app.use(morgan('dev'));

// Middleware parse JSON
app.use(express.json());

// Serving static files
app.use(express.static(`${__dirname}/public`));

// 3. ROUTES
app.use('/api/v1/users', userRouter);

// Middleware xử lý lỗi (phải đặt sau tất cả các route)
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
