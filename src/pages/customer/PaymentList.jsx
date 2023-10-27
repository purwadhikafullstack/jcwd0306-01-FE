import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Stack,
} from '@mui/material';
import { useSelector } from 'react-redux';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { display } from '@mui/system';
import { OrderChatTemplate } from '../../components/OrderChatTemplate';

export function PaymentList() {
  const unpaidOrder = useSelector((state) => state.order);

  return (
    <OrderChatTemplate>
      <h5>Waiting for Payment</h5>
      <Stack direction="column" gap={1} sx={{ fontSize: '0.9em' }}>
        {unpaidOrder.length ? (
          unpaidOrder.map((order) => (
            <Card>
              <CardContent>
                <Stack gap={1}>
                  <Grid
                    container
                    wrap="nowrap"
                    className="border-bottom border-secondary-subtle"
                  >
                    <Grid item xs={6}>
                      <Stack direction="row" gap={1}>
                        <Avatar
                          className="d-none d-md-flex"
                          sx={{
                            width: '20px',
                            height: '20px',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <ShoppingBagIcon
                            sx={{ width: '16px', height: '16px' }}
                          />
                        </Avatar>
                        <Stack
                          direction="row"
                          flexWrap="wrap"
                          alignItems="center"
                          gap={1}
                        >
                          <b>Order</b>
                          <small>
                            {new Date(order.createdAt).toDateString()}
                          </small>
                        </Stack>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        alignItems="center"
                        gap={1}
                        justifyContent="end"
                        sx={{ textAlign: 'end' }}
                      >
                        <span>Pay before</span>
                        <small className="text-primary">
                          {new Date(
                            new Date(order.createdAt).setDate(
                              new Date(order.createdAt).getDate() + 1
                            )
                          ).toDateString()}
                        </small>
                      </Stack>
                    </Grid>
                  </Grid>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                    className="text-center"
                  >
                    <Stack>
                      <div>Transfer Bank</div>
                      <div>
                        <b>CIMB Niaga</b>
                      </div>
                    </Stack>
                    <Stack className="px-2">
                      <div>Account Number</div>
                      <div>
                        <b>64459875642</b>
                      </div>
                    </Stack>
                    <Stack className="d-md-flex d-none">
                      <div>Account Name</div>
                      <div>
                        <b>PT GadgetGallery</b>
                      </div>
                    </Stack>
                    <Stack className="d-sm-flex d-none">
                      <div>Total Payment</div>
                      <div>
                        <b>Rp{order.total.toLocaleString(`id-ID`)}</b>
                      </div>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div>
                      <Stack className="d-flex d-sm-none">
                        <div>Total Payment</div>
                        <div>
                          <b>Rp{order.total.toLocaleString(`id-ID`)}</b>
                        </div>
                      </Stack>
                    </div>
                    <div>
                      <Button className="d-sm-inline d-none">
                        Cancel Transaction
                      </Button>
                      <Button>
                        <Link
                          href={`/payment/${order.id}`}
                          className="text-decoration-none"
                        >
                          See Details
                        </Link>
                      </Button>
                    </div>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <div
            className="w-100 d-flex align-items-center justify-content-center"
            style={{ height: '50vh' }}
          >
            You have no payment to be settled
          </div>
        )}
      </Stack>
    </OrderChatTemplate>
  );
}
