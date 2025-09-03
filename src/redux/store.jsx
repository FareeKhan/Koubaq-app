import { applyMiddleware, combineReducers, configureStore, createStore } from '@reduxjs/toolkit';
import auth from './Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
import AddFavorite from './AddFavorite'
import ProductAddToCart from './ProductAddToCart';
import  storeCar  from './storeAddedCar';

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "favorite", "cart","carArray"],
  blacklist: [],
};

const rootReducer = combineReducers({
  auth: auth,
  favorite: AddFavorite,
  cart: ProductAddToCart,
  carArray: storeCar,
})

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with enhancers
const store = createStore(persistedReducer, applyMiddleware(thunk));

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };









