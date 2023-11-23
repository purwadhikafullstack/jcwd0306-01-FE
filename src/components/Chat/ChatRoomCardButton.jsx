import { Button, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';

export function ChatRoomCardButton({
  setSearchParams,
  room = {},
  searchParams,
  page,
  whId,
}) {
  const userSelector = useSelector((state) => state.authUser);
  return (
    <Card
      className={
        Number(searchParams.get('orderId')) === room.orderId
          ? 'bg-info-subtle'
          : 'transparent'
      }
    >
      <Button
        className="d-flex w-100 flex-column-reverse position-relative"
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
        {!room.isRead &&
        (room.receiverId === userSelector.id ||
          (window.location.pathname.split('/')[1] === 'admin' &&
            whId.findIndex((val) => val === room.warehouseId) !== -1)) ? (
          <span
            style={{ position: 'absolute', right: '1px', fontSize: '8px' }}
            className="bg-danger rounded-pill p-1"
          >
            new
          </span>
        ) : null}
      </Button>
    </Card>
  );
}
