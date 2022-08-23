/* eslint-disable no-console */
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const categoryRouter = require("./routers/categoryRouter");
const globalErrorHandler = require("./utils/globalErrorHandler");
const userRouter = require("./routers/userRouter");
const viewRouter = require("./routers/viewRouter");

const app = express();

// ______MIDDLEWARE__________//
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(cookieParser());

app.use("/", viewRouter);

app.use("/api/v1/ecom/category", categoryRouter);
app.use("/api/v1/ecom/users", userRouter);
// _____global error handler___//
app.use(globalErrorHandler);

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE.replace(
  "<password>",
  // eslint-disable-next-line comma-dangle
  process.env.DATABASE_PASSWORD
);
// const db = process.env.DATABASE_LOCAL;
mongoose
  .connect(db)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running ${port}`);
});
