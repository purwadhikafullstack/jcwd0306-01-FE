import { Avatar, Box, Button, Link, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../../../../states/authUser/action';

const apiUrl = import.meta.env.VITE_FE_BASE_URL;

function AccountButton() {
  const authUser = useSelector((states) => states.authUser);
  const dispatch = useDispatch();
  const nav = useNavigate();

  function logout() {
    dispatch(asyncUnsetAuthUser());
    nav('/login');
  }

  return (
    <Tooltip
      disableFocusListener
      slotProps={{
        tooltip: {
          sx: {
            p: 2,
            bgcolor: 'background.paper',
            boxShadow: 2,
          },
        },
      }}
      title={
        <Box display="flex" flexDirection="column">
          <Button>
            <Link
              href={`${apiUrl}/profile`}
              sx={{ textTransform: 'none', textDecoration: 'none' }}
            >
              Profile
            </Link>
          </Button>
          <Button>My Order</Button>
          <Button>My Wishlist</Button>
          <Button>My Address</Button>
          <Button color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      }
    >
      <Button
        color="text"
        size="small"
        startIcon={
          <Avatar
            alt={authUser.firstName}
            // src={`${import.meta.env.VITE_API_BASE_URL}/api/users/${
            //   authUser.id
            // }/image`}
          />
        }
        sx={{ textTransform: 'none' }}
      >
        {authUser.firstName}
      </Button>
    </Tooltip>
  );
}

export default AccountButton;
