import express from "express";
import router from "./src/routes/soldiersRoute.js";
const app = express();

async function logger(req, res, next) {
  console.log(req.params);
  next();
}

app.use(express.json());
app.use(logger);

app.use("/soldiers", router);

app.listen(3000, () => {
  console.log("\n\n\n\n\nListening on port 3000...\n\n\n\n\n");
});
