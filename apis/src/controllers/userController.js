import APIFeatures from "../Utils/apiFeatures.js";
import User from "../models/userModel.js";
import catchAsync from "../Utils/catchAsync.js";
import AppError from "../Utils/appError.js";

// get All user request
const getAllUser = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .pagination();
  const user = await features.query;

  res.status(200).json({
    status: "success",
    result: user.length,
    data: {
      user: user,
    },
  });
});

// post method
const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

// get single user
const getSingleUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError(`Cannot found this ID in server`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
// update method
const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // run validate input
    runValidators: true,
  });
  if (!user) {
    return next(new AppError(`Cannot found this ID in server`, 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});
// delete method
const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError(`Cannot found this ID in server`, 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});
export { getAllUser, createUser, getSingleUser, updateUser, deleteUser };
