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
import SortLabelTableCell from './SortLabelTableCell';
import ProductHistoryTableItem from './ProductHistoryTableItem';

function ProductHistoryTable() {
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
              <SortLabelTableCell label="productName">
                Product
              </SortLabelTableCell>
              <SortLabelTableCell label="warehouse">
                Warehouse
              </SortLabelTableCell>
              <SortLabelTableCell label="quantity">Qty</SortLabelTableCell>
              <SortLabelTableCell label="updatedStock">
                <span style={{ textAlign: 'center' }}>Updated Stock</span>
              </SortLabelTableCell>
              <SortLabelTableCell label="type">Type </SortLabelTableCell>
              <SortLabelTableCell label="adminName">Admin</SortLabelTableCell>
              <SortLabelTableCell label="date">Date</SortLabelTableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <ProductHistoryTableItem />
        </Table>
      </TableContainer>
    </>
  );
}

export default ProductHistoryTable;
