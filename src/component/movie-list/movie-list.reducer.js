// movieList
import * as typeList from './movie-list.constant'

const initialState = [];

export default (state = initialState, action) => {
  switch(action.type) {
    case typeList.MOVIE_LIST_UPDATE:
      return [...action.payload];

    default:
      return state;
  }
}