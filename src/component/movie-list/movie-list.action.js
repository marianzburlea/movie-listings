import * as typeList from './movie-list.constant'
const updateList = payload => {
  return {
    type: typeList.MOVIE_LIST_UPDATE,
    payload
  }
}

export {
  updateList
}