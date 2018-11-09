import React from 'react';
import ReactDOM from 'react-dom';
import MovieItem from './movie-item.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
