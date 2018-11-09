// movieList
import * as typeList from './movie-list.constant'

const initialState = [];

const movieListReducer = (state = [], action) => {
  switch(action.type) {
    case typeList.MOVIE_LIST_UPDATE:
      return [...action.payload];

    default:
      return state;
  }
}

const movieGenreReducer = (state = [1], action) => {
  switch(action.type) {
    case typeList.MOVIE_GENRE_UPDATE:
      return [...action.payload];

    default:
      return state;
  }
}

export {
  movieListReducer,
  movieGenreReducer
}