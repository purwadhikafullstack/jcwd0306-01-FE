import { Stack } from '@mui/material';
import FirstPart from './FirstPart';
import SecondPart from './SecondPart';
import ThirdPart from './ThirdPart';
import FourthPart from './FourthPart';

function MainFooter() {
  return (
    <Stack
      direction="row"
      py={4}
      px={2}
      spacing={2}
      sx={{ '& > *': { width: '20%' } }}
      justifyContent="space-evenly"
    >
      <FirstPart />
      <SecondPart />
      <ThirdPart />
      <FourthPart />
    </Stack>
  );
}

export default MainFooter;
