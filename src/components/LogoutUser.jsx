import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../states/authUser/action';

function LogoutUser() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = useCallback(() => {
    dispatch(asyncUnsetAuthUser());
    nav('/login');
  }, [dispatch, nav]);

  return (
    <Button onClick={logout} variant="danger" className="mt-2">
      Dummy LOGOUT
    </Button>
  );
}

export default LogoutUser;
