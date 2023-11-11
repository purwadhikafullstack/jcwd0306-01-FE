import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useCustomSearchParams from '../../hooks/useCustomSearchParams';
import { asyncGetProducts } from '../../states/products/action';
import Container from '../../components/admin/WarehouseDetailPage/Container';
import { asyncGetWarehouse } from '../../states/warehouse/action';

function WarehouseDetailPage() {
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

  return (
    <main
      style={{
        maxWidth: 'fit-content',
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Container />
    </main>
  );
}

export default WarehouseDetailPage;
