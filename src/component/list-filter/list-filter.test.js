import React from 'react';
import ReactDOM from 'react-dom';
import ListFilter from './list-filter.component';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ListFilter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
