import { Avatar, Button } from '@mui/material';

function AccountButton() {
  // const authUser = useSelector((states) => states.authUser);
  const authUser = {};

  return (
    <Button
      color="text"
      size="small"
      startIcon={
        <Avatar
          alt={authUser.firstName}
          src={`${import.meta.env.VITE_API_BASE_URL}/api/users/${
            authUser.id
          }/image`}
        />
      }
      sx={{ textTransform: 'none' }}
    >
      {/* {authUser.firstName} */}
      First Name
    </Button>
  );
}

export default AccountButton;
