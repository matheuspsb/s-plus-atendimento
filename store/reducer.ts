import { combineReducers } from 'redux';
import chatReducer from './slices/chat';

const reducer = combineReducers({
    chat: chatReducer,
});

export default reducer;
