import { Button, Card, CardContent } from '@mui/material';

export function ChatRoomCardButton({ setSearchParams, room = {} }) {
  return (
    <Card>
      <Button
        className="d-flex w-100"
        onClick={() => {
          setSearchParams((params) => {
            params.set(`orderId`, room.orderId);
            params.set('warehouseId', room.warehouseId);
            return params;
          });
        }}
      >
        <CardContent className="p-2">Order-{room.orderId}</CardContent>
      </Button>
    </Card>
  );
}
