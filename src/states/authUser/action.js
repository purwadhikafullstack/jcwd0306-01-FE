import jwtDecode from 'jwt-decode';
import api from '../../constants/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: { authUser },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    const { data } = await api.post('/user/login', { email, password });
    const authUser = data.data.user;

    localStorage.setItem('token', data.data.token);
    window.location.reload();
    dispatch(setAuthUserActionCreator(authUser));
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(unsetAuthUserActionCreator());
  };
}

function asyncRegisterUser(formData) {
  return async (dispatch) => {
    try {
      // POST user register
      const { data } = await api.post('/user/register', formData);
      dispatch(setAuthUserActionCreator(data.data.user));
    } catch (error) {
      console.log(error?.response?.data?.message || error?.message);
    }
  };
}

function asyncReceiveUser() {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const { id } = jwtDecode(token);

      const { data } = await api.get(`/user/${id}`);

      localStorage.setItem('token', data.data.token);
      dispatch(setAuthUserActionCreator(data.data.user));
    } catch {
      dispatch(asyncUnsetAuthUser());
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
  asyncReceiveUser,
};
