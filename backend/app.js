import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import { fileURLToPath } from 'url';
import cors from 'cors';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express(); // ✅ Đặt trước tất cả app.use

// 1. GLOBAL MIDDLEWARE
app.use(cors({
  origin: 'http://localhost:3001', // FE Next.js URL
  credentials: true, // Cho phép gửi cookie hoặc Authorization headers
}));

app.use(helmet()); // Bảo mật HTTP headers
app.use(morgan('dev')); // Ghi log các request
app.use(express.json()); // Parse JSON request body
app.use(express.static(`${__dirname}/public`)); // Serve file tĩnh nếu cần


// CORS
app.use(
  cors({
    origin: 'http://localhost:3001', // FE Next.js domain
    credentials: true, //  để gửi cookie hoặc authorization headers
  })
);

// 3. ROUTES
app.use('/api/v1/users', userRouter);

// 3. ERROR HANDLER — luôn để sau routes
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
