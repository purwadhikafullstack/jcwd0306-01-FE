import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function TransitionPage() {
  const nav = useNavigate();
  const data = useLocation().state;

  useEffect(() => {
    const goNext = setTimeout(() => {
      if (data?.id) nav(`/payment/${data.id}`, { state: data });
      else nav(`/`);
    }, 2500);

    return () => clearTimeout(goNext);
  }, []);

  return (
    <div
      className="d-flex vw-100 align-items-center justify-content-center"
      style={{ height: '75vh' }}
    >
      <Typography variant="h1">Please wait ....</Typography>
      <Box sx={{ width: 600 }}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Box>
    </div>
  );
}
