import { useTheme } from '@mui/material';
import ContainerDashboard from '../../components/admin/DashboardPage/ContainerDashboard';

function DashboardPage() {
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
      <ContainerDashboard />
    </main>
  );
}

export default DashboardPage;
