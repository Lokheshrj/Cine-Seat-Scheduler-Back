import express from "express";
import { addMovie, getMovieById, getMovies } from "./controller_movie.js";
const movierouter=express.Router();
movierouter.get("/",getMovies);
movierouter.get("/:id",getMovieById);
movierouter.post("/",addMovie);
export default movierouter;