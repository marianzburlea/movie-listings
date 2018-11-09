import { combineReducers } from 'redux';
import {
  movieListReducer as movieList, 
  ratingFilterReducer as ratingFilter, 
  movieGenreReducer as movieGenre
} from '../component/movie-list/movie-list.reducer';

const rootReducer = combineReducers({
  movieList,
  movieGenre,
  ratingFilter
});

export default rootReducer;