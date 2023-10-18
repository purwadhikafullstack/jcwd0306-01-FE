import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@mui/material';
import { asyncGetCategories } from '../../states/categories/action';
import ContainerCategoryTab from '../../components/customer/HomePage/ContainerCategoryTab';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetCategories());
  }, [dispatch]);

  return (
    <Stack>
      <ContainerCategoryTab />
    </Stack>
  );
}

export default HomePage;
