require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send('<h1>Email Sender API</h1> <a href="/send">Send email</a>');
});

const sendEmailRoutes = require("./controllers/sendEmail");
app.get("/send", sendEmailRoutes);

//middleware
const notFoundMiddleware = require("./middleware/notFound");
app.use(notFoundMiddleware);
const errorHandlerMiddlware = require("./middleware/errorHandler");
app.use(errorHandlerMiddlware);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};

start();
