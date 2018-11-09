import * as typeList from './movie-list.constant'

const updateList = payload => {
  return {
    type: typeList.MOVIE_LIST_UPDATE,
    payload
  }
}

const updateGenre = payload => {
  console.log(typeList)
  const call = {
    type: typeList.MOVIE_GENRE_UPDATE,
    payload
  }
  // debugger;
  return call;
}

export {
  updateList,
  updateGenre
}