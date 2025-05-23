// middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error("Error Log:", err.stack);

  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal Server Error",
    details: err.details || null
  });
}

module.exports = errorHandler;
