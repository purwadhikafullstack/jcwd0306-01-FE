import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import SearchInput from './SearchInput';
import ProductTable from './ProductTable';
import ProductTableFooter from './ProductTableFooter';

function WarehouseProductContainer() {
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="WarehouseAddress-content"
        id="WarehouseAddress-header"
      >
        Produk
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
          {/* Search Products Input */}
          <SearchInput />

          {/* Product Table */}
          <ProductTable />

          {/* Product Table Footer */}
          <ProductTableFooter />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default WarehouseProductContainer;
