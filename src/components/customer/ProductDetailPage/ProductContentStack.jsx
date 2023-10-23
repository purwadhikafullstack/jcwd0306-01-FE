import { StarBorderRounded, StarRounded } from '@mui/icons-material';
import { Chip, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function ProductContentStack() {
  const product = useSelector((states) => states.product);

  return (
    <Stack spacing={2}>
      <Stack>
        <Typography fontWeight={800} fontSize="1.3rem">
          {product.name}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Terjual</Typography>
          <Typography color="text.secondary">{product.sold}</Typography>
          <Typography>•</Typography>
          {product.sold > 0 ? (
            <StarRounded sx={{ color: '#FFC400' }} />
          ) : (
            <StarBorderRounded sx={{ color: '#FFC400' }} />
          )}
        </Stack>
      </Stack>
      <Stack>
        <Stack>
          <Stack>
            <Typography fontSize="2rem" fontWeight={800}>
              Rp
              {(product.price * (1 - product.discount)).toLocaleString('id-ID')}
            </Typography>
            {product.discount > 0 && (
              <Stack direction="row" spacing={1}>
                <Chip
                  label={`${product.discount * 100}%`}
                  color="error"
                  size="small"
                />
                <Typography
                  component="del"
                  sx={{ color: 'text.disabled', fontWeight: '500' }}
                >
                  Rp{product.price.toLocaleString('id-ID')}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default ProductContentStack;
