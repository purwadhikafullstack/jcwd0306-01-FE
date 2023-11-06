import { Switch, TableCell, Tooltip } from '@mui/material';
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

function StatusTableCell({ product }) {
  const dispatch = useDispatch();

  const handleToggleStatus = (event, newValue) => {
    if (newValue) dispatch(asyncActivateProduct(event.target.value));
    else dispatch(asyncDeactivateProduct(event.target.value));
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
    deletedAt: oneOfType([instanceOf(Date), string, oneOf([null])]),
  }).isRequired,
};

export default StatusTableCell;
