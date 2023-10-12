import { HourglassTopOutlined, PhoneIphoneOutlined } from '@mui/icons-material';
import { Button, Tooltip, Typography } from '@mui/material';

function DownloadAppButton() {
  return (
    <Tooltip
      disableFocusListener
      onClick={undefined}
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
        <Typography color="primary">
          Comming Soon
          <HourglassTopOutlined />
        </Typography>
      }
    >
      <Button
        size="small"
        variant="text"
        onClick={undefined}
        startIcon={<PhoneIphoneOutlined />}
        sx={{
          textTransform: 'none',
          color: 'text.secondary',
          '&:hover, &:focus': {
            color: 'primary.main',
            bgcolor: 'rgba(0, 0, 0, 0)',
          },
        }}
      >
        Download GG App
      </Button>
    </Tooltip>
  );
}

export default DownloadAppButton;
