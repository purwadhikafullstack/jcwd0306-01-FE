import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Container from '../../components/admin/WarehousePage/Container';
import { asyncGetWarehouses } from '../../states/warehouses/action';

function WarehousePage() {
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(asyncGetWarehouses());
  }, []);

  return (
    <main
      style={{
        maxWidth: theme.breakpoints.values.lg,
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Container />
    </main>
  );
}

export default WarehousePage;
