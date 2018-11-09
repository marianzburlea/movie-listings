import React from 'react';
import './movie-title.css'

const MovieTitle = ({title, release_date}) => {
  return (
    <h1 className="movie__title">
      <span className="movie__title-text">{title} ({(release_date+'').split('-')[0]})</span>
    </h1>
  )
}

export default MovieTitle;