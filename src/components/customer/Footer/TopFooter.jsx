import { Stack, Typography, useTheme } from '@mui/material';
import {
  CategoryRounded,
  MonetizationOnRounded,
  OfflineBoltRounded,
  VerifiedRounded,
} from '@mui/icons-material';
import GadgetGalleryLogo from '../../GadgetGalleryLogo';
import BgImage from '../../../../assets/footer/bg-top-footer.svg';

function TopFooter() {
  const theme = useTheme();

  const iconStyle = {
    color: 'white',
    [theme.breakpoints.down('sm')]: { fontSize: '10vw' },
    [theme.breakpoints.between('sm', 'md')]: { fontSize: '4rem' },
    [theme.breakpoints.up('md')]: { fontSize: '3rem' },
  };

  const textStyle = {
    color: 'white',
    [theme.breakpoints.down('sm')]: { fontSize: '6vw' },
    [theme.breakpoints.between('sm', 'md')]: { fontSize: '1.8rem' },
    [theme.breakpoints.up('md')]: { fontSize: '1.5rem' },
  };

  return (
    <Stack
      py={8}
      spacing={8}
      sx={{
        bgcolor: '#009BD2',
        backgroundImage: `url(${BgImage})`,
        backgroundSize: '100% 100%',
      }}
    >
      <Stack
        direction={{ sm: 'row' }}
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <Typography color="white" variant="h6" sx={{ ...textStyle }}>
          Keuntungan Belanja di
        </Typography>
        <GadgetGalleryLogo
          sx={{
            [theme.breakpoints.down(300)]: { fontSize: '10vw', px: '5vw' },
            [theme.breakpoints.up(300)]: { fontSize: '2rem', px: '2rem' },
            bgcolor: 'white',
            borderRadius: 4,
            maxWidth: '90vw',
          }}
        />
      </Stack>
      <Stack direction={{ md: 'row' }} justifyContent="space-evenly" gap={6}>
        <Stack direction={{ lg: 'row' }} alignItems="center" spacing={1}>
          <CategoryRounded sx={{ ...iconStyle }} />
          <Typography variant="subtitle2" sx={{ ...textStyle }}>
            Produk Beragam
          </Typography>
        </Stack>
        <Stack direction={{ lg: 'row' }} alignItems="center" spacing={1}>
          <MonetizationOnRounded sx={{ ...iconStyle }} />
          <Typography variant="subtitle2" sx={{ ...textStyle }}>
            Harga Terbaik
          </Typography>
        </Stack>
        <Stack direction={{ lg: 'row' }} alignItems="center" spacing={1}>
          <OfflineBoltRounded sx={{ ...iconStyle }} />
          <Typography variant="subtitle2" sx={{ ...textStyle }}>
            Praktis dan Cepat
          </Typography>
        </Stack>
        <Stack direction={{ lg: 'row' }} alignItems="center" spacing={1}>
          <VerifiedRounded sx={{ ...iconStyle }} />
          <Typography variant="subtitle2" sx={{ ...textStyle }}>
            100% Original
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default TopFooter;
