import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContainerAllUsersPage from '../../components/admin/AllUsersPage/ContainerAllUsersPage';
import useCustomSearchParams from '../../hooks/useCustomSearchParams';
import { asyncGetUsers } from '../../states/users/action';

export function AllUsersPage() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  useEffect(() => {
    updateQueryParams({
      sortBy: searchParams.get('sortBy') || 'firstName',
      orderBy: searchParams.get('orderBy') || 'ASC',
      page: searchParams.get('page') || 1,
      perPage: searchParams.get('perPage') || 10,
    });
  }, []);

  useEffect(() => {
    dispatch(
      asyncGetUsers({
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
      <ContainerAllUsersPage />
    </main>
  );
}
