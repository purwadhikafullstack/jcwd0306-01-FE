import { Avatar, Button } from '@mui/material';
import { useSelector } from 'react-redux';

function AccountButton() {
  const authUser = useSelector((states) => states.authUser);

  return (
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
  );
}

export default AccountButton;
