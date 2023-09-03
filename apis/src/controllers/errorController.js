import AppError from "../Utils/appError.js";

const handleCastError = (err) => {
  const message = `Ivalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicate = (err) => {
  const value = err.errmsg.match(/(?<=")(?:\\.|[^"\\])*(?=")/);
  const message = ` Duplicate fields ${value}`;
  return new AppError(message, 400);
};
const handleValidation = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = ` Ivalid input data: ${errors.join(", ")}`;
  return new AppError(message, 400);
};

const sendErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};
const sendErrPro = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "have something wrong ",
    });
  }
};
export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // show all error infor on development
  if (process.env.NODE_ENV === "development") {
    sendErrDev(err, res);
  }
  // show error code and status on production mode
  else if (process.env.NODE_ENV === "production") {
    let error = err;
    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicate(error);
    if (error.name === "ValidationError") error = handleValidation(error);

    sendErrPro(error, res);
  }
  next();
};
