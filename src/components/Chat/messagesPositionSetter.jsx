import { MessageLeft, MessageRight } from './Message';

export function messagesPositionSetter(msg, userSelector) {
  const { receiverId, senderId } = msg;
  const isAdminPage = window.location.pathname.split(`/`)[1] === `admin`;
  if (receiverId === userSelector?.id && senderId !== receiverId)
    return (
      <MessageRight
        key={msg?.id}
        message={msg?.message}
        timestamp={msg?.createdAt}
        displayName="Admin"
        avatarDisp
      />
    );
  if (senderId === userSelector?.id && receiverId && isAdminPage)
    return (
      <MessageRight
        key={msg?.id}
        message={msg?.message}
        timestamp={msg?.createdAt}
        displayName={msg?.Sender?.firstName}
        avatarDisp
      />
    );
  if (senderId && receiverId && isAdminPage)
    return (
      <MessageRight
        key={msg?.id}
        senderId={msg?.senderId}
        message={msg?.message}
        timestamp={msg?.createdAt}
        displayName={msg?.Sender?.firstName}
        avatarDisp
      />
    );
  if (senderId === userSelector?.id && receiverId)
    return (
      <MessageRight
        key={msg?.id}
        message={msg?.message}
        timestamp={msg?.createdAt}
        displayName="テスト"
        avatarDisp
      />
    );
  if (
    senderId === userSelector?.id &&
    receiverId &&
    window.location.pathname.split(`/`)[1] === `admin`
  )
    return (
      <MessageRight
        key={msg?.id}
        message={msg?.message}
        timestamp={msg?.createdAt}
        displayName="テスト"
        avatarDisp
      />
    );
  if (
    senderId === userSelector?.id &&
    receiverId === userSelector?.id &&
    window.location.pathname.split(`/`)[1] !== `admin`
  )
    return (
      <MessageRight
        key={msg?.id}
        message={msg?.message}
        timestamp={msg?.createdAt}
        displayName={msg?.Sender?.firstName}
        avatarDisp
      />
    );
  return (
    <MessageLeft
      key={msg?.id}
      message={msg?.message}
      timestamp={msg?.createdAt}
      displayName={msg?.Sender?.firstName}
      avatarDisp
    />
  );
}
