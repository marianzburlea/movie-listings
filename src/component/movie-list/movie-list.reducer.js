// movieList
import * as typeList from './movie-list.constant'

const movieListReducer = (state = [], action) => {
  switch(action.type) {
    case typeList.MOVIE_LIST_UPDATE:
      return [...action.payload];
    default:
      return state;
  }
}

const movieGenreReducer = (state = [], action) => {
  // debugger
  switch(action.type) {
    case typeList.MOVIE_GENRE_UPDATE:
      window.localStorage.setItem('genre', JSON.stringify(action.payload));
      return [...action.payload.map(v => ({...v, active: false}))];

    case typeList.UPDATE_GENRE_FILTER:
      return state.map(g => g.id === action.payload ? {...g, active: !g.active} : g);

    default:
      return state;
  }
}

const ratingFilterReducer = (state = [], action) => {
  switch(action.type) {
    case typeList.MOVIE_SET_RANGE_FILTER:
      console.log(action.payload)
      if (action.payload && action.payload.length) {
        const voteAverage = action.payload.map(x => x.vote_average);
        const maxRating = Math.ceil(Math.max(...voteAverage));
        const minRating = Math.floor(Math.min(...voteAverage));

        return Array(maxRating - minRating).fill('').map((v, k) => ({
          name: k + minRating,
          active: false
        }));
      }

      return state;
    case typeList.UPDATE_RATING_FILTER:
      return state.map(g => g.name === action.payload ? {...g, active: !g.active} : g);

    default:
      return state;
  }
}

export {
  movieListReducer,
  movieGenreReducer,
  ratingFilterReducer
}