import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { asyncGetCategories } from '../../states/categories/action';
import Container from '../../components/admin/CategoryPage/Container';

function CategoryPage() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      search: searchParams.get('search') || '',
      sortBy: searchParams.get('sortBy') || 'updatedAt',
      orderBy: searchParams.get('orderBy') || 'desc',
      page: searchParams.get('page') || 1,
      perPage: searchParams.get('perPage') || 10,
    });
  }, []);

  useEffect(() => {
    dispatch(
      asyncGetCategories({
        search: searchParams.get('search'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
        pagination: true,
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

export default CategoryPage;
