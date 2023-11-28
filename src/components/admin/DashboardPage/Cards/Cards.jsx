import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

export function TotalSalesCard({ totalSales, totalSalesWarehouse }) {
  const nav = useNavigate();
  const authUser = useSelector((states) => states.authUser);
  const isWarehouseAdmin = authUser?.WarehouseUser?.warehouseId;

  const formattedTotalSales = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalSales);

  const formattedTotalSalesWarehouse = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalSalesWarehouse);

  return (
    <Card sx={{ width: '100%', bgcolor: '#F59E0B' }}>
      <CardHeader
        title="Total Sales Amount"
        sx={{ fontSize: 14, color: 'white' }}
      />
      <CardContent>
        <Typography variant="h6" color="white">
          {isWarehouseAdmin
            ? formattedTotalSalesWarehouse
            : formattedTotalSales}
        </Typography>
        <Tooltip title="View details">
          <IconButton onClick={() => nav('/admin/report')} size="small">
            <OpenInNewIcon sx={{ fontSize: 12, color: 'white' }} />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

export function TotalOrderCard({ totalOrder, totalOrderWarehouse }) {
  const nav = useNavigate();
  const authUser = useSelector((states) => states.authUser);
  const isWarehouseAdmin = authUser?.WarehouseUser?.warehouseId;
  return (
    <Card sx={{ width: '100%', bgcolor: '#7C3AED' }}>
      <CardHeader title="Total Order" sx={{ fontSize: 14, color: 'white' }} />
      <CardContent>
        <Typography variant="h6" color="white">
          {isWarehouseAdmin ? totalOrderWarehouse : totalOrder}
        </Typography>
        <Tooltip title="View details">
          <IconButton onClick={() => nav('/admin/transactions')} size="small">
            <OpenInNewIcon sx={{ fontSize: 12, color: 'white' }} />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

export function TotalProductCard({ totalProduct, totalProductWarehouse }) {
  const nav = useNavigate();
  const authUser = useSelector((states) => states.authUser);
  const isWarehouseAdmin = authUser?.WarehouseUser?.warehouseId;
  return (
    <Card sx={{ width: '100%', bgcolor: '#EF4444' }}>
      <CardHeader title="Total Product" sx={{ fontSize: 14, color: 'white' }} />
      <CardContent>
        <Typography variant="h6" color="white">
          {isWarehouseAdmin ? totalProductWarehouse : totalProduct}
        </Typography>
        <Tooltip title="View details">
          <IconButton onClick={() => nav('/admin/products')} size="small">
            <OpenInNewIcon sx={{ fontSize: 12, color: 'white' }} />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
}

export function TotalUserCard({ totalUser }) {
  const nav = useNavigate();
  const authUser = useSelector((states) => states.authUser);
  const isSuperAdmin = authUser?.isAdmin;
  return (
    <Card
      sx={{
        width: '100%',
        bgcolor: '#10B981',
        display: isSuperAdmin ? '' : 'none',
      }}
    >
      <CardHeader title="Total Users" sx={{ fontSize: 14, color: 'white' }} />
      <CardContent>
        <Typography variant="h6" color="white">
          {totalUser}
        </Typography>
        <Tooltip title="View details">
          <IconButton onClick={() => nav('/admin/users')} size="small">
            <OpenInNewIcon sx={{ fontSize: 12, color: 'white' }} />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
