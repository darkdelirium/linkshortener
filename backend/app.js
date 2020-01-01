const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();
app.use("/api/auth", require("./routes/auth.routes.js"));

const PORT = config.get("port") || 7000;

(async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log("trying to connect...");
    app.listen(PORT, () => console.log(`App started on ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
})();
console.log("started");
