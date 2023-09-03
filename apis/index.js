import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import http from "http";

const sever = http.createServer(app);
dotenv.config({ path: "./.env.local" });
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

const DB = "mongodb+srv://Dewang:Dewang@123@cluster0.iuprhed.mongodb.net/"

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB Connection successfully");
  });

const port = process.env.PORT || 3001;

sever.listen(port, () => {
  console.log(`This App running on port ${port}`);
});

export default sever;
