import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { asyncGetCategories } from '../../states/categories/action';
import ContainerCategoryTab from '../../components/customer/HomePage/ContainerCategoryTab';
import { asyncGetProducts } from '../../states/products/action';
import Footer from '../../components/customer/Footer/Footer';
import { asyncGetCarousels } from '../../states/carousels/action';
import Carousel from '../../components/customer/HomePage/Carousel';

function HomePage() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(asyncGetCarousels());
    dispatch(asyncGetCategories());
    dispatch(
      asyncGetProducts({
        getType: 'REPLACE',
        search: searchParams.get('search'),
        categoryId: searchParams.get('categoryId'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
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
      <main>
        <Carousel />
        <ContainerCategoryTab />
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
