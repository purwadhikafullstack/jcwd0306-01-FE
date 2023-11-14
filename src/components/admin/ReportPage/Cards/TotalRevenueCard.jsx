import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import share from '../../../../assets/share.png';

export function TotalRevenueCard() {
  const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 400, margin: 2 }}>
      <CardHeader
        title="Total Revenue"
        avatar={<AttachMoneyIcon />}
        sx={{ bgcolor: 'goldenrod', color: 'black', textAlign: 'center' }}
      />
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          Rp. 36.251.000
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', color: theme.palette.text.secondary }}
        >
          details <img src={share} alt="share" style={{ maxHeight: 10 }} />
        </Typography>
      </CardContent>
    </Card>
  );
}
