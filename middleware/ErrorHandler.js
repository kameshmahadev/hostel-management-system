// middleware/errorHandler.js

function errorHandler(err, req, res, next) {
  // Log full stack only in development
  if (process.env.NODE_ENV !== 'production') {
    console.error("Error Log:", err.stack);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null, // optional extra info
  });
}

module.exports = errorHandler;
