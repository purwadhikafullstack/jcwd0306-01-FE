import { Box, useTheme } from '@mui/material';
import ContainerMonthlyReport from '../../components/admin/MonthlyReport/ContainerMonthlyReport';

export function MonthlyReport() {
  const theme = useTheme();

  return (
    <main
      style={{
        maxWidth: theme.breakpoints.values.lg,
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        border: '2px solid red',
      }}
    >
      <ContainerMonthlyReport />
    </main>
  );
}
