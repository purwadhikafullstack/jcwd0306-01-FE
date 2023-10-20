import { Avatar, Stack, Typography } from '@mui/material';
import {
  AccessTimeRounded,
  EmailRounded,
  HeadsetMicRounded,
} from '@mui/icons-material';
import GadgetGallery from '../../../../../assets/logo/GadgetGalleryLogo.png';

function FirstPart() {
  return (
    <Stack spacing={2}>
      <Avatar
        alt="Logo Gadget Gallery"
        src={GadgetGallery}
        variant="rounded"
        sx={{
          maxWidth: '8rem',
          maxHeight: '8rem',
          width: '100%',
          height: '100%',
        }}
      />
      <Typography variant="caption">
        Jika kamu ingin bantuan atau memiliki masukan, silakan hubungi kami:
      </Typography>
      <Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <AccessTimeRounded sx={{ fontSize: '1rem' }} />
          <Typography variant="caption">Jam 09:00 - 18:00</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <EmailRounded sx={{ fontSize: '1rem' }} />
          <Typography variant="caption">Email : test@test.test</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <HeadsetMicRounded sx={{ fontSize: '1rem' }} />
          <Typography variant="caption">Contact Center : 123456</Typography>
        </Stack>
      </Stack>
      <Typography variant="caption">
        Apabila kamu mengalami kendala saat menghubungi Contact Center kami di
        123456, silakan manfaatkan layanan GG email.
      </Typography>
    </Stack>
  );
}

export default FirstPart;
