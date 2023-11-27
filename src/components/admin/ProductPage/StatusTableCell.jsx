import { Switch, TableCell, Tooltip, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  instanceOf,
  number,
  oneOf,
  oneOfType,
  shape,
  string,
} from 'prop-types';
import {
  asyncActivateProduct,
  asyncDeactivateProduct,
} from '../../../states/products/action';
import useSwal from '../../../hooks/useSwal';

function StatusTableCell({ product }) {
  const dispatch = useDispatch();
  const Swal = useSwal();

  const handleToggleStatus = async (event, newValue) => {
    await Swal.fire({
      icon: 'warning',
      title: (
        <Typography>
          {`${product.name} akan`}
          <Typography
            component="span"
            sx={{ fontWeight: 600, '&::before': { content: '" "' } }}
          >
            {newValue ? 'diaktifkan' : 'dinonaktifkan'}
          </Typography>
        </Typography>
      ),
      showDenyButton: true,
      denyButtonText: 'Batalkan',
      showConfirmButton: true,
      confirmButtonText: 'Konfirmasi',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        if (newValue) await dispatch(asyncActivateProduct(event.target.value));
        else await dispatch(asyncDeactivateProduct(event.target.value));
      },
    });
  };

  return (
    <TableCell align="center">
      <Tooltip
        title={`Status: ${product.deletedAt === null ? 'Aktif' : 'Nonaktif'}`}
        arrow
      >
        <Switch
          checked={product.deletedAt === null}
          value={product.id}
          onChange={handleToggleStatus}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: 'primary.main',
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'primary.main',
            },
          }}
        />
      </Tooltip>
    </TableCell>
  );
}

StatusTableCell.propTypes = {
  product: shape({
    id: number.isRequired,
    name: string.isRequired,
    deletedAt: oneOfType([instanceOf(Date), string, oneOf([null])]),
  }).isRequired,
};

export default StatusTableCell;
