import { createStore, combineReducers } from 'redux';
import articlesReducer from './articlesReducer';

const rootReducer = combineReducers({
    articles: articlesReducer
});

const store = createStore(rootReducer);

export default store;
