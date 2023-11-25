import { useTheme } from '@emotion/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerProductHistory from '../../components/admin/ProductHistoryPage/ContainerProductHistory';
import { asyncGetProductHistory } from '../../states/productHistory/action';
import useCustomSearchParams from '../../hooks/useCustomSearchParams';

export function ProductHistoryPage() {
  const authUser = useSelector((states) => states.authUser);
  console.log(authUser);
  const id = authUser?.WarehouseUser?.warehouseId || null;
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  useEffect(() => {
    updateQueryParams({
      sortBy: searchParams.get('sortBy') || 'productName',
      orderBy: searchParams.get('orderBy') || 'ASC',
      page: searchParams.get('page') || 1,
      perPage: searchParams.get('perPage') || 10,
    });
  }, []);

  useEffect(() => {
    dispatch(
      asyncGetProductHistory({
        name: searchParams.get('name'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
        WH: searchParams.get('WH'),
        productName: searchParams.get('productName'),
        startDate: searchParams.get('startDate'),
        endDate: searchParams.get('endDate'),
        warehouseId: id,
      })
    );
  }, [
    dispatch,
    searchParams.get('sortBy'),
    searchParams.get('orderBy'),
    searchParams.get('page'),
    searchParams.get('perPage'),
    searchParams.get('name'),
    searchParams.get('WH'),
    searchParams.get('productName'),
    searchParams.get('startDate'),
    searchParams.get('endDate'),
    id,
  ]);

  return (
    <main
      style={{
        maxWidth: theme.breakpoints.values.lg,
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <ContainerProductHistory />
    </main>
  );
}
