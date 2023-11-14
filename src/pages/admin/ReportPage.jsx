import { useMediaQuery, useTheme } from '@mui/material';
import { TotalProductSoldCard } from '../../components/admin/ReportPage/Cards/TotalProductSold';
import { SalesReportToolbar } from '../../components/admin/ReportPage/Toolbar/Toolbar';
import { TotalRevenueCard } from '../../components/admin/ReportPage/Cards/TotalRevenueCard';

export function ReportPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <main
      style={{
        maxWidth: theme.breakpoints.values.lg,
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <SalesReportToolbar />
      <div
        className="wrapper-cards"
        style={{ display: 'flex', flexDirection: isDesktop ? 'row' : 'column' }}
      >
        <TotalProductSoldCard />
        <TotalRevenueCard />
        <TotalProductSoldCard />
        <TotalRevenueCard />
      </div>
    </main>
  );
}
