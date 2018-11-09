import React from 'react';
import ReactDOM from 'react-dom';
import MovieTitle from './movie-title.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MovieTitle />, div);
  ReactDOM.unmountComponentAtNode(div);
});
