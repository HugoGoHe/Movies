import React,{useEffect, useState} from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'react-bootstrap';
import {show, Button} from 'react-bootstrap';

const API_IMG = "https://image.tmdb.org/t/p/w500";


const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=ba16880dd0b146d3f4fa4421c6cd688d";

function App() {

  //const [show, setShow] = useState(false);
  const [show, setShow] = useState([]);


    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);

  const [movies, setMovies] = useState([]);

  const[insertar, setInsertar]=useState(false);
  const handleInsertar=()=>setInsertar(true);
  const handleNotInsertar=()=>setInsertar(false);

  const [form, setForm] = useState({
    title: "",
    poster_path: "",
    vote_average: "",
    release_date: "",
    overview: "",
    tipoModal: ""
  });

  const [tipoModal, setTipoModal] = useState("");

  //PETICION GET
  const fetchData = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    //  console.log(data.results);

      setMovies(data.results);
      setShow(Array(data.length).fill(false));

      //console.log(); // add this line to see what data is being returned
    })
    .catch((err) => {
      console.error(err)
    });
  };

  //Se usa useEffect para hacer la peticion a la API
  useEffect(() => {
    fetchData();
  }, []);

  //PETICION POST para agregar una pelicula con los inputs del usuario
  const postMovie = async () => {

  };

  //Funcion para seleccionar pelicula metodo put
  const selectMovie = (movie) => {
    setForm({
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      overview: movie.overview,
    });
  };


  //Funcion para captar inputs del usuario
  const handleChange = (e) => {
    e.persist();
    setForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
    console.log(form);
  };

  const handleNewMovieClick = () => {
    setForm(null);
    setTipoModal("insertar");
    handleInsertar();
  };

  //PETICION PUT
  const putMovie = () => {
    var data = {
      title: form.title,
      poster_path: form.poster_path,
      vote_average: form.vote_average,
      release_date: form.release_date,
      overview: form.overview,
    };
    console.log(data);
    var url = "http://localhost:3000/movies/" + form.id;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
    .then((response) => fetchData())
    .catch((err) => console.error(err));
    handleInsertar();
  };

  //PETICION DELETE
  const deleteMovie = (movie) => {
    var url = "http://localhost:3000/movies/" + movie.id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json())
    .then((response) => fetchData())
    .catch((err) => console.error(err));
  };



  return (
    
    <div className='container'>
      <br/>
      <button className='btn btn-success' onClick={() => { handleNewMovieClick(); handleInsertar(); }}>New Movie</button>
      <br/><br/>
      <div className='grid'>

      {Array.prototype.map.call(movies, (movieReq, index) => (
        <div key={movieReq.id} className="card text-center bg-secendary mb-3">
          <div className="card-body">
            <img className="card-img-top" src={API_IMG + movieReq.poster_path} alt={movieReq.title} />
            <div className="card-body">
              <button type="button" className="btn btn-dark" onClick={() => setShow([...show.slice(0, index), true, ...show.slice(index+1)])}>View More</button>
              <button className='btn btn-success' onClick={() => {
                selectMovie(movieReq);
                handleInsertar();
                setTipoModal("");
              }}>Edit</button>
              <button type="button" className='btn btn-danger' onClick={() => deleteMovie(movieReq.id)}>Delete</button>
              <Modal show={show[index]} onHide={() => setShow([...show.slice(0, index), false, ...show.slice(index+1)])}>
                <Modal.Header closeButton>
                  <Modal.Title>{movieReq.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img className="card-img-top" src={API_IMG + movieReq.poster_path} alt={movieReq.title} />
                  <h3>{movieReq.title}</h3>
                  <h4>ImDb: {movieReq.vote_average}</h4>
                  <h5>Release Date: {movieReq.release_date}</h5>
                  <br></br>
                  <h6>Overview</h6>
                  <p>{movieReq.overview}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button varient="secondary" onClick={() => setShow([...show.slice(0, index), false, ...show.slice(index+1)])}>Close</Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      ))}

        


        





      </div>

      <Modal show={insertar} onHide={handleNotInsertar}>
          <ModalHeader style={{display: 'block'}}>
            <span style={{float: 'right'}}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input className='form-control' type="text" name="title" id="title" onChange={handleChange} value={form?form.title: ''}/>
              <br/>
              <label htmlFor="poster_path">Poster path</label>
              <input className='form-control' type="text" name="poster_path" id="poster_path" onChange={handleChange} value={form?form.poster_path: ''}/>
              <br/>
              <label htmlFor="vote_average">Vote average</label>
              <input className='form-control' type="text" name="vote_average" id="vote_average" onChange={handleChange} value={form?form.vote_average: ''}/>
              <br/>
              <label htmlFor="release_date">Release date</label>
              <input className='form-control' type="text" name="release_date" id="release_date" onChange={handleChange} value={form?form.release_date: ''}/>
              <br/>
              <label htmlFor="overview">Overview</label>
              <textarea className='form-control' type="text" name="overview" id="overview" onChange={handleChange} value={form?form.overview: ''}/>
            </div>
          </ModalBody>
          
          <ModalFooter>
            {tipoModal =='insertar'?
            <button className="btn btn-success">Insertar</button>:  //En esta linea poner onCLick={postMovie} cuando sirva
            <button className="btn btn-primary" onClick={putMovie}>Actualizar</button>
          }
            <button className="btn btn-danger" onClick={handleNotInsertar}>Cancelar</button>
        
          </ModalFooter>
      </Modal>
    </div>    
  );
}


export default App;
