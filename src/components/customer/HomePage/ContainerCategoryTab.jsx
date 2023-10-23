import { useSelector } from 'react-redux';
import { TabContext, TabPanel } from '@mui/lab';
import { useSearchParams } from 'react-router-dom';
import CategoryTabList from './CategoryTabList';
import ProductCardList from './ProductCardList';

function ContainerCategoryTab() {
  const categories = useSelector((states) => states.categories);
  const [searchParams] = useSearchParams();

  return (
    <TabContext
      value={categories.length ? searchParams.get('categoryId') || '0' : '0'}
    >
      <CategoryTabList />
      <TabPanel
        value="0"
        sx={{ width: '100%', maxWidth: 'lg', mx: 'auto', px: 0 }}
      >
        <ProductCardList />
      </TabPanel>
      {categories.map((category) => (
        <TabPanel
          key={category.id}
          value={String(category.id)}
          sx={{ width: '100%', maxWidth: 'lg', mx: 'auto', px: 0 }}
        >
          <ProductCardList />
        </TabPanel>
      ))}
    </TabContext>
  );
}

export default ContainerCategoryTab;
