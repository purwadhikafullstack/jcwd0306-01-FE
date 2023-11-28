import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import SearchInput from './SearchInput';
import StockMutationTableFooter from './StockMutationTableFooter';
import StockMutationTable from './StockMutationTable';

function StockMutationContainer() {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="WarehouseAddress-content"
        id="WarehouseAddress-header"
      >
        Mutasi Stok
      </AccordionSummary>
      <AccordionDetails>
        <Stack
          spacing={3}
          sx={{
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: 1,
          }}
        >
          {/* Search Stock Mutations Input */}
          <SearchInput />

          {/* Stock Mutation Table */}
          <StockMutationTable />

          {/* Stock Mutations Table Footer */}
          <StockMutationTableFooter />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default StockMutationContainer;
