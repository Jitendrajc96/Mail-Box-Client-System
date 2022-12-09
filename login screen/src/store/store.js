import { createSlice, configureStore } from '@reduxjs/toolkit';

import { Store } from 'redux';
import { Provider } from 'react-redux';


const initialState = {
  isAuthenticated: false,
  token:null,
  email:null

};

const storeSlice = createSlice({
  name: 'centralStore',
  initialState: initialState,
  reducers: {
    isAuthenticated(state, actions){
        state.isAuthenticated = !state.isAuthenticated;
    }


  },
});

const store = configureStore({
  reducer: storeSlice.reducer 
});


export const storeActions = storeSlice.actions;

export default store;