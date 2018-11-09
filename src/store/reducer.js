import { combineReducers } from 'redux';
import {
  movieListReducer as movieList, 
  movieGenreReducer as movieGenre
} from '../component/movie-list/movie-list.reducer';

const rootReducer = combineReducers({
  movieList,
  movieGenre
});

export default rootReducer;