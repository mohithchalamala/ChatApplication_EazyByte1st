import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore';
import store from './store.js'

const persistedStore = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App/>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
