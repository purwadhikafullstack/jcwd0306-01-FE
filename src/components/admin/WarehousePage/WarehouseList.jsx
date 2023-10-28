import { ImageList, useMediaQuery, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import WarehouseItem from './WarehouseItem';

const itemColors = [
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

function WarehouseList() {
  const warehouses = useSelector((states) => states.warehouses);
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ImageList
      cols={(() => {
        if (isSmDown) return 1;
        if (isMdDown) return 2;
        return 3;
      })()}
      gap={12}
      variant="standard"
      sx={{
        p: 4,
        borderRadius: 1,
        boxShadow: 4,
      }}
    >
      {warehouses.map((warehouse, idx) => (
        <WarehouseItem
          key={warehouse.id}
          warehouse={warehouse}
          bgColor={itemColors[idx % itemColors.length]}
        />
      ))}
    </ImageList>
  );
}

export default WarehouseList;
