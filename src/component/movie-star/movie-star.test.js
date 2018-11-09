import React from 'react';
import ReactDOM from 'react-dom';
import MovieStar from './movie-star.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieStar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
