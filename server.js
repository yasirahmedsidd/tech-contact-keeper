const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://yasirahmed:yasirahmed11@mern.kqq1b.mongodb.net/mern?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/contacts", require("./routes/api/contacts"));

app.listen(PORT, () => console.log("Server Started At Port : " + PORT));
