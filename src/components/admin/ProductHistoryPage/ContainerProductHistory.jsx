import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { WarehouseRounded, Inventory2Rounded } from '@mui/icons-material';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useSelector } from 'react-redux';
import SearchInput from './SearchInput';
import ProductHistoryTable from './ProductHistoryTable';
import ProductHistoryFooter from './productHistoryFooter';
import { SelectByWarehouse } from '../ReportPage/SelectComponents/SelectByWarehouse';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';
import { SelectByProductName } from '../ReportPage/SelectComponents/SelectByProductName';
import { DatePicker } from '../ReportPage/DatePicker';

function ContainerProductHistory() {
  const authUser = useSelector((states) => states.authUser);
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const [searchParamss, setSearchParamss] = useSearchParams();

  const setDialogFilterOpen = () => {
    setOpen(true);
  };

  const handleProductOpen = () => {
    setProductOpen(true);
  };

  const handleDateOpen = () => {
    setIsDateOpen(true);
  };

  const handleRemoveFilter = () => {
    const currentParams = Object.fromEntries(searchParams.entries());

    delete currentParams.WH;
    delete currentParams.category;
    delete currentParams.productName;
    delete currentParams.startDate;
    delete currentParams.endDate;

    setSearchParamss(currentParams);
    setOpen(false);
  };

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
        Product Stock History
      </Typography>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
        {/* Search Input */}
        <SearchInput />

        {/* Date Button */}
        <Button
          size="small"
          variant="outlined"
          startIcon={<DateRangeIcon />}
          onClick={handleDateOpen}
        >
          Search by Date
        </Button>

        {/* FILTER */}
        <Tooltip
          disableFocusListener
          slotProps={{
            tooltip: {
              sx: {
                p: 2,
                bgcolor: 'background.paper',
                boxShadow: 2,
              },
            },
          }}
          title={
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={setDialogFilterOpen}
                startIcon={<WarehouseRounded />}
                sx={{
                  height: '48px',
                  justifyContent: 'flex-start',
                  display: authUser?.WarehouseUser?.warehouseId
                    ? 'none'
                    : 'block',
                }}
              >
                By Warehouse
              </Button>
              <Button
                onClick={handleProductOpen}
                startIcon={<Inventory2Rounded fontSize="small" />}
                sx={{ height: '48px', justifyContent: 'flex-start' }}
              >
                By Product
              </Button>
              <Button
                size="small"
                sx={{ color: '#f86373', justifyContent: 'flex-start' }}
                onClick={handleRemoveFilter}
                startIcon={<FilterAltOffIcon />}
              >
                Remove Filter
              </Button>
            </Box>
          }
        >
          <Button
            onClick={null}
            variant="contained"
            startIcon={<FilterAltIcon />}
            sx={{ textTransform: 'none' }}
          >
            FILTER
          </Button>
        </Tooltip>
      </Stack>
      {/* Category Table */}
      <ProductHistoryTable />

      {/* DialogFilter */}
      <SelectByWarehouse open={open} setOpen={setOpen} />
      <SelectByProductName open={productOpen} setOpen={setProductOpen} />

      {/* Footer */}
      <ProductHistoryFooter />

      {/* Date Picker */}
      <DatePicker open={isDateOpen} setIsDateOpen={setIsDateOpen} />
    </Stack>
  );
}

export default ContainerProductHistory;
