import React from 'react';
import './movie-star.css';

const MovieStar = ({vote_average}) => {
  return (
    <div className="movie__star-wrapper">
      <div className="movie__star">
      </div>
      <div className="movie__star" style={{width: (vote_average || 1) * 30}}>
      </div>
    </div>
  )
}

export default MovieStar;