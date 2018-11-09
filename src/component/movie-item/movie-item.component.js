import React from 'react';
import MovieStar from '../movie-star';
import MovieTitle from '../movie-title';
import './movie-item.css';

const MovieItem = ({poster_path, vote_average, release_date, title, overview}) => (
  <div className="movie__item"
    style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${poster_path})`}}
    title={title}>
    <header>
      <MovieStar vote_average={vote_average}/>
      <MovieTitle title={title} release_date={release_date}/>
    </header>
    <p className="movie__overview">{overview}</p>
  </div>
)

export default MovieItem