import express from "express";
import soldiersRouter from "./src/routes/soldiersRoute.js";
import budgetRouter from "./src/routes/budgetRoute.js";

const PORT = process.env.PORT || 3000;

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

app.use("/soldiers", soldiersRouter);
app.use("/budget", budgetRouter);

app.use(errorHandller);

app.listen(PORT, () => {
  console.log("\n\n\n\n\nListening on port 3000...\n\n\n\n\n");
});
