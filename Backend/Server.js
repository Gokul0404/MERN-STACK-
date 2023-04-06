const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const taskRoutes = require("./routes/taskRoute"); //routes import
//middleware
app.use((req, res, next) => {
  console.log("path" + req.path + "method" + req.method);
  next();
});
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(express.json());
//DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB connected successfuly listening to" + process.env.PORT);
    });
  })
  .catch((error) => console.log(error));

app.use("/api/tasks", taskRoutes);
