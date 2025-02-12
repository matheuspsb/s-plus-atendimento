import axiosServices from '@/services/server';
import { DefaultRootStateProps } from '@/types';
import { ChatHistory } from '@/types/chat';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '..';

const initialState: DefaultRootStateProps['chat'] = {
    error: null,
    chats: [],
    user: {},
    users: []
};

const slice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET USER
        getUserSuccess(state, action) {
            state.user = action.payload;
        },

        // GET USER CHATS
        getUserChatsSuccess(state, action) {
            state.chats = action.payload;
        },

        // GET USERS
        getUsersSuccess(state, action) {
            state.users = action.payload;
        }
    }
});

export default slice.reducer;

export function getUser(id: number) {
    return async () => {
        try {
            const response = await axiosServices.post('/api/chat/users/id', { id });
            dispatch(slice.actions.getUserSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getUserChats(user: string | undefined) {
    return async () => {
        try {
            const response = await axiosServices.post('/api/chat/filter', { user });
            dispatch(slice.actions.getUserChatsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function insertChat(chat: ChatHistory) {
    return async () => {
        try {
            await axiosServices.post('/api/chat/insert', chat);
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getUsers() {
    return async () => {
        try {
            const response = await axiosServices.get('/api/chat/users');
            dispatch(slice.actions.getUsersSuccess(response.data.users));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
