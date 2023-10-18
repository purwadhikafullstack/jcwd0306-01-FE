import { TabPanel } from '@mui/lab';
import ProductCardList from './ProductCardList';

function CategoryTabPanel({ tabId }) {
  return (
    <TabPanel value={tabId} sx={{ width: '100%', maxWidth: 'lg', mx: 'auto' }}>
      <ProductCardList />
    </TabPanel>
  );
}

export default CategoryTabPanel;
