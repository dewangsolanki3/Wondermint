import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import usersRouter from "./src/routes/usersRoute.js";
import AppError from "./src/Utils/appError.js";
import cors from "cors";
import globalErrorController from "./src/controllers/errorController.js";
const app = express();
app.use(express.json());

app.use(cors());
// set limit request from IP
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 1000,
  messager: "Too many request from this IP, please try again later",
});
// protect limiter router:
app.use("/api", limiter);

app.use(morgan("dev"));
console.log(process.env.NODE_ENV);

// custom midleware
app.use((req, res, next) => {
  console.log("Midleware function");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", usersRouter);

// get error when user input wrong url
app.all("*", (req, res, next) => {
  next(new AppError(` Can't find ${req.originalUrl} on this server`, 404));
});

// global handle error
app.use(globalErrorController);

export default app;
