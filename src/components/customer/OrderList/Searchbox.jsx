import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useEffect, useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: 0,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),

    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
}));

export function SearchBox({ setSearchParams }) {
  const [searchWord, setSearchWord] = useState('');
  useEffect(() => {
    const setQuery = setTimeout(() => {
      setSearchParams((params) => {
        if (searchWord) params.set('name', searchWord);
        else params.delete(`name`);
        params.delete('page');
        return params;
      });
    }, 500);

    return () => clearTimeout(setQuery);
  }, [searchWord]);
  return (
    <Search className="border border-secondary" style={{ flexGrow: 3 }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        className="d-flex w-100"
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => setSearchWord(e.target.value)}
      />
    </Search>
  );
}
