import { useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../../components/customer/Footer/Footer';
import ContainerGrid from '../../components/customer/ProductDetailPage/ContainerGrid';
import { asyncGetProduct } from '../../states/product/action';

function ProductDetailPage() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const theme = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(asyncGetProduct(productId));
  }, [dispatch, productId]);

  return (
    <>
      <main
        style={{
          maxWidth: theme.breakpoints.values.lg + 100,
          padding: '1rem',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <ContainerGrid />
      </main>
      <Footer />
    </>
  );
}

export default ProductDetailPage;
