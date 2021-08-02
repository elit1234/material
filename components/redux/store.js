import { configureStore, createSlice, getDefaultMiddleware } from "@reduxjs/toolkit";
import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: '',
    token: ''
  },
  reducers: {
    setUser (state, action) {
      state.username = action.payload.username ? action.payload.username : null,
      state.token = action.payload.token ? action.payload.token : null
    }
  },
  extraReducers: {
    [HYDRATE]: (state, {payload}) => ({
      ...state,
      ...payload.user
    })
  }
})


export const { setUser } = userSlice.actions;

const makeStore = wrapMakeStore(() => 
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      nextReduxCookieMiddleware({
        subtrees: ['user'],
      })
    )
  })
);

export const useAppDispatch = () => useDispatch();

export const wrapper = createWrapper(makeStore);
