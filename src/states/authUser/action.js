import jwtDecode from 'jwt-decode';
import api from '../../constants/api';
import { setAlertActionCreator } from '../alert/action';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
  UPDATE_AUTH_USER: 'UPDATE_AUTH_USER',
};

// arguments
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

function updateAuthUserActionCreator(updatedUser) {
  return {
    type: ActionType.UPDATE_AUTH_USER,
    payload: updatedUser,
  };
}

// functions
function asyncUpdateAuthUser({ userId, formData }) {
  return async (dispatch) => {
    const { data } = await api.patch(`/user/edit/${userId}`, formData);

    dispatch(updateAuthUserActionCreator(data.data));
  };
}

function asyncSetAuthUser({
  email,
  password,
  providerId,
  nav,
  firstName,
  lastName,
  uid,
}) {
  return async (dispatch) => {
    try {
      const { data } = await api.post(`/user/login?providerId=${providerId}`, {
        email,
        password,
        firstName,
        lastName,
        uid,
      });
      const authUser = data.data.user;

      localStorage.setItem('token', data.data.token);

      if (data?.data?.user?.isAdmin) nav('/admin');
      else nav('/');
      window.location.reload();
      dispatch(setAuthUserActionCreator(authUser));

      dispatch(
        setAlertActionCreator({
          val: { status: 'success', message: 'login success' },
        })
      );
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
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
  updateAuthUserActionCreator,
  asyncUpdateAuthUser,
};
