import React,{useEffect, useState} from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';



const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=ba16880dd0b146d3f4fa4421c6cd688d";

function App() {

  const [movies, setMovies] = useState([]);
  
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

  return (
    
    <div className='container'>
      <div className='grid'>
        {Array.prototype.map.call(movies, (movieReq)=> 
        <MovieBox key={movieReq.id} {...movieReq}/>)}
      </div>
    </div>    
  );
}


export default App;
