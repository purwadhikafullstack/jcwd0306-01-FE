import { Tab, Tabs } from '@mui/material';
import { useSelector } from 'react-redux';
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

function CategoryTabList() {
  const categories = useSelector((states) => states.categories);
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <Tabs
      value={categories.length ? searchParams.get('categoryId') || '0' : '0'}
      aria-label="Category Tabs"
      variant="scrollable"
      onChange={(e, val) => updateQueryParams({ categoryId: val })}
      TabIndicatorProps={{
        sx: {
          bgcolor: 'white',
          top: '15%',
          ml: '1rem',
          maxWidth: '2.5rem',
          borderRadius: 1,
        },
      }}
      TabScrollButtonProps={{
        sx: {
          position: 'absolute',
          zIndex: 100,
          bgcolor: 'background.paper',
          boxShadow: 4,
          width: 'fit-content',
          height: 'fit-content',
          alignSelf: 'center',
          '&:nth-of-type(1)': {
            left: 0,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
          },
          '&:nth-of-type(4)': {
            right: 0,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          },
        },
      }}
      sx={{
        position: 'relative',
        maxWidth: 'lg',
        mx: 'auto',
        '& div.MuiTabs-flexContainer': { gap: '0.5rem' },
        '& button': {
          width: '10rem',
          height: '3.5rem',
          color: 'white',
          textTransform: 'none',
          fontWeight: 800,
          borderRadius: 1,
          alignItems: 'start',
          justifyContent: 'start',
          '&.Mui-selected': { color: 'white' },
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
    </Tabs>
  );
}

export default CategoryTabList;
