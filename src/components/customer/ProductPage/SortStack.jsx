import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

function SortStack() {
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <Stack spacing={0.5} p={1}>
      <Typography sx={{ p: 1, fontSize: '0.9rem', fontWeight: 600 }}>
        Urutkan
      </Typography>
      <Box>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle2" id="sort-products-radio-label">
              Urut berdasarkan
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ overflow: 'auto' }}>
            <FormControl sx={{ '& *': { fontSize: '0.8rem !important' } }}>
              <RadioGroup
                aria-labelledby="sort-products-radio-label"
                name="sort-products-radio"
                value={
                  searchParams.get('sortBy') && searchParams.get('orderBy')
                    ? `${searchParams.get('sortBy')}-${searchParams.get(
                        'orderBy'
                      )}`
                    : 'updatedAt-desc'
                }
                onChange={(e, newValue) => {
                  const [sortBy, orderBy] = newValue.split('-');
                  updateQueryParams({ sortBy, orderBy });
                }}
              >
                <FormControlLabel
                  value="sold-desc"
                  control={<Radio size="small" />}
                  label="Terlaris"
                />
                <FormControlLabel
                  value="updatedAt-desc"
                  control={<Radio size="small" />}
                  label="Terbaru"
                />
                <FormControlLabel
                  value="price-asc"
                  control={<Radio size="small" />}
                  label="Harga terendah"
                />
                <FormControlLabel
                  value="price-desc"
                  control={<Radio size="small" />}
                  label="Harga tertinggi"
                />
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Stack>
  );
}

export default SortStack;
