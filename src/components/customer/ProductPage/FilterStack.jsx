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
import { useSelector } from 'react-redux';
import useCustomSearchParams from '../../../hooks/useCustomSearchParams';

function FilterStack() {
  const categories = useSelector((states) => states.categories);
  const [searchParams, updateQueryParams] = useCustomSearchParams();

  return (
    <Stack spacing={0.5} p={1}>
      <Typography sx={{ p: 1, fontSize: '0.9rem', fontWeight: 600 }}>
        Filter
      </Typography>
      <Box>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography
              variant="subtitle2"
              id="filter-category-products-radio-label"
            >
              Kategori
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ overflow: 'auto' }}>
            <FormControl sx={{ '& *': { fontSize: '0.8rem !important' } }}>
              <RadioGroup
                aria-labelledby="filter-category-products-radio-label"
                name="filter-category-products-radio"
                value={+searchParams.get('categoryId') || 0}
                onChange={(e, newValue) => {
                  updateQueryParams({ categoryId: newValue });
                }}
              >
                <FormControlLabel
                  value={0}
                  control={<Radio size="small" />}
                  label="Semua"
                />
                {categories.map((category) => (
                  <FormControlLabel
                    key={category.id}
                    value={category.id}
                    control={<Radio size="small" />}
                    label={category.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Stack>
  );
}

export default FilterStack;
