import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { asyncGetCategories } from '../../states/categories/action';
import Container from '../../components/admin/CategoryPage/Container';

function CategoryPage() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(
      asyncGetCategories({
        name: searchParams.get('name'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
      })
    );
  }, [dispatch, searchParams.get('sortBy'), searchParams.get('orderBy')]);

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

export default CategoryPage;
