import {
  ListItem as MuiListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';

function ListItem({ children, text, to }) {
  return (
    <MuiListItem disablePadding>
      <ListItemButton
        component={Link}
        to={to}
        sx={{
          borderRadius: 3,
          '&:hover': {
            bgcolor: 'primary.main',
            '&, & .MuiSvgIcon-root': {
              color: 'white',
            },
          },
        }}
      >
        <ListItemIcon>{children}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </MuiListItem>
  );
}

export default ListItem;
