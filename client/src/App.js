import React, { useState, useEffect } from 'react'
import './App.css';
import Axios from 'axios'
import Item from './Item';

function App() {

  const [movieName, setMovieName] = useState('')
  const [movieReview, setMovieReview] = useState('')
  const [movieList, setMovieList] = useState([])


  useEffect(() => {
    Axios.get('http://localhost:3001/api/data').then((response) => {
      setMovieList(response.data)
    })
  }, [])

  const submitReview = () => {
    // POST request to backend
    console.log('clicked')
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: movieReview
    })
    setMovieList([...movieList, {
      movieName: movieName,
      movieReview: movieReview
    }])
    document.querySelector('#movieName').value = ''
    document.querySelector('#movieReview').value = ''
  }
  
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <div className="form">
        <label htmlFor="movieName">Movie Name :- </label>
        <input type="text" name="movieName" id="movieName" onChange={(e)=> {
          setMovieName(e.target.value)
        }}/>
        <label htmlFor="movieReview">Review :- </label>
        <input type="text" name="movieReview" id="movieReview" onChange={(e)=>{
          setMovieReview(e.target.value)
        }}/>
        <button type="submit" onClick={submitReview}>Submit</button>
      </div>
      {movieList.map((val) => {
        return <Item movieName = {val.movieName} movieReview = {val.movieReview}/>
      })}
    </div>
  );
}

export default App;
