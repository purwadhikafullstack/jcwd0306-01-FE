import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import WarehouseAddressItem from './WarehouseAddressItem';

function WarehouseAddressContainer() {
  const warehouse = useSelector((states) => states.warehouse);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ tab: searchParams.get('tab') || '' });
  }, []);

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="WarehouseAddress-content"
        id="WarehouseAddress-header"
      >
        Alamat Gudang
      </AccordionSummary>
      <AccordionDetails>
        <Stack component={Paper} spacing={3} sx={{ p: 3, overflow: 'auto' }}>
          {/* Warehouse Address Detail */}
          <Grid
            container
            gap={1}
            sx={{ minWidth: (theme) => theme.breakpoints.values.sm }}
          >
            <WarehouseAddressItem label="Nama" value={warehouse.name} />
            <WarehouseAddressItem
              label="Negara"
              value={warehouse.WarehouseAddress.country}
            />
            <WarehouseAddressItem
              label="Provinsi"
              value={warehouse.WarehouseAddress.Province.name}
            />
            <WarehouseAddressItem
              label="Kabupaten / Kota"
              value={warehouse.WarehouseAddress.City.name}
            />
            <WarehouseAddressItem
              label="Kecamatan"
              value={warehouse.WarehouseAddress.district}
            />
            <WarehouseAddressItem
              label="Desa / Kelurahan"
              value={warehouse.WarehouseAddress.village}
            />
            <WarehouseAddressItem
              label="Alamat Detail"
              value={warehouse.WarehouseAddress.detail}
            />
          </Grid>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default WarehouseAddressContainer;
