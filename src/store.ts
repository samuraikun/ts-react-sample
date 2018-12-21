import { Store, createStore, compose,applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk';
import { state, State } from './reducers';

export const store: Store<State> = createStore(
  state,
  composeWithDevTools(applyMiddleware(reduxThunk))
);
