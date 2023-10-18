import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import { ListAddress } from './ListAddress';

export function BoxAddresses({ addresses = [], setAddress, handleClose }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index, destination) => {
    setSelectedIndex(index);
    setAddress(destination);
    handleClose();
  };

  useEffect(() => {
    setSelectedIndex(addresses.findIndex((dest) => dest.isDefault));
  }, [addresses]);
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="main address list">
        {addresses.map((destination, index) => (
          <ListAddress
            destination={destination}
            index={index}
            selectedIndex={selectedIndex}
            handleListItemClick={handleListItemClick}
          />
        ))}
      </List>
    </Box>
  );
}
