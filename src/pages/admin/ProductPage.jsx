import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { asyncGetProducts } from '../../states/products/action';
import Container from '../../components/admin/ProductPage/Container';
import useCustomSearchParams from '../../hooks/useCustomSearchParams';

function ProductPage() {
  const dispatch = useDispatch();
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
    dispatch(
      asyncGetProducts({
        getType: 'REPLACE',
        search: searchParams.get('search'),
        categoryId: searchParams.get('categoryId'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
        paranoid: false,
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

export default ProductPage;
