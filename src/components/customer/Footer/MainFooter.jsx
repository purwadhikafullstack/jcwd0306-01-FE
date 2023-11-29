import {
  AccessTimeRounded,
  EmailRounded,
  HeadsetMicRounded,
} from '@mui/icons-material';
import { Avatar, Stack, Typography } from '@mui/material';
import GadgetGallery from '../../../assets/GadgetGalleryLogo.png';

function MainFooter() {
  return (
    <Stack spacing={2} py={4} px={2} alignItems="center">
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Avatar
          alt="Logo Gadget Gallery"
          src={GadgetGallery}
          variant="rounded"
          sx={{
            maxWidth: '8rem',
            maxHeight: '8rem',
            width: '100%',
            height: '100%',
            alignSelf: 'center',
          }}
        />
        <Stack spacing={2}>
          <Stack>
            <Typography variant="caption" fontWeight="bold">
              Jika kamu ingin bantuan atau memiliki masukan, silakan hubungi
              kami:
            </Typography>
            <Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <AccessTimeRounded sx={{ fontSize: '1rem' }} />
                <Typography variant="caption">Jam 09:00 - 18:00</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailRounded sx={{ fontSize: '1rem' }} />
                <Typography variant="caption">
                  Email : test@test.test
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <HeadsetMicRounded sx={{ fontSize: '1rem' }} />
                <Typography variant="caption">
                  Contact Center : 123456
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack textAlign="left">
            <Typography variant="caption" fontWeight="bold">
              Jasa Pengiriman
            </Typography>
            <Typography variant="caption">
              Pos Indonesia | JNE | J&amp;T | SiCepat | Tiki
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Typography variant="caption" textAlign="center">
        Apabila kamu mengalami kendala saat menghubungi Contact Center kami di
        123456, silakan manfaatkan layanan GG email.
      </Typography>
    </Stack>
  );
}

export default MainFooter;
