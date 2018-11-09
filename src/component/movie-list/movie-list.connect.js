import { connect } from 'react-redux';
import { updateList } from './movie-list.action';
import MovieList from './movie-list.component';

const mapStateToProp = state => ({
    movieList: state.movieList
});

const mapDispatchToProp = dispatch => ({
    updateList
});
export default connect(mapStateToProp, mapDispatchToProp)(MovieList);
