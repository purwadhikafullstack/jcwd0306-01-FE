import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { asyncGetProducts } from '../../../states/products/action';

function MoreProductsButton() {
  const productPagination = useSelector((states) => states.productPagination);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [nextPage, setNextPage] = useState(2);

  const handleClick = () => {
    dispatch(
      asyncGetProducts({
        getType: 'PUSH',
        name: searchParams.get('name'),
        categoryId: searchParams.get('categoryId'),
        sortBy: searchParams.get('sortBy'),
        orderBy: searchParams.get('orderBy'),
        isPaginated: searchParams.get('isPaginated'),
        page: nextPage,
      })
    ).finally(() => setNextPage((prevState) => prevState + 1));
  };

  if (nextPage <= productPagination.totalPage) {
    return (
      <Button
        onClick={handleClick}
        variant="outlined"
        sx={{
          textTransform: 'none',
          mx: 'auto',
          px: { sm: '5rem' },
          py: '0.8rem',
        }}
      >
        Muat Lebih Banyak
      </Button>
    );
  }

  return null;
}

export default MoreProductsButton;
