import React,{useEffect, useState} from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'react-bootstrap';



const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=ba16880dd0b146d3f4fa4421c6cd688d";

function App() {

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


  const fetchData = () => {
    fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data);
    //  console.log(data.results);

      setMovies(data.results);
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

  //Peticion Post para agregar una pelicula con los inputs del usuario
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

  //metodo put
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


  return (
    
    <div className='container'>
      <br/>
      <button className='btn btn-success' onClick={() => { handleNewMovieClick(); handleInsertar(); }}>New Movie</button>
      <br/><br/>
      <div className='grid'>
        {Array.prototype.map.call(movies, (movieReq)=> 
        <MovieBox key={movieReq.id} {...movieReq}/>)}
        <button className='btn btn-success' onClick={() => {
          selectMovie(movies);
          handleInsertar();
        }}>Edit</button>
      </div>

      <Modal show={insertar} onHide={handleNotInsertar}>
          <ModalHeader style={{display: 'block'}}>
            <span style={{float: 'right'}}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input className='form-control' type="text" name="title" id="title" onChange={handleChange} value={form?form.name: ''}/>
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
            {tipoModal==='insertar'?
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
