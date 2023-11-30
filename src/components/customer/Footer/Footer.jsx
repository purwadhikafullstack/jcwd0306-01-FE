import { Box } from '@mui/material';
import BottomFooter from './BottomFooter';
import TopFooter from './TopFooter';
import MainFooter from './MainFooter';

function Footer() {
  return (
    <Box pt={20} component="footer">
      <TopFooter />
      <MainFooter />
      <BottomFooter />
    </Box>
  );
}

export default Footer;
