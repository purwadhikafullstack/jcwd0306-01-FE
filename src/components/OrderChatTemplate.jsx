import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Avatar, Button, Grid, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CardContent from '@mui/material/CardContent';

export function OrderChatTemplate({ children }) {
  const userSelector = useSelector((state) => state.authUser);
  const theme = useTheme();
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="lg"
        disableGutters={useMediaQuery(theme.breakpoints.down('md'))}
      >
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Grid container gap={2} wrap="nowrap">
            <Grid item md={3} display={{ md: 'flex', sm: 'none', xs: 'none' }}>
              <Card sx={{ flexGrow: 1, minHeight: '75vh' }}>
                <CardContent>
                  <Stack gap={2}>
                    <Card sx={{ flexGrow: 1 }}>
                      <CardContent>
                        <Stack
                          spacing={2}
                          direction="row"
                          alignItems="center"
                          gap={1}
                        >
                          <Avatar>
                            <AccountCircleIcon />
                          </Avatar>
                          {userSelector?.name || 'anonymous'}
                        </Stack>
                      </CardContent>
                    </Card>
                    <Stack gap={1}>
                      <Button>
                        <a
                          href="/chatroom"
                          className="text-decoration-none"
                          style={{ color: 'inherit' }}
                        >
                          Chat
                        </a>
                      </Button>
                      <Button>
                        <a
                          href="/payment/payment-list"
                          className="text-decoration-none"
                          style={{ color: 'inherit' }}
                        >
                          Waiting for Payment
                        </a>
                      </Button>
                      <Button>
                        <a
                          href="/order-list"
                          className="text-decoration-none"
                          style={{ color: 'inherit' }}
                        >
                          Transaction List
                        </a>
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={9} xs={12}>
              <Card sx={{ flexGrow: 1, minHeight: '75vh' }}>
                <CardContent>{children}</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
