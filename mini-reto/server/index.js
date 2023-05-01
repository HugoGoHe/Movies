import db from "./config/dbconnection.js";
import express from "express";
import { indexRouter } from "../routes/index_routes.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

// Rutas de envío
app.use("/", indexRouter);

app.use("*", (req, res) => {
  res.send("404 - not found");
})


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Conección a la base de datos
db.connect()
  .then(() => {
    console.log("Conected to Database");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });