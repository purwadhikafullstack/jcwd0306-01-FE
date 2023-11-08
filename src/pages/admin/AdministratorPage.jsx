import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ContainerAdministrator from '../../components/admin/AdministratorPage/ContainerAdministrator';
import { asyncGetWarehouseAdmin } from '../../states/Administrator/action';

export function AdministratorPage() {
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetWarehouseAdmin());
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
      <ContainerAdministrator />
    </main>
  );
}
