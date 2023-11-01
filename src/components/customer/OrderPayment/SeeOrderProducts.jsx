import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { OrderProductCard } from './OrderProductsCard';
import { PaymentPriceCard } from './PaymentPriceCard';

export function SeeOrderProducts({ orderData }) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-100 position relative d-flex align-items-center justify-content-center flex-column">
      <Button className="mt-2" onClick={() => setShow(!show)}>
        See Items
      </Button>
      <Card className="w-100" style={{ display: show ? 'block' : 'none' }}>
        <CardContent>
          <Stack gap={1}>
            <Typography variant="h6">Item-list in this order</Typography>
            {orderData?.OrderProducts?.map((product) => (
              <OrderProductCard
                product={product}
                key={product?.name || product?.Product?.name}
              />
            ))}
            <PaymentPriceCard orderData={orderData} />
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
}
