const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { DB_CONNECTION } = require("./config/app.config");
const errors = require("./middleware/errors");

mongoose.Promise = global.Promise;
// Connect to MongoDB
mongoose
  .connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not connected to MongoDB", err);
  });

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app.routes"));
app.use(errors.errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
