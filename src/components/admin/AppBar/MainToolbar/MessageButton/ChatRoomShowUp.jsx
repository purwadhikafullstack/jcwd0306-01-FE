import { Card, Row } from 'react-bootstrap';
import { ChatRoomItemLine } from './ChatRoomItemLine';

export function ChatRoomShowUp({
  showRoom,
  setShowRoom,
  messages = [],
  setMessages,
}) {
  return (
    <Card
      className={
        showRoom ? 'd-none d-md-block position-absolute bg-white p-1' : 'd-none'
      }
      onMouseEnter={() => setShowRoom(true)}
      onMouseLeave={() => setShowRoom(false)}
      style={{
        width: '400px',
        left: '50%',
        transform: 'translate(-70%,0)',
        zIndex: 9,
        maxHeight: `400px`,
      }}
    >
      <Row className="m-0 p-2">
        <a href="/cart" className="text-decoration-none text-secondary w-100">
          {messages.length === 0 ? (
            <span className="text-center">
              Hooray! You have read all your messages
            </span>
          ) : (
            `Unread message (${messages.length})`
          )}
        </a>
      </Row>
      {messages.map((item, index) => (
        <ChatRoomItemLine
          key={item.id}
          item={item}
          setMessages={setMessages}
          index={index}
        />
      ))}
    </Card>
  );
}
