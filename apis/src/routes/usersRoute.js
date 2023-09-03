import express from "express";
import {
  getAllUser,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// ROUTER user

router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

export default router;
