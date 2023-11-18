import { Button, Stack, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import SearchInput from './SearchInput';
import SalesReportTable from './SalesReportTable';
import ReportFooter from './ReportFooter';

function ContainerReportPage() {
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
        Sales Report
      </Typography>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
        {/* Search Input */}
        <SearchInput />

        {/* Create Category Button */}
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
      {/* Sales Report Table */}
      <SalesReportTable />

      {/* Footer */}
      <ReportFooter />
    </Stack>
  );
}

export default ContainerReportPage;
