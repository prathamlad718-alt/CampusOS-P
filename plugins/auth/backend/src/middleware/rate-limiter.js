import rateLimit from 'express-rate-limit';

// Rate limiter for authentication routes to prevent brute-force attacks
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 5 : 100, // Limit each IP to 5 requests per windowMs in prod, 100 in dev
  message: {
    success: false,
    error: {
      message:
        'Too many authentication attempts from this IP, please try again after 15 minutes',
      code: 'RATE_LIMIT_EXCEEDED'
    }
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});
