import React, { Component } from 'react';
import axios from 'axios';
import ListFilter from '../list-filter';
import MovieItem from '../movie-item';
import './movie-list.css';
import { connect } from 'react-redux';
import { updateList, updateGenre, getGenre, getMovieList, setRangeFilter, updateActive } from './movie-list.action';
// import MovieList from './movie-list.component';


const API_KEY = process.env.REACT_APP_ARG;
const GET_MOVIE_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
const GET_GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`

class MovieList extends Component {
  componentDidMount() {
    const { updateList, updateGenre, getGenre, getMovieList, setRangeFilter, movieList } = this.props;
    let getAll = [ axios.get(GET_MOVIE_URL) ];
    const genre = window.localStorage.getItem('genre');

    let genreList;
    if (genre) {
      genreList = JSON.parse(window.localStorage.getItem('genre'))
      // this.setState({genreList});
      updateGenre(genreList);
    } else {
      // getAll.push(axios.get(GET_GENRE_URL))
      getGenre()
    }
    getMovieList();

    // 
  }

  updateFilterList = (filterId, filterType) => {
    const { updateActive } = this.props;
    if (filterType ==='genre') {
      updateActive({value: filterId, type: 'genre'});
    } else if (filterType ==='rating') {
      updateActive({value: filterId, type: 'rating'})
    }
  }

  renderFilter = which => {
    if (which === 'genre') {
      console.log(this.props.genreList)
      return this.props.genreList.map(({id, name, active}, k) => {
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
      return this.props.ratingFilter.map(({name, active}) => {
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
    const { movieList, ratingFilter } = this.props;
    if (movieList.length) {
      return movieList
        .sort((a, b) => b.popularity - a.popularity)
  
        // Rating filter
        .filter(movie => ratingFilter.filter(x => x.active).length ? (ratingFilter.filter(rating => rating.name === Math.round(movie.vote_average) && rating.active)).length : true)
  
        // Genre filter
        .filter(movie => this.props.genreList.filter(x => x.active).length ? this.props.genreList.filter(a => a.active).filter(g => movie.genre_ids.includes(g.id)).length === this.props.genreList.filter(a => a.active).length : true)
  
        .map((movie, key) => (
          <MovieItem key={key} {...movie}/>
        ));
    }
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

// export default MovieList;
const mapStateToProp = state => ({
  movieList: state.movieList,
  genreList: state.movieGenre,
  ratingFilter: state.ratingFilter,
  genreFilter: state.genreFilter,
});

const mapDispatchToProp = dispatch => ({
  updateList: list => dispatch(updateList(list)),
  getGenre: () => dispatch(getGenre()),
  getMovieList: () => dispatch(getMovieList()),
  setRangeFilter: (rating) => dispatch(setRangeFilter(rating)),
  updateActive: (filterId) => dispatch(updateActive(filterId)),
  updateGenre: list => dispatch(updateGenre(list))
});
export default connect(mapStateToProp, mapDispatchToProp)(MovieList);
