import React, { Component } from 'react';
import axios from 'axios';
import ListFilter from '../list-filter';
import MovieItem from '../movie-item';
import { updateList } from './movie-list.action';
import './movie-list.css';
import * as typeList from './movie-list.constant';

const API_KEY = process.env.REACT_APP_ARG;
const GET_MOVIE_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
const GET_GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`

class MovieList extends Component {
  state = {
    movieList: ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'],
    genreList: [],
    genreFilter: [],
    ratingFilter: []
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

        this.setState(state => {

          state.movieList = response[0].data.results;

          const voteAverageList = state.movieList.map(x => x.vote_average);

          const maxRating = Math.ceil(Math.max(...voteAverageList));
          const minRating = Math.floor(Math.min(...voteAverageList));

          state.ratingFilter = Array(maxRating - minRating).fill('').map((v, k) => ({
            name: k + minRating,
            active: false
          }));

          if (response[1]) {
            const genreList = response[1].data.genres;
            window.localStorage.setItem('genre', JSON.stringify(genreList));
            state.genreList = [...genreList];
          }

          // get genreFilter
          const genreFilter = [
            ...new Set(state.movieList.map(m => m.genre_ids).reduce((a, c) => a.concat(c)))
          ]
            .sort((a, b) => a - b)
            .map(gid => state.genreList
              .filter(g => g.id === gid)
              .map(g => ({...g, active: false}))
              .reduce(a => a)
            );

          state.genreFilter = genreFilter;
          updateList({
            type: typeList.MOVIE_LIST_UPDATE,
            payload: state.movieList
          })
          return state;
        })
      }))
  }

  updateFilterList = (filterId, filterType) => {
    this.setState(state => {
      if (filterType ==='genre') {
        state.genreFilter = state.genreFilter.map(g => g.id === filterId ? {...g, active: !g.active} : g);
      }else if (filterType ==='rating') {
        state.ratingFilter = state.ratingFilter.map(g => g.name === filterId ? {...g, active: !g.active} : g);
      }
      return state;
    })
  }

  renderFilter = which => {
    if (which === 'genre') {
      return this.state.genreFilter.map(({id, name, active}, k) => {
        const props = {
          "key": k,
          "id": id,
          "name": name,
          "filterType": which,
          "updateFilterList": this.updateFilterList,
          active
        };
        return (<ListFilter {...props} />)
      });
    } else if (which === 'rating') {
      return this.state.ratingFilter.map(({name, active}) => {
        const props = {
          name,
          key: name,
          id: name,
          "filterType": which,
          "updateFilterList": this.updateFilterList,
          active
        };
        return (<ListFilter {...props} />)
      });
    }
  }

  renderMovieList = () => {
    const { movieList } = this.state;
    return movieList
      .sort((a, b) => b.popularity - a.popularity)

      // Rating filter
      .filter(movie => this.state.ratingFilter.filter(x => x.active).length ? (this.state.ratingFilter.filter(rating => rating.name === Math.round(movie.vote_average) && rating.active)).length : true)

      // Genre filter
      .filter(movie => this.state.genreFilter.filter(x => x.active).length ? this.state.genreFilter.filter(a => a.active).filter(g => {
        console.log(movie.id, g.id)
        return movie.genre_ids.includes(g.id)
      }).length === this.state.genreFilter.filter(a => a.active).length : true)

      .map((movie, key) => (
        <MovieItem key={key} {...movie}/>
      ));
  }
  
  render() {
    const { renderMovieList, renderFilter } = this;
    return (
      <div className="MovieList">
        <div className="movie-filter">
          <div className="filter">
            <div className="movie-filter__title">Genre</div>
            {renderFilter('genre')}
            <div className="movie-filter__title">Rating</div>
            {renderFilter('rating')}
          </div>
        </div>
        <div className="movie__list">
          {renderMovieList()}
        </div>
      </div>
    );
  }
}

export default MovieList;
