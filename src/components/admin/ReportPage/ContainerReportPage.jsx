import {
  Box,
  Button,
  Stack,
  TableCell,
  Tooltip,
  Typography,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DateRangeIcon from '@mui/icons-material/DateRange';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {
  WarehouseRounded,
  Inventory2Rounded,
  CategoryRounded,
} from '@mui/icons-material';
import SearchInput from './SearchInput';
import SalesReportTable from './SalesReportTable';
import ReportFooter from './ReportFooter';
import formatCurrency from '../../../utils/salesReport/formatCurrency';
import { SelectByWarehouse } from './SelectComponents/SelectByWarehouse';
import { SelectByCategory } from './SelectComponents/SelectByCategory';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';
import { SelectByProductName } from './SelectComponents/SelectByProductName';
import { DatePicker } from './DatePicker';

function ContainerReportPage() {
  const authUser = useSelector((states) => states.authUser);
  const salesReportPagination = useSelector(
    (states) => states.salesReportPagination
  );
  const isLastPage =
    salesReportPagination?.currentPage === salesReportPagination?.totalPage;
  const [open, setOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [searchParams, updateQueryParams] = useCustomSearchParams();
  const [searchParamss, setSearchParamss] = useSearchParams();

  const setDialogFilterOpen = () => {
    setOpen(true);
  };
  const setCategoryFilterOpen = () => {
    setCategoryOpen(true);
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
        Sales Report
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
                  display: !authUser.isAdmin ? 'none' : 'block',
                }}
              >
                By Warehouse
              </Button>
              <Button
                onClick={setCategoryFilterOpen}
                startIcon={<CategoryRounded />}
                sx={{ height: '48px', justifyContent: 'flex-start' }}
              >
                By Category
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
      {/* Sales Report Table */}
      <SalesReportTable />
      {/* Total */}
      <TableCell
        sx={{
          display: isLastPage ? 'flex' : 'none',
          justifyContent: 'flex-end',
        }}
        variant="head"
        size="medium"
      >
        Total Revenue: {formatCurrency(salesReportPagination?.grandTotal)}
      </TableCell>
      {/* Footer */}
      <ReportFooter />

      {/* DialogFilter */}
      <SelectByWarehouse open={open} setOpen={setOpen} />
      <SelectByCategory open={categoryOpen} setOpen={setCategoryOpen} />
      <SelectByProductName open={productOpen} setOpen={setProductOpen} />

      {/* Date Picker */}
      <DatePicker open={isDateOpen} setIsDateOpen={setIsDateOpen} />
    </Stack>
  );
}

export default ContainerReportPage;
