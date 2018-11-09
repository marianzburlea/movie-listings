import React from 'react';
import './list-filter.css';

const ListFilter = ({name, updateFilterList, id, active, filterType, disabled}) => {
  return (
    <button onClick={() => updateFilterList(id, filterType)}
      disabled={disabled}
      className={`genre__filter--${active ? 'active' : disabled ? 'disabled' : 'normal'}`}>{name}</button>
  );
}

export default ListFilter;