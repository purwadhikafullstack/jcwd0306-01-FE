import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export function TotalSalesCard({ totalSales }) {
  const formattedTotalSales = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalSales);
  return (
    <Card sx={{ width: '100%', bgcolor: '#F59E0B' }}>
      <CardHeader
        title="Total Sales Amount"
        sx={{ fontSize: 14, color: 'white' }}
      />
      <CardContent>
        <Typography variant="h6" color="white">
          {formattedTotalSales}
        </Typography>
        <IconButton onClick={null} size="small">
          <OpenInNewIcon sx={{ fontSize: 12, color: 'white' }} />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export function TotalOrderCard({ totalOrder }) {
  return (
    <Card sx={{ width: '100%', bgcolor: '#7C3AED' }}>
      <CardHeader title="Total Order" sx={{ fontSize: 14, color: 'white' }} />
      <CardContent>
        <Typography variant="h6" color="white">
          {totalOrder}
        </Typography>
        <IconButton onClick={null} size="small">
          <OpenInNewIcon sx={{ fontSize: 12, color: 'white' }} />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export function TotalProductCard({ totalProduct }) {
  return (
    <Card sx={{ width: '100%', bgcolor: '#EF4444' }}>
      <CardHeader title="Total Product" sx={{ fontSize: 14, color: 'white' }} />
      <CardContent>
        <Typography variant="h6" color="white">
          {totalProduct}
        </Typography>
        <IconButton onClick={null} size="small">
          <OpenInNewIcon sx={{ fontSize: 12, color: 'white' }} />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export function TotalUserCard({ totalUser }) {
  return (
    <Card sx={{ width: '100%', bgcolor: '#10B981' }}>
      <CardHeader title="Total Users" sx={{ fontSize: 14, color: 'white' }} />
      <CardContent>
        <Typography variant="h6" color="white">
          {totalUser}
        </Typography>
        <IconButton onClick={null} size="small">
          <OpenInNewIcon sx={{ fontSize: 12, color: 'white' }} />
        </IconButton>
      </CardContent>
    </Card>
  );
}
