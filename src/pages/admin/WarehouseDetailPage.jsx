import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { asyncGetProducts } from '../../states/products/action';
import Container from '../../components/admin/WarehouseDetailPage/Container';
import { asyncGetWarehouse } from '../../states/warehouse/action';
import BgImage from '../../../assets/footer/bg-top-footer.svg';
import { asyncGetStockMutations } from '../../states/stockMutations/action';

function WarehouseDetailPage() {
  const warehouse = useSelector((states) => states.warehouse);
  const dispatch = useDispatch();
  const { warehouseId } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(asyncGetWarehouse(warehouseId));
  }, [dispatch, warehouseId]);

  useEffect(() => {
    const currentTab = searchParams.get('tab');
    if (currentTab === 'products') {
      dispatch(
        asyncGetProducts({
          getType: 'REPLACE',
          search: searchParams.get('search'),
          categoryId: searchParams.get('categoryId'),
          sortBy: searchParams.get('sortBy') || 'updatedAt',
          orderBy: searchParams.get('orderBy') || 'desc',
          paranoid: false,
          page: searchParams.get('page') || 1,
          perPage: searchParams.get('perPage') || 10,
          warehouseId,
        })
      );
    } else if (currentTab === 'stock-mutations') {
      dispatch(
        asyncGetStockMutations({
          search: searchParams.get('search'),
          status: searchParams.get('status'),
          type: searchParams.get('type'),
          sortBy: searchParams.get('sortBy') || 'updatedAt',
          orderBy: searchParams.get('orderBy') || 'desc',
          page: searchParams.get('page') || 1,
          perPage: searchParams.get('perPage') || 10,
          warehouseId,
        })
      );
    }
  }, [
    dispatch,
    warehouseId,
    searchParams.get('tab'),
    searchParams.get('categoryId'),
    searchParams.get('sortBy'),
    searchParams.get('orderBy'),
    searchParams.get('page'),
    searchParams.get('perPage'),
    searchParams.get('status'),
    searchParams.get('type'),
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
