import mongoose from "mongoose";
import slugify from "slugify";
import validator from "validator";
// create UserName data test
const usersChema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [16, "UserName must have max 16 character"],
    minlength: [4, "UserName must have min 4 character"],
  },
  slug: String,
  email: String,
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  description: {
    type: String,
    trim: true,
  },
  images: String,
  imageCover: String,
  walletAddress: String,
});

// mongoose middleware
// docs middleware: runs before .save() or .create()
usersChema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const User = mongoose.model("User", usersChema);

export default User;
