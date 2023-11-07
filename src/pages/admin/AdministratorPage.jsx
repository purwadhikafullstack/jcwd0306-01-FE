import { useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ContainerAdministrator from '../../components/admin/AdministratorPage/ContainerAdministrator';
import { asyncGetWarehouseAdmin } from '../../states/Administrator/action';
import api from '../../constants/api';

export function AdministratorPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const authUser = useSelector((states) => states.authUser);

  const data = async () => {
    const result = await api.get('/warehouseusers/6/users');
    console.log(result.data.data.WarehouseUsers);
  };

  const warehouseId = authUser?.id;

  const test = () => {
    dispatch(asyncGetWarehouseAdmin(warehouseId));
  };

  useEffect(() => {
    dispatch(asyncGetWarehouseAdmin(warehouseId));
    // data();
  }, [dispatch]);

  return (
    <main
      style={{
        maxWidth: theme.breakpoints.values.lg,
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <ContainerAdministrator test={test} />
    </main>
  );
}
