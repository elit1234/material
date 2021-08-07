import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

const initialState = {
  username: "",
  token: "",
  darkMode: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      (state.username = action.payload.username
        ? action.payload.username
        : null),
        (state.token = action.payload.token ? action.payload.token : null),
        (state.admin = action.payload.admin ? action.payload.admin : null);
    },
    logoutUser(state, action) {
      (state.username = null), (state.token = null);
    },
    toggleDarkMode(state, action) {
      (state.username = state.username),
        (state.token = state.token),
        (state.darkMode = !state.darkMode);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }) => ({
      ...state,
      ...payload.user,
    }),
  },
});

export const { setUser, logoutUser, toggleDarkMode } = userSlice.actions;

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      [userSlice.name]: userSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: ["user"],
        })
      ),
  })
);

export const useAppDispatch = () => useDispatch();

export const wrapper = createWrapper(makeStore);
