import React from 'react';

import './App.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

import ProfilePage from './pages/profile';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

function App() {
  return (
    <Provider store={store}>
      <div className="root">
        <ProfilePage />
      </div>
    </Provider>
  );
}
export default App;
