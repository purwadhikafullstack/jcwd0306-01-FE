import {
  Box,
  Button,
  Drawer,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { SortRounded, TuneRounded } from '@mui/icons-material';
import FilterStack from './FilterStack';
import SortStack from './SortStack';
import ProductStack from './ProductStack';

function Container() {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [isSortDrawerOpen, setIsSortDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  return (
    <Grid container spacing={1} rowGap={3}>
      <Grid item xs={12} md={2.5} lg={2}>
        {isMdDown ? (
          <>
            <Stack direction="row" spacing={1}>
              <Box flexGrow={1} />
              <Button
                onClick={() => setIsSortDrawerOpen(true)}
                variant="outlined"
                sx={{ borderRadius: '10rem' }}
              >
                <SortRounded />
              </Button>
              <Button
                onClick={() => setIsFilterDrawerOpen(true)}
                variant="outlined"
                sx={{ borderRadius: '10rem' }}
              >
                <TuneRounded />
              </Button>
            </Stack>
            <Drawer
              anchor="bottom"
              open={isSortDrawerOpen}
              onClose={() => setIsSortDrawerOpen(false)}
              PaperProps={{
                sx: {
                  maxHeight: '70vh',
                  borderTopLeftRadius: 10,
                  WebkitBorderTopRightRadius: 10,
                },
              }}
            >
              <SortStack />
            </Drawer>
            <Drawer
              anchor="bottom"
              open={isFilterDrawerOpen}
              onClose={() => setIsFilterDrawerOpen(false)}
              PaperProps={{
                sx: {
                  maxHeight: '70vh',
                  borderTopLeftRadius: 10,
                  WebkitBorderTopRightRadius: 10,
                },
              }}
            >
              <FilterStack />
            </Drawer>
          </>
        ) : (
          <Stack spacing={1}>
            <SortStack />
            <FilterStack />
          </Stack>
        )}
      </Grid>
      <Grid item xs={12} md={9.5} lg={10}>
        <ProductStack />
      </Grid>
    </Grid>
  );
}

export default Container;
