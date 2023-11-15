import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ContainerAdministrator from '../../components/admin/AdministratorPage/ContainerAdministrator';
import { asyncGetWarehouseAdmin } from '../../states/Administrator/action';
import useCustomSearchParams from '../../hooks/useCustomSearchParams';

export function AdministratorPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  // useEffect(() => {
  //   dispatch(asyncGetWarehouseAdmin());
  // }, [dispatch]);

  useEffect(() => {
    updateQueryParams({
      sortBy: searchParams.get('sortBy') || 'name',
      orderBy: searchParams.get('orderBy') || 'ASC',
      page: searchParams.get('page') || 1,
      perPage: searchParams.get('perPage') || 10,
    });
  }, []);

  useEffect(() => {
    dispatch(
      asyncGetWarehouseAdmin({
        name: searchParams.get('name'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
      })
    );
  }, [
    dispatch,
    searchParams.get('sortBy'),
    searchParams.get('orderBy'),
    searchParams.get('page'),
    searchParams.get('perPage'),
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
      <ContainerAdministrator />
    </main>
  );
}
