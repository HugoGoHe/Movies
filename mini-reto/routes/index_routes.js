import { Router } from "express";
import { getMovies } from "../controllers/controllers.js";
import { getMovie } from "../controllers/controllers.js";
import { createMovies } from "../controllers/controllers.js";
import { updateMovies } from "../controllers/controllers.js";
import { deleteMovies } from "../controllers/controllers.js";

export const indexRouter = Router();

indexRouter.get("/movies", getMovies);

indexRouter.get("/movies/:id", getMovie);

indexRouter.post("/movies", createMovies);

indexRouter.put("/movies/:id", updateMovies);

indexRouter.delete("/movies/:id", deleteMovies);
