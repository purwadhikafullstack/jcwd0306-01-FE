import { Button, Toolbar, useTheme } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';

export function SalesReportToolbar() {
  const theme = useTheme();

  return (
    <Toolbar
      sx={{
        gap: 2,
        justifyContent: 'space-evenly', // Align buttons evenly
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          alignItems: 'center', // Center items in column for small screens
        },
      }}
    >
      <Button variant="outlined" startIcon={<HomeIcon />}>
        Home
      </Button>
      <Button variant="outlined" startIcon={<WarehouseIcon />}>
        Report by Warehouse
      </Button>
      <Button variant="outlined" startIcon={<CategoryIcon />}>
        Report by Category
      </Button>
      <Button variant="outlined" startIcon={<InventoryIcon />}>
        Report by Product
      </Button>
    </Toolbar>
  );
}
