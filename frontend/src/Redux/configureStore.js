// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import {Token} from './token'
// import {User} from './user'

// export const ConfigureStore = () => {
//     const store = createStore(
//         combineReducers({
//             token: Token,
//             user: User
//         }),
//         applyMiddleware(thunk)
//     );

//     return store;
// }


import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {Token} from './token'
import {User} from './user'

import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig={
    key:'main-root',
    storage,
}

const persistedReducer=persistReducer(persistConfig, 
    combineReducers({
        token: Token,
        user: User
    })
);

const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
    );

const Persistor = persistStore(store)
export {Persistor};
export default store;