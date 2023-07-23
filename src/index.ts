import express, { Request, Response } from "express";
import path from "path";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";
import env from "dotenv";

import routes from "./routes/index.js";

env.config();

const allowCrossDomain = function (
  req: Request,
  res: Response,
  next: Function
) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

const app = express();

// Init Middleware
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(allowCrossDomain);

// // Set up rate limiter
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);

// Define Routes
app.get("/", (req, res) => {
  res.send("Express JS on Vercel");
});

app.use("/api", routes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
