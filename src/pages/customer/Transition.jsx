import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

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
      className="d-flex flex-column vw-100 align-items-center justify-content-center gap-3"
      style={{ height: '75vh' }}
    >
      <Typography variant="h5">
        Please wait while we processing your order
      </Typography>
      <Box sx={{ width: 600 }}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <div className="d-flex justify-content-center align-items-center">
          <EmojiEmotionsIcon />
          <Typography textAlign="center">Advertisement Here</Typography>
          <EmojiEmotionsIcon />
        </div>
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
