import Main from './Components/Main/Main'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
//import {ConfigureStore} from './Redux/configureStore'
import store, {Persistor} from './Redux/configureStore'
import {PersistGate} from 'redux-persist/integration/react'

//const store = ConfigureStore();

export default function App() {

  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={Persistor}>
      <BrowserRouter>
        <Main/>
      </BrowserRouter>
    </PersistGate>
    </Provider>
  );
}
