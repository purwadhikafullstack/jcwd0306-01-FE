import { StarBorderRounded, StarRounded } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { arrayOf, number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';

function ProductCardItem({ product }) {
  return (
    <Card sx={{ minWidth: '10rem', boxShadow: 2 }}>
      <Link
        to={`/products/${product.id}`}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        <CardActionArea
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'start',
            alignItems: 'start',
          }}
        >
          <CardMedia
            component="img"
            image={`${import.meta.env.VITE_API_BASE_URL}/products/images/${
              product.imageIds[0]
            }`}
            alt={product.name}
            sx={{ aspectRatio: '1 / 1' }}
          />
          <CardContent component={Stack} spacing={0.5} maxWidth="100%">
            <Typography
              variant="caption"
              sx={{
                lineHeight: 1.2,
                // text wraped until max line
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
              }}
            >
              {product.name}
            </Typography>
            <Typography noWrap fontSize="80%" variant="subtitle2">
              {`Rp${(product.price * (1 - product.discount)).toLocaleString(
                'id-ID'
              )}`}
            </Typography>
            {product.discount > 0 && (
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography
                  component="del"
                  noWrap
                  sx={{
                    color: 'text.disabled',
                    fontWeight: '500',
                    fontSize: '80%',
                  }}
                >
                  {`Rp${product.price.toLocaleString('id-ID')}`}
                </Typography>
                <Typography
                  color="error"
                  sx={{ fontWeight: '500', fontSize: '80%' }}
                >
                  {new Intl.NumberFormat('id-ID', {
                    style: 'percent',
                  }).format(product.discount)}
                </Typography>
              </Stack>
            )}
            <Stack direction="row" spacing={0.5} alignItems="center">
              {product.sold > 0 ? (
                <StarRounded sx={{ color: '#FFC400', fontSize: '1rem' }} />
              ) : (
                <StarBorderRounded
                  sx={{ color: '#FFC400', fontSize: '1rem' }}
                />
              )}
              <Typography noWrap fontSize="60%" variant="caption">
                •
              </Typography>
              <Typography noWrap fontSize="60%" variant="caption">
                {product.sold} terjual
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

ProductCardItem.propTypes = {
  product: shape({
    id: number.isRequired,
    name: string.isRequired,
    imageIds: arrayOf(number).isRequired,
    price: number.isRequired,
    discount: number.isRequired,
    sold: number.isRequired,
  }).isRequired,
};

export default ProductCardItem;
