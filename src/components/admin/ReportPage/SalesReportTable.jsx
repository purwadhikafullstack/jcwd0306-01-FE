import {
  Box,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from 'react-router-dom';
import SalesReportTableItem from './SalesReportTableItem';
import SortLabelTableCell from '../AdministratorPage/SortLabelTableCell';

function SalesReportTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queries = Object.fromEntries(searchParams.entries());

  const handleRemoveFilter = (paramName) => {
    const updatedQueries = { ...queries };
    delete updatedQueries[paramName];
    setSearchParams(updatedQueries);
  };
  return (
    <>
      {/* explain filter */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        {queries?.WH && (
          <Button
            variant="outlined"
            size="small"
            endIcon={<CloseIcon />}
            sx={{
              width: 'fit-content',
              bgcolor: 'grey',
              color: 'white',
              ':hover': { bgcolor: '#9a9ba1' },
            }}
            onClick={() => handleRemoveFilter('WH')}
          >
            Warehouse: {queries?.WH}
          </Button>
        )}

        {queries?.category && (
          <Button
            variant="outlined"
            size="small"
            endIcon={<CloseIcon />}
            sx={{
              width: 'fit-content',
              bgcolor: 'grey',
              color: 'white',
              ':hover': { bgcolor: '#9a9ba1' },
            }}
            onClick={() => handleRemoveFilter('category')}
          >
            Category: {queries?.category}
          </Button>
        )}

        {queries?.productName && (
          <Button
            variant="outlined"
            size="small"
            endIcon={<CloseIcon />}
            sx={{
              width: 'fit-content',
              bgcolor: 'grey',
              color: 'white',
              ':hover': { bgcolor: '#9a9ba1' },
            }}
            onClick={() => handleRemoveFilter('productName')}
          >
            Product: {queries?.productName}
          </Button>
        )}
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 0.5 }}>
        <Table aria-label="Category Table">
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>No</TableCell>
              <SortLabelTableCell label="id">ID</SortLabelTableCell>
              <SortLabelTableCell label="sentTo">Sent to</SortLabelTableCell>
              <SortLabelTableCell label="warehouseLoc">
                warehouse origin
              </SortLabelTableCell>
              <SortLabelTableCell label="date">
                Transaction Date
              </SortLabelTableCell>
              <TableCell sx={{ color: 'white' }}>Quantity</TableCell>
              <TableCell sx={{ color: 'white' }}>Item(s)</TableCell>
              <SortLabelTableCell label="total">Total</SortLabelTableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <SalesReportTableItem />
        </Table>
      </TableContainer>
    </>
  );
}

export default SalesReportTable;
