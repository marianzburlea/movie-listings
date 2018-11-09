import { createStore } from 'redux';
import * as actionCreators from './action';
import rootReducer from './reducer';

export default function configureStore(preloadedState) {
  const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__({ actionCreators });
  if (!enhancer) {
    console.warn('Install Redux DevTools Extension to inspect the app state: ' +
      'https://github.com/zalmoxisus/redux-devtools-extension#installation')
  }

  const store = createStore(rootReducer, preloadedState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../store/reducer', () => {
      const nextReducer = require('../store/reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}