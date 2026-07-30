import express from "express";
import router from "./src/routes/soldiersRoute.js";
import { success } from "zod";

const app = express();

async function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

async function errorHandller(err, req, res, next) {
  const statusCode = err.status || 500;
  const message = err.message || `server error`;
  res.status(statusCode).json({ success: false, message: message });
  return next();
}

app.use(express.json());
app.use(logger);

app.use("/soldiers", router);

app.use(errorHandller);

app.listen(3000, () => {
  console.log("\n\n\n\n\nListening on port 3000...\n\n\n\n\n");
});
