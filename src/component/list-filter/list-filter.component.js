import React from 'react';
import './list-filter.css';

const ListFilter = ({name, updateFilterList, id, active, filterType}) => {
  return (
    <div onClick={() => updateFilterList(id, filterType)}
      className={`genre__filter--${active ? 'active' : 'normal'}`}>{name}</div>
  );
}

export default ListFilter;