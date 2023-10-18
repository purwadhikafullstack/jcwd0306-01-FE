import { useSelector } from 'react-redux';
import { TabContext } from '@mui/lab';
import { useSearchParams } from 'react-router-dom';
import CategoryTabList from './CategoryTabList';
import CategoryTabPanel from './CategoryTabPanel';

function ContainerCategoryTab() {
  const categories = useSelector((states) => states.categories);
  const [searchParams] = useSearchParams();

  return (
    <TabContext
      value={categories.length ? searchParams.get('categoryId') || '0' : '0'}
    >
      <CategoryTabList />
      <CategoryTabPanel tabId="0" />
      {categories.map((category) => (
        <CategoryTabPanel key={category.id} tabId={String(category.id)} />
      ))}
    </TabContext>
  );
}

export default ContainerCategoryTab;
