import { Image } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Typography,
} from '@mui/material';

export function ProfileDashoard() {
  return (
    // <Container
    //   sx={{
    //     border: '2px solid red',
    //     height: '100vh',
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //   }}
    // >
    //   {/* box 1 */}
    //   <Box
    //     sx={{
    //       border: '2px solid green',
    //       height: 'auto',
    //       width: '30%',
    //       padding: '10px',
    //     }}
    //   >
    //     <Image
    //       sx={{ border: '1px solid black', height: '20%', width: '20%' }}
    //     />
    //   </Box>
    //   {/* box 2 */}
    //   <Box sx={{ border: '2px solid green', height: 'auto', width: '50%' }}>
    //     box 2
    //   </Box>
    // </Container>
    <Container>
      <Card sx={{ display: 'flex', p: '10px', alignItems: 'center' }}>
        {/* Left side: Avatar */}
        <Avatar
          alt="User Avatar"
          src={null}
          sx={{ width: 100, height: 100, margin: 'auto' }}
        />

        {/* Right side: User information */}
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h5" mt={2} mb={1}>
            Name: nazhif
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" mb={2}>
            Email: nazhifsetya@gmail.com
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={1}>
            Gender: male
          </Typography>
          <Typography variant="body2" color="textSecondary" mb={1}>
            Birth Date: 27 may 2000
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Phone Number: 081238261321
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
