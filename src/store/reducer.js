import { combineReducers } from 'redux';
import movieList from '../component/movie-list/movie-list.reducer';

const rootReducer = combineReducers({
  movieList
});

export default rootReducer;