import {
  AssessmentRounded,
  CategoryRounded,
  DashboardRounded,
  Inventory2Rounded,
  LogoutRounded,
  Mail,
  NavigateBeforeRounded,
  SettingsRounded,
  ShoppingCartRounded,
  SupervisorAccountRounded,
  WarehouseRounded,
  History,
} from '@mui/icons-material';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { Button, Drawer, List, ListSubheader, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ListItem from './ListItem';

function MenuDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  const authUser = useSelector((states) => states.authUser);

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
          {authUser.isAdmin && (
            <ListItem text="Produk" to="/admin/products">
              <Inventory2Rounded />
            </ListItem>
          )}
          {authUser.isAdmin && (
            <ListItem text="Kategori" to="/admin/categories">
              <CategoryRounded />
            </ListItem>
          )}
          <ListItem text="Transaksi" to="/admin/transactions">
            <ReceiptLongRoundedIcon />
          </ListItem>
          <ListItem text="Laporan" to="/admin/report">
            <AssessmentRounded />
          </ListItem>
          <ListItem text="Product History" to="/admin/product-history">
            <History />
          </ListItem>
          <ListItem text="Messages" to="/admin/messages">
            <Mail />
          </ListItem>
        </List>

        {/* Preferences Menu */}
        <List subheader={<ListSubheader>Preferensi</ListSubheader>}>
          {authUser.isAdmin && (
            <ListItem text="Admin" to="/admin/administrator">
              <SupervisorAccountRounded />
            </ListItem>
          )}
          {authUser.isAdmin && (
            <ListItem text="Users" to="/admin/users">
              <PeopleOutlineIcon />
            </ListItem>
          )}
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
