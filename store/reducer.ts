import { combineReducers } from 'redux';
import authReducer from './slices/auth';
import chatReducer from './slices/chat';

const reducer = combineReducers({
    chat: chatReducer,
    auth: authReducer
});

export default reducer;
