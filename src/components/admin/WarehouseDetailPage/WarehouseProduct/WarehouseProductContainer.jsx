import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from '@mui/material';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchInput from './SearchInput';
import ProductTable from './ProductTable';
import ProductTableFooter from './ProductTableFooter';
import { asyncGetProducts } from '../../../../states/products/action';

function WarehouseProductContainer() {
  const warehouse = useSelector((states) => states.warehouse);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({
      tab: searchParams.get('tab'),
      search: searchParams.get('search') || '',
      sortBy: 'updatedAt',
      orderBy: 'desc',
      page: 1,
      perPage: 10,
    });
    return setSearchParams;
  }, []);

  useEffect(() => {
    dispatch(
      asyncGetProducts({
        getType: 'REPLACE',
        search: searchParams.get('search'),
        sortBy: searchParams.get('sortBy') || 'updatedAt',
        orderBy: searchParams.get('orderBy') || 'desc',
        paranoid: false,
        page: searchParams.get('page') || 1,
        perPage: searchParams.get('perPage') || 10,
        warehouseId: warehouse.id,
      })
    );
  }, [
    dispatch,
    warehouse,
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
