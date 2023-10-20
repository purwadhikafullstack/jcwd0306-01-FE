import { Stack, useMediaQuery, useTheme } from '@mui/material';
import FirstPart from './FirstPart';
import SecondPart from './SecondPart';
import ThirdPart from './ThirdPart';
import FourthPart from './FourthPart';

function MainFooter() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Stack
      direction={(() => {
        if (isSmUp) return 'row';
        return 'column';
      })()}
      py={4}
      px={2}
      spacing={2}
      sx={{ [theme.breakpoints.up('sm')]: { '& > *': { width: '20%' } } }}
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
