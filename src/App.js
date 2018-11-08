import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
const API_KEY = process.env.REACT_APP_ARG;
// const GET_MOVIE_URL = `https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`
const GET_MOVIE_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
const GET_GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`

class App extends Component {
  state = {
    movieList: ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'],
    genreList: []
  }

  componentDidMount() {
    console.log('Lui Laurientiu nu ii place axios!');
    console.log('Nu iau din render lista! Cum sa iau din render lista?');
    let getAll = [ axios.get(GET_MOVIE_URL) ];
    const genre = window.localStorage.getItem('genre');

    if (genre) {
      const genreList = JSON.parse(window.localStorage.getItem('genre'))
      this.setState({genreList})
    } else {
      getAll.push(axios.get(GET_GENRE_URL))
    }

    axios
      .all(getAll)
      .then(axios.spread((...response) => {
        console.log(response)
        this.setState(state => {
          console.log(response[0].data.results)
          state.movieList = response[0].data.results;
          if (response[1]) {
            const genreList = response[1].data.genres;
            window.localStorage.setItem('genre', JSON.stringify(genreList));
            state.genreList = [...genreList];
          }
          return state;
        })
      }))
  }

  renderMovieList = () => {
    const { movieList } = this.state;
    return movieList.map((movie, key) => (
      <div key={key} 
        className="movie__item"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`}}
        title={movie.title}>
        <header>
          <div className="movie__star-wrapper">
            <div className="movie__star">
            </div>
            <div className="movie__star" style={{width: movie.vote_average * 10}}>
            </div>
          </div>
          <h1 className="movie__title">
            <span className="movie__title-text">{movie.title} ({(movie.release_date+'').split('-')[0]})</span>
          </h1>
        </header>
        <p className="movie__overview">{movie.overview}</p>
      </div>
    ));
  }

  // niceShadow = e => {
  //   const xp = ~~(e.pageX / window.outerWidth * 100);
  //   const yp = ~~(e.pageY / window.outerHeight * 100);
  //   console.log(xp, yp)
  //   document.documentElement.style.setProperty('--box-shadow-distance', (0.3 * xp / 100 * (xp > 50 ? 1 : -1)) + 'rem');
  // }

  render() {
    const { renderMovieList, niceShadow } = this;
    return (
      <div className="App">
        <div className="movie__list">
          {renderMovieList()}
        </div>
      </div>
    );
  }
}

export default App;
