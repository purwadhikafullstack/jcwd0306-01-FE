import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import share from '../../../../assets/share.png';

export function TotalProductSoldCard() {
  const theme = useTheme();
  return (
    <Card sx={{ maxWidth: 400, margin: 2 }}>
      <CardHeader
        title="All Time Products Sold"
        avatar={<ShoppingCartIcon />}
        sx={{ bgcolor: 'goldenrod', color: 'black', textAlign: 'center' }}
      />
      <CardContent>
        <Typography variant="h5" sx={{ textAlign: 'center' }}>
          365 Pcs
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
