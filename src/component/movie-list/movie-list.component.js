import React, { Component } from 'react';
import ListFilter from '../list-filter';
import MovieItem from '../movie-item';
import './movie-list.css';
import { connect } from 'react-redux';
import { updateList, updateGenre, getGenre, getMovieList, setRangeFilter, updateActive } from './movie-list.action';
// import MovieList from './movie-list.component';

class MovieList extends Component {
  componentDidMount() {
    const { getMovieList } = this.props;
    getMovieList();
  }

  updateFilterList = (filterId, filterType) => {
    const { updateActive, movieList } = this.props;
    if (filterType ==='genre') {
      updateActive({value: filterId, type: 'genre', enabledIds: movieList.map(movie => movie.genre_ids)});
    } else if (filterType ==='rating') {
      updateActive({value: filterId, type: 'rating'})
    }
  }

  renderFilter = which => {
    if (which === 'genre') {
      return this.props.genreList.map(({id, name, active, disabled}, k) => {
        const props = {
          "key": k,
          id,
          disabled,
          name,
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
        .filter(movie => ratingFilter.filter(x => x.active).length ? (ratingFilter.filter(rating => rating.name < movie.vote_average && rating.active)).length : true)
  
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
  updateGenre: (list) => dispatch(updateGenre(list))
});
export default connect(mapStateToProp, mapDispatchToProp)(MovieList);
