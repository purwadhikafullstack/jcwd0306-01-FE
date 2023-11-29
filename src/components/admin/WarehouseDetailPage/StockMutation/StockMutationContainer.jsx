import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import SearchInput from './SearchInput';
import StockMutationTableFooter from './StockMutationTableFooter';
import StockMutationTable from './StockMutationTable';
import { asyncGetStockMutations } from '../../../../states/stockMutations/action';

function StockMutationContainer() {
  const warehouse = useSelector((states) => states.warehouse);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      tab: searchParams.get('tab') || '',
      search: searchParams.get('search') || '',
      sortBy: 'updatedAt',
      orderBy: 'desc',
      page: 1,
      perPage: 10,
    });
  }, []);

  useEffect(() => {
    dispatch(
      asyncGetStockMutations({
        search: searchParams.get('search'),
        status: searchParams.get('status'),
        type: searchParams.get('type'),
        sortBy: searchParams.get('sortBy') || 'updatedAt',
        orderBy: searchParams.get('orderBy') || 'desc',
        page: searchParams.get('page') || 1,
        perPage: searchParams.get('perPage') || 10,
        warehouseId: warehouse.id,
      })
    );
  }, [
    dispatch,
    warehouse,
    searchParams.get('status'),
    searchParams.get('type'),
    searchParams.get('sortBy'),
    searchParams.get('orderBy'),
    searchParams.get('page'),
    searchParams.get('perPage'),
  ]);

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
