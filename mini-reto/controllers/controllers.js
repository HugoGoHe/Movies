import * as movieServices from "../services/movies.services.js";

export const getMovies = (req, res) => {
    movieServices
    .getMovies()
    .then((result) => {
        res.status(200).json({
            message: "Movies retrieved succesfully",
            data: result[0],
        });
    }).catch(() => {
        res.status(500).send(err);
    })
};

export const getMovie = (req, res) => {
    const id = req.params.id;

    movieServices
    .getMovie(id)
    .then((result) => {
        const movie = result[0][0];
        res.status(200).json({
            message: "Movie retrieved succesfully",
            data: movie,
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).send(err);
    })
};


export const createMovies = (req, res) => {
    const movieData = req.body;

    movieServices
    .createMovies(movieData)
    .then(() => {
        res.status(200).json({
            message: "Movie created successfully",
            data: movieData,
        });
    }).catch((err) => {
        res.status(500).send(err);
    });
};  


export const updateMovies = (req, res) => {
    const movie = req.body;
    const id = req.params.id;

    movieServices
    .updatedMovies(id, movie)
    .then(() => {
        // Obtener los datos actualizados de la película
        movieServices.getMovie(id)
        .then(() => {
            res.status(200).json({
                message: "Movie update succesfully",
                data: movie,
            });
        })
    }).catch((err) => {
        res.status(500).send(err);
    })
    console.log("Movie: ", movie);
};


export const deleteMovies = (req, res) => {
    const id = req.params.id;

    movieServices
    .deleteMovies(id)
    .then(() => {
        res.status(200).json({
            message: "Movie deleted succesfully",
            //data: movie,
        });
    }).catch((err) => {
        res.status(500).send(err);
    })
};