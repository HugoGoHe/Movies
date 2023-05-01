import db from "../server/config/dbconnection.js";

export const getMovies = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM movie_s";

        db.execute(query)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
};

export const getMovie = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM movie_s WHERE id = ?";

        db.execute(query, [id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
};

export const createMovies = (movieData) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO movie_s (name, genre, cover, summary, director) VALUES (?, ?, ?, ?, ?)";

        db.execute(query, [movieData.name, movieData.genre, movieData.cover, movieData.summary, movieData.director])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
};


export const updatedMovies = (id,movie) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE movie_s SET name = ?, genre = ?, cover = ?, summary = ?, director = ? WHERE id = ?";

        const { name, genre, cover, summary, director } = movie;

        db.execute(query, [name, genre, cover, summary, director, id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
};

export const deleteMovies = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM movie_s WHERE id = ?";

        db.execute(query, [id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
};
