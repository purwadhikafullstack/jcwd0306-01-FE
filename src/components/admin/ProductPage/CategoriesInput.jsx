import {
  Checkbox,
  FormControl,
  FormGroup,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { FieldArray } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetCategories } from '../../../states/categories/action';

function CategoriesInput() {
  const categories = useSelector((states) => states.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetCategories({ sortBy: 'name', orderBy: 'asc' }));
  }, []);

  return (
    <FieldArray name="categoryIds">
      {({ form, name, remove, push }) => (
        <FormControl component="fieldset" sx={{ py: '1rem' }}>
          <Typography variant="subtitle2" component="legend">
            Kategori Produk
          </Typography>
          <FormGroup>
            <List dense>
              {categories.map((category) => (
                <ListItem key={category.id} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      if (form.values[name].includes(category.id))
                        remove(form.values[name].indexOf(category.id));
                      else push(category.id);
                    }}
                    sx={{ borderRadius: 5 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        tabIndex={-1}
                        checked={form.values[name].includes(category.id)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                </ListItem>
              ))}
              {categories.length === 0 && (
                <ListItem>no category found</ListItem>
              )}
            </List>
          </FormGroup>
        </FormControl>
      )}
    </FieldArray>
  );
}

export default CategoriesInput;
