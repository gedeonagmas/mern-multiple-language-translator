class throwError extends Error {
  constructor(messages, statusCode) {
    super(messages);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.statusCode);
  }
}

const error = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development ") {
    res.status(err.statusCode).json({
      err: err,
      stack: err.stack,
      status: err.status,
      message: err.message,
    });
  } else if (process.env.NODE_ENV === "production ") {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "Fail",
      message: "Something Went Wrong",
    });
  }
};

module.exports = { throwError, error };
