import { Button, Stack, Typography } from '@mui/material';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import SearchInput from './SearchInput';
import { MonthlyBar } from './MonthlyBar';

Chart.register(CategoryScale);

function ContainerMonthlyReport() {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}
    >
      {/* Title */}
      <Typography fontWeight={800} fontSize="1.2rem">
        Monthly Sales
      </Typography>

      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
        {/* Search Input */}
        <SearchInput />

        {/* Filter Button */}
        <Button
          size="small"
          variant="text"
          endIcon={<CloseIcon />}
          sx={{
            backgroundColor: 'grey',
            color: 'white',
            fontSize: '10px',
            maxHeight: '30px',
            display: 'none',
            ':hover': { backgroundColor: 'grey' },
          }}
        >
          smartphone
        </Button>
        <Button
          onClick={null}
          variant="contained"
          startIcon={<FilterAltIcon />}
          sx={{ textTransform: 'none' }}
        >
          FILTER
        </Button>
      </Stack>

      {/* Content */}
      <MonthlyBar />
    </Stack>
  );
}

export default ContainerMonthlyReport;
