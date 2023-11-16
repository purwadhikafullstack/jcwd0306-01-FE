import { Chip, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { func } from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function WarehouseSelect({ setfromWarehouseProduct }) {
  const product = useSelector((states) => states.product);
  const { warehouseId } = useParams();
  const { values } = useFormikContext();

  useEffect(() => {
    if (values.fromWarehouseId)
      setfromWarehouseProduct(
        product.WarehouseProducts.find(
          (val) => val.warehouseId === values.fromWarehouseId
        )
      );
  }, [values.fromWarehouseId]);

  return (
    <Field name="fromWarehouseId">
      {({ field }) => (
        <TextField
          select
          label="Pilih Gudang Asal"
          size="small"
          defaultValue={0}
          {...field}
          value={field.value || ''}
        >
          {product.WarehouseProducts.filter((val) => {
            if (val.warehouseId === Number(warehouseId)) return false;
            if (val.stock <= 0) return false;
            return true;
          }).map((val) => (
            <MenuItem key={val.warehouseId} value={val.warehouseId}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={`Stok: ${val.stock}`} />
                <Typography>{`${val.name}, ${val.city}`}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </TextField>
      )}
    </Field>
  );
}

WarehouseSelect.propTypes = {
  setfromWarehouseProduct: func.isRequired,
};

export default WarehouseSelect;
