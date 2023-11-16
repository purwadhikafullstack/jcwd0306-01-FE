import { TabPanel as MuiTabPanel } from '@mui/lab';
import { node, string } from 'prop-types';

function TabPanel({ children, value }) {
  return (
    <MuiTabPanel
      value={value}
      //   sx={{ width: '100%', maxWidth: 'lg', mx: 'auto', px: 0 }}
    >
      {children}
    </MuiTabPanel>
  );
}

TabPanel.propTypes = {
  children: node.isRequired,
  value: string.isRequired,
};

export default TabPanel;
