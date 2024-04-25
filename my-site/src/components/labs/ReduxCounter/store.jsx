import { configureStore, combineReducers } from '@reduxjs/toolkit';
import myReducer from './reducers';
import { postsApi } from '../../../api/postsApi';

const rootReducer = combineReducers({
  [postsApi.reducerPath]: postsApi.reducer,
  myReducer, 
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
  });

export default store;