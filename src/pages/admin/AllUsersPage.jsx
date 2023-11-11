import { useTheme } from '@mui/material';
import ContainerAllUsersPage from '../../components/admin/AllUsersPage/ContainerAllUsersPage';

export function AllUsersPage() {
  const theme = useTheme();

  return (
    <main
      style={{
        maxWidth: theme.breakpoints.values.lg,
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <ContainerAllUsersPage />
    </main>
  );
}
