import { useSelector } from 'react-redux';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

const tabColors = [
  {
    backgroundColor: 'rgb(209,36,144)',
    backgroundImage:
      'linear-gradient(225deg, rgba(209,36,144,1) 50%, rgba(154,32,106,1) 100%)',
  },
  {
    backgroundColor: 'rgb(64,177,71)',
    backgroundImage:
      'linear-gradient(225deg, rgba(64,177,71,1) 50%, rgba(12,139,70,1) 100%)',
  },
  {
    backgroundColor: 'rgb(253,192,3)',
    backgroundImage:
      'linear-gradient(225deg, rgba(253,192,3,1) 50%, rgba(233,142,25,1) 100%)',
  },
  {
    backgroundColor: 'rgb(120,31,181)',
    backgroundImage:
      'linear-gradient(225deg, rgba(120,31,181,1) 50%, rgba(52,34,112,1) 100%)',
  },
  {
    backgroundColor: 'rgb(25,171,168)',
    backgroundImage:
      'linear-gradient(225deg, rgba(25,171,168,1) 50%, rgba(5,114,169,1) 100%)',
  },
];

function ContainerCategoryTab() {
  const categories = useSelector((states) => states.categories);
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <>
      <Box>
        <TabContext
          value={
            categories.length ? searchParams.get('categoryId') || '0' : '0'
          }
        >
          <TabList
            allowScrollButtonsMobile
            aria-label="Product Tabs"
            variant="scrollable"
            TabIndicatorProps={{
              sx: {
                bgcolor: 'background.paper',
                top: '15%',
                ml: '1rem',
                maxWidth: '2.5rem',
                borderRadius: 1,
              },
            }}
            onChange={(e, val) => updateQueryParams({ categoryId: val })}
            sx={{
              maxWidth: 'lg',
              mx: 'auto',
              '& div.MuiTabs-flexContainer': { gap: '0.5rem' },
              '& button': {
                width: '10rem',
                height: '3.5rem',
                color: 'background.paper',
                textTransform: 'none',
                fontWeight: 800,
                borderRadius: 1,
                alignItems: 'start',
                justifyContent: 'start',
                '&.Mui-selected': { color: 'background.paper' },
              },
            }}
          >
            <Tab
              label="Semua"
              value="0"
              wrapped
              sx={{ ...tabColors[tabColors.length - 1] }}
            />
            {categories.map((category, idx) => (
              <Tab
                key={category.id}
                label={category.name}
                value={String(category.id)}
                wrapped
                sx={{ ...tabColors[idx % tabColors.length] }}
              />
            ))}
          </TabList>
          <TabPanel value="0">{/* <ContainerProductCard /> */}</TabPanel>
          {categories.map((category) => (
            <TabPanel key={category.id} value={`${category.id}`}>
              {/* <ContainerProductCard /> */}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
      {/* <PaginationProductCard /> */}
    </>
  );
}

export default ContainerCategoryTab;
