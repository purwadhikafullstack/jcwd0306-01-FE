import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Container from '../../components/customer/ProductPage/Container';
import { asyncGetCategories } from '../../states/categories/action';
import { asyncGetProducts } from '../../states/products/action';

function ProductPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(asyncGetCategories());
    dispatch(
      asyncGetProducts({
        getType: 'REPLACE',
        search: searchParams.get('search'),
        categoryId: searchParams.get('categoryId'),
        sortBy: searchParams.get('sortBy') || 'updatedAt',
        orderBy: searchParams.get('orderBy') || 'desc',
        page: searchParams.get('page'),
        perPage: searchParams.get('perPage'),
      })
    );
  }, [
    dispatch,
    searchParams.get('categoryId'),
    searchParams.get('sortBy'),
    searchParams.get('orderBy'),
    searchParams.get('page'),
    searchParams.get('perPage'),
  ]);

  return (
    <main
      style={{
        maxWidth: theme.breakpoints.values.lg + 100,
        padding: '1rem',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Container />
    </main>
  );
}

export default ProductPage;
