import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import useCustomSearchParams from '../../hooks/useCustomSearchParams';
import { asyncGetProducts } from '../../states/products/action';
import Container from '../../components/admin/WarehouseDetailPage/Container';
import { asyncGetWarehouse } from '../../states/warehouse/action';
import BgImage from '../../../assets/footer/bg-top-footer.svg';

function WarehouseDetailPage() {
  const warehouse = useSelector((states) => states.warehouse);
  const dispatch = useDispatch();
  const { warehouseId } = useParams();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  useEffect(() => {
    updateQueryParams({
      sortBy: searchParams.get('sortBy') || 'updatedAt',
      orderBy: searchParams.get('orderBy') || 'desc',
      page: searchParams.get('page') || 1,
      perPage: searchParams.get('perPage') || 10,
    });
  }, []);

  useEffect(() => {
    dispatch(asyncGetWarehouse(warehouseId));
    dispatch(
      asyncGetProducts({
        getType: 'REPLACE',
        name: searchParams.get('name'),
        categoryId: searchParams.get('categoryId'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
        paranoid: false,
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
        warehouseId,
      })
    );
  }, [
    dispatch,
    warehouseId,
    searchParams.get('categoryId'),
    searchParams.get('sortBy'),
    searchParams.get('orderBy'),
    searchParams.get('page'),
    searchParams.get('perPage'),
  ]);

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
