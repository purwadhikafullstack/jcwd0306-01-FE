import { Avatar, Button } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useDispatch } from 'react-redux';
import { constant } from '../../../../../constants/constant';

export function ChatRoomItemLine({ item = {} }) {
  const dispatch = useDispatch();
  return (
    <Row className="m-0">
      <Button
        className="text-decoration-none text-black d-flex justify-content-start"
        onClick={() => {
          dispatch({
            type: constant.setChatRoom,
            payload: new Map([
              ['receiverId', item?.senderId],
              ['orderId', item?.orderId],
              ['warehouseId', item?.warehouseId],
              ['name', `${item?.Sender?.firstName} ${item?.Sender?.lastName}`],
            ]),
          });
        }}
      >
        <Row className="m-0 px-1 py-2 border-top border-secondary-subtle w-100">
          <Col className="  p-0" md="auto" key={1}>
            <Avatar sx={{ fontSize: '24px', width: '24px', height: '24px' }}>
              <AccountCircleRoundedIcon />
            </Avatar>
          </Col>
          <Col
            className="px-1 py-0 d-flex align-items-center gap-2"
            key={2}
            md={10}
          >
            <div className="text-truncate">
              <b>{`${item?.Sender?.firstName} ${item?.Sender?.lastName}`}</b>
            </div>
            <div style={{ textOverflow: 'ellipsis' }}>{item?.message}</div>
          </Col>
          <Col md="auto">
            {!item?.isRead ? (
              <span
                className="text-light text-center bg-danger z-2 text-decoration-none rounded-pill"
                style={{
                  top: '1px',
                  right: '0px',
                  minWidth: '11px',
                  height: '15px',
                  fontSize: '11px',
                  padding: '0 3px',
                }}
              >
                !
              </span>
            ) : null}
          </Col>
        </Row>
      </Button>
    </Row>
  );
}
