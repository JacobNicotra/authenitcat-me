// frontend/src/store/session.js
import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
}; //  to test: window.store.dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
//Example Session Actions and Reducer

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  // console.log('session', data.user)
  dispatch(setUser(data.user));
  return response;
}; // test: window.store.dispatch(window.sessionActions.restoreUser());

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
}; // test: //window.store.dispatch(window.sessionActions.signup({
//   username: 'NewUser',
//   email: 'new@user.io',
//   password: 'password'
// }));

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  // console.log('TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST')
  dispatch(removeUser());
  return response;
}; // test: window.store.dispatch(window.sessionActions.logout());




const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
