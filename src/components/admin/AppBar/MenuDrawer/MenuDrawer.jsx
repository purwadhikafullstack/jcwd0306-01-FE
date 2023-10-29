import {
  AssessmentRounded,
  CategoryRounded,
  DashboardRounded,
  Inventory2Rounded,
  LogoutRounded,
  NavigateBeforeRounded,
  SettingsRounded,
  ShoppingCartRounded,
  SupervisorAccountRounded,
  WarehouseRounded,
} from '@mui/icons-material';
import { Button, Drawer, List, ListSubheader, Stack } from '@mui/material';
import ListItem from './ListItem';

function MenuDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  return (
    <Drawer
      anchor="left"
      open={isDrawerOpen}
      onClose={() => setIsDrawerOpen(false)}
      PaperProps={{ sx: { p: '1rem' } }}
    >
      <Stack direction="column" spacing={1}>
        {/* Hide Drawer Button */}
        <Button
          onClick={() => setIsDrawerOpen(false)}
          startIcon={<NavigateBeforeRounded />}
          sx={{ textTransform: 'none' }}
        >
          Sembunyikan Menu
        </Button>

        {/* Manage Menu */}
        <List subheader={<ListSubheader>Pengelolaan</ListSubheader>}>
          <ListItem text="Dashboard" to="/admin">
            <DashboardRounded />
          </ListItem>
          <ListItem text="Gudang" to="/admin/warehouses">
            <WarehouseRounded />
          </ListItem>
          <ListItem text="Produk" to="/admin/products">
            <Inventory2Rounded />
          </ListItem>
          <ListItem text="Kategori" to="/admin/categories">
            <CategoryRounded />
          </ListItem>
          <ListItem text="Laporan" to="/admin/report">
            <AssessmentRounded />
          </ListItem>
        </List>

        {/* Preferences Menu */}
        <List subheader={<ListSubheader>Preferensi</ListSubheader>}>
          <ListItem text="Admin" to="/admin/administrator">
            <SupervisorAccountRounded />
          </ListItem>
          <ListItem text="Pengaturan" to="/admin/general">
            <SettingsRounded />
          </ListItem>
          <ListItem text="Halaman Utama" to="/">
            <ShoppingCartRounded />
          </ListItem>
        </List>

        {/* Logout Menu */}
        <List>
          <ListItem text="Logout" to="/logout">
            <LogoutRounded />
          </ListItem>
        </List>
      </Stack>
    </Drawer>
  );
}

export default MenuDrawer;
