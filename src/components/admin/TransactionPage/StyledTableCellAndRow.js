import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#009BD2',
    color: theme.palette.common.white,
    padding: '16px',
    [theme.breakpoints.down('md')]: {
      padding: '16px 6px',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '16px',
    [theme.breakpoints.down('md')]: {
      padding: '16px 6px',
    },
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: `#BEE0ED`,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  ':hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));
