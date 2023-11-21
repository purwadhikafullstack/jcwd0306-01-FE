import { Button, Card, CardContent } from '@mui/material';

export function ChatRoomCardButton({
  setSearchParams,
  room = {},
  searchParams,
  page,
}) {
  return (
    <Card
      className={
        Number(searchParams.get('orderId')) === room.orderId
          ? 'bg-info-subtle'
          : 'transparent'
      }
    >
      <Button
        className="d-flex w-100 flex-column-reverse"
        onClick={() => {
          page.current = 1;
          setSearchParams((params) => {
            if (window.location.pathname.split('/')[1] === 'admin')
              params.set('receiverId', room.senderId);
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
