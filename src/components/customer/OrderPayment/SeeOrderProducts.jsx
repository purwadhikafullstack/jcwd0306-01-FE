import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { OrderProductCard } from './OrderProductsCard';

export function SeeOrderProducts({ orderData }) {
  const [show, setShow] = useState(false);
  return (
    <div className="w-100 position relative d-flex align-items-center justify-content-center flex-column">
      <Button className="mt-2" onClick={() => setShow(!show)}>
        See Items
      </Button>
      <Card className="w-100" style={{ display: show ? 'block' : 'none' }}>
        <CardHeader>
          <Typography>Item-list in this order</Typography>
        </CardHeader>
        <CardContent>
          {orderData?.OrderProducts?.map((product) => (
            <OrderProductCard
              product={product}
              key={product?.name || product?.Product?.name}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
