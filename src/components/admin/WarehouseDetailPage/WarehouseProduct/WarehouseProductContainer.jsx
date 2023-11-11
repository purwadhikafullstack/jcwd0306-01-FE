import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

function WarehouseProductContainer() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="WarehouseAddress-content"
        id="WarehouseAddress-header"
      >
        Produk
      </AccordionSummary>
      <AccordionDetails />
    </Accordion>
  );
}

export default WarehouseProductContainer;
