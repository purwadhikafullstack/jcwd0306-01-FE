import { StarBorderRounded, StarRounded } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';

function ProductCardItem({ image, name, price, sold }) {
  return (
    <Card
      sx={{
        minWidth: '10rem',
        maxWidth: '12rem',
        boxShadow: 2,
      }}
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
        <CardMedia component="img" image={image} alt={name} />
        <CardContent component={Stack} spacing={0.5}>
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
            {name}
          </Typography>
          <Typography noWrap fontSize="80%" variant="subtitle2">
            Rp{price.toLocaleString('id-ID')}
          </Typography>
          <Stack direction="row" spacing={0.5} alignItems="center">
            {sold > 0 ? (
              <StarRounded sx={{ color: '#FFC400', fontSize: '1rem' }} />
            ) : (
              <StarBorderRounded sx={{ color: '#FFC400', fontSize: '1rem' }} />
            )}
            <Typography noWrap fontSize="60%" variant="caption">
              {sold} terjual
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCardItem;
