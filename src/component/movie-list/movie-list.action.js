import * as typeList from './movie-list.constant'
import axios from 'axios';

const API_KEY = process.env.REACT_APP_ARG;
const GET_MOVIE_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
const GET_GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`

const updateList = payload => {
  return {
    type: typeList.MOVIE_LIST_UPDATE,
    payload: payload.results
  }
}

const updateActive = payload => {
  return {
    type: payload.type === 'rating' ? typeList.UPDATE_RATING_FILTER: typeList.UPDATE_GENRE_FILTER,
    payload: payload.value,
    enabledIds: payload.enabledIds
  }
}

const updateGenre = payload => {
  const call = {
    type: typeList.MOVIE_GENRE_UPDATE,
    payload: payload.value,
    enabledIds: payload.enabledIds
  }
  return call;
}

const setRangeFilter = payload => {
  const call = {
    type: typeList.MOVIE_SET_RANGE_FILTER,
    payload: payload.results
  }
  return call;
}


const setGenreFilter = payload => {
  console.log(payload)
  const call = {
    type: typeList.MOVIE_SET_GENRE_FILTER,
    payload: payload.results
  }
  return call;
}

const getGenre = () => {
  return (dispatch, getState) => {
    axios
      .get(GET_GENRE_URL)
      .then( ({data}) => {
        console.log(getState())
        dispatch(updateGenre({value: data.genres, enabledIds: getState().movieList.map(movie => movie.genre_ids)}));
      })
      
    };
  }
  
const getMovieList = () => {
  return dispatch => {
    axios
      .get(GET_MOVIE_URL)
      .then( ({data}) => {
        dispatch(updateList(data));
        dispatch(setRangeFilter(data));
      })
      
  };
}

export {
  updateList,
  updateGenre,
  setRangeFilter,
  getGenre,
  getMovieList,
  updateActive,
  setGenreFilter
}