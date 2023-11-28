import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { HeaderModal } from '../../../HeaderModal';
import { asyncGetWarehouses } from '../../../../states/warehouses/action';
import useCustomSearchParams from '../../../../hooks/useCustomSearchParams';

export function SelectByWarehouse({ open, setOpen }) {
  const warehouses = useSelector((states) => states.warehouses);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  const handleListItemClick = (warehouse) => {
    updateQueryParams({ WH: warehouse.name });
    setOpen(false);
  };

  useEffect(() => {
    dispatch(asyncGetWarehouses());
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <HeaderModal
        Title="Select Warehouses"
        handleClose={() => setOpen(false)}
      />
      <DialogContent>
        <List>
          {warehouses?.map((warehouse, index) => (
            <ListItem key={warehouse?.name} disablePadding>
              <ListItemButton onClick={() => handleListItemClick(warehouse)}>
                {/* Add the index + 1 to start numbering from 1 */}
                <ListItemText primary={`${index + 1}. ${warehouse?.name}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
