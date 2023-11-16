import { ChatRoom } from '../../components/Chat/ChatRoom';
import { OrderChatTemplate } from '../../components/OrderChatTemplate';

export function Chat() {
  return (
    <OrderChatTemplate>
      <ChatRoom />
    </OrderChatTemplate>
  );
}
