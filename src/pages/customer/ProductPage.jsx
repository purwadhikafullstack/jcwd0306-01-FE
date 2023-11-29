import { useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Container from '../../components/customer/ProductPage/Container';
import { asyncGetCategories } from '../../states/categories/action';
import { asyncGetProducts } from '../../states/products/action';
import Footer from '../../components/customer/Footer/Footer';

function ProductPage() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      search: searchParams.get('search') || '',
      categoryId: searchParams.get('categoryId') || 0,
      sortBy: searchParams.get('sortBy') || 'updatedAt',
      orderBy: searchParams.get('orderBy') || 'desc',
      page: searchParams.get('page') || 1,
      perPage: searchParams.get('perPage') || 10,
    });
  }, []);

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
    <>
      <main
        style={{
          maxWidth: theme.breakpoints.values.lg + 100,
          paddingTop: '1rem',
          paddingBottom: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Container />
      </main>
      <Footer />
    </>
  );
}

export default ProductPage;
