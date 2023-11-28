import { CancelRounded } from '@mui/icons-material';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from '@mui/material';
import { bool, func } from 'prop-types';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

function SortDialog({ isSortDialogOpen, setIsSortDialogOpen }) {
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <Dialog open={isSortDialogOpen} onClose={() => setIsSortDialogOpen(false)}>
      <DialogActions disableSpacing sx={{ p: 0 }}>
        <IconButton onClick={() => setIsSortDialogOpen(false)} color="error">
          <CancelRounded />
        </IconButton>
      </DialogActions>
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 700 }}>
        Urut berdasarkan
      </DialogTitle>
      <DialogContent>
        <FormControl>
          <RadioGroup
            aria-labelledby="sort-products-radio-label"
            name="sort-products-radio"
            value={
              `${searchParams.get('sortBy')}-${searchParams.get('orderBy')}` ||
              'updatedAt-desc'
            }
            onChange={(e, newValue) => {
              const [sortBy, orderBy] = newValue.split('-');
              updateQueryParams({ sortBy, orderBy });
            }}
          >
            <FormControlLabel
              value="name-asc"
              control={<Radio />}
              label="Nama (A-Z)"
            />
            <FormControlLabel
              value="name-desc"
              control={<Radio />}
              label="Nama (Z-A)"
            />
            <FormControlLabel
              value="deletedAt-asc"
              control={<Radio />}
              label="Status (aktif-nonaktif)"
            />
            <FormControlLabel
              value="deletedAt-desc"
              control={<Radio />}
              label="Status (nonaktif-aktif)"
            />
            <FormControlLabel
              value="createdAt-desc"
              control={<Radio />}
              label="Dibuat (terbaru-terlama)"
            />
            <FormControlLabel
              value="createdAt-asc"
              control={<Radio />}
              label="Dibuat (terlama-terbaru)"
            />
            <FormControlLabel
              value="updatedAt-desc"
              control={<Radio />}
              label="Diperbarui (terbaru-terlama)"
            />
            <FormControlLabel
              value="updatedAt-asc"
              control={<Radio />}
              label="Diperbarui (terlama-terbaru)"
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
}

SortDialog.propTypes = {
  isSortDialogOpen: bool.isRequired,
  setIsSortDialogOpen: func.isRequired,
};

export default SortDialog;
