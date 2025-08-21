import AppError from "../utils/appError.js";

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  req.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export default errorMiddleware;