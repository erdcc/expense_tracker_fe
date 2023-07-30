import ReactDOM from 'react-dom/client';
import App from './App';
import rootReducer from './store';
import "antd/dist/reset.css";
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const store = createStore(rootReducer, applyMiddleware(thunk))

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store} >
    <Router>
      <App  />
    </Router>

  </Provider>

);


