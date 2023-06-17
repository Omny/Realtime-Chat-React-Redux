import { createSlice } from '@reduxjs/toolkit';
import { newChannel, removeChannel } from './channelsSlice';

const initialId = 1;

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: initialId,
  reducers: {
    setCurrentChannelId(state, action) {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newChannel, (state, action) => action.payload.id);
    builder.addCase(removeChannel, () => initialId);
  },
});

export const { setCurrentChannelId } = currentChannelIdSlice.actions;
export default currentChannelIdSlice.reducer;
