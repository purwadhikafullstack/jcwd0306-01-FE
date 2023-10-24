import { Divider, Stack, Toolbar, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import GadgetGalleryLogo from '../../../GadgetGalleryLogo';
import CategoryButton from './CategoryButton';
import SearchInput from './SearchInput';
import CartButton from './CartButton';
import LoginButton from './LoginButton';
import RegisterButton from './RegisterButton';
import AccountButton from './AccountButton';
import NotificationButton from './NotificationButton';
import MessageButton from './MessageButton';
import GGLogo from '../../../GGLogo';
import checkLocationPathName from '../checkLocationPathName';

function MainToolbar({ setIsCategoryDrawerOpen }) {
  const authUser = useSelector((states) => states.authUser);
  const theme = useTheme();
  const isCartPage = checkLocationPathName();

  return (
    <Toolbar
      sx={{
        gap: 2,
        [theme.breakpoints.down('sm')]: {
          display: isCartPage ? `none` : `flex`,
        },
      }}
    >
      {/* Show GadgetGallery Logo */}

      <GadgetGalleryLogo
        sx={{
          fontSize: '2rem',
          [theme.breakpoints.down('md')]: { display: 'none' },
        }}
      />

      {/* Show GG Logo */}
      <GGLogo
        sx={{
          fontSize: '2rem',
          [theme.breakpoints.down('sm')]: { display: 'none' },
          [theme.breakpoints.up('md')]: { display: 'none' },
        }}
      />

      {/* Show Category Button */}
      <CategoryButton setIsCategoryDrawerOpen={setIsCategoryDrawerOpen} />

      {/* Show Search Input */}
      <SearchInput />

      {/* Show Cart, Notification, Message Button */}
      <Stack direction="row" sx={{ gap: 1 }}>
        <CartButton />
        <NotificationButton />
        <MessageButton />
      </Stack>

      {/* Show Divider */}
      <Divider
        orientation="vertical"
        variant="middle"
        flexItem
        sx={{
          bgcolor: 'text.secondary',
          [theme.breakpoints.down('sm')]: { display: 'none' },
        }}
      />

      {/* Show Account Button */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ [theme.breakpoints.down('sm')]: { display: 'none' } }}
      >
        {authUser === null ? (
          <>
            <LoginButton />
            <RegisterButton />
          </>
        ) : (
          <AccountButton />
        )}
      </Stack>
    </Toolbar>
  );
}

export default MainToolbar;
