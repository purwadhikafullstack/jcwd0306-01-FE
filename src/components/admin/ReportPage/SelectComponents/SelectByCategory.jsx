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
import useCustomSearchParams from '../../../../hooks/useCustomSearchParams';
import { asyncGetCategories } from '../../../../states/categories/action';

export function SelectByCategory({ open, setOpen }) {
  const categories = useSelector((states) => states.categories);
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  const handleListItemClick = (category) => {
    updateQueryParams({ category: category.name, perPage: 25 });
    setOpen(false);
  };

  useEffect(() => {
    dispatch(asyncGetCategories());
  }, [dispatch]);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <HeaderModal
        Title="Select Categories"
        handleClose={() => setOpen(false)}
      />
      <DialogContent>
        <List>
          {categories?.map((category, index) => (
            <ListItem key={category?.name} disablePadding>
              <ListItemButton onClick={() => handleListItemClick(category)}>
                <ListItemText primary={`${index + 1}. ${category?.name}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
