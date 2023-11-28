import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Container from '../../components/admin/WarehouseDetailPage/Container';
import { asyncGetWarehouse } from '../../states/warehouse/action';
import BgImage from '../../assets/background1.svg';

function WarehouseDetailPage() {
  const warehouse = useSelector((states) => states.warehouse);
  const dispatch = useDispatch();
  const { warehouseId } = useParams();

  useEffect(() => {
    dispatch(asyncGetWarehouse(warehouseId));
  }, [dispatch, warehouseId]);

  if (warehouse === null) return null;

  return (
    <main>
      <Typography
        variant="h1"
        color="primary"
        sx={{
          backgroundImage: `url(${BgImage})`,
          color: 'white',
          textAlign: 'center',
          fontWeight: 900,
          fontSize: '2rem',
          fontFamily: '"Righteous", sans-serif',
          p: '1rem',
        }}
      >
        {warehouse.name}
      </Typography>
      <Box
        sx={{
          maxWidth: 'fit-content',
          padding: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Container />
      </Box>
    </main>
  );
}

export default WarehouseDetailPage;
