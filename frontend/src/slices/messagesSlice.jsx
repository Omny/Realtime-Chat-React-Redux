import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: messagesAdapter.addOne,
    newMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const removedChannelId = payload;
        const ids = state.ids.filter((id) => state.entities[id]?.channelId === removedChannelId);
        messagesAdapter.removeMany(state, ids);
      });
  },
});

export const { sendNewMessage, newMessage, newMessages } = messagesSlice.actions;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
