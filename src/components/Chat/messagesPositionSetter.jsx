import { MessageLeft, MessageRight } from './Message';

export function messagesPositionSetter(msg, userSelector) {
  if (msg?.receiverId === userSelector?.id && msg?.senderId !== msg?.receiverId)
    return (
      <MessageLeft
        key={msg?.id}
        message={msg?.message}
        timestamp={msg?.createdAt}
        displayName="Admin"
        avatarDisp
      />
    );
  if (
    msg?.senderId === userSelector?.id &&
    !msg?.receiverId &&
    window.location.pathname.split(`/`)[1] === `admin`
  )
    return (
      <MessageLeft
        key={msg?.id}
        message={msg?.message}
        timestamp={msg?.createdAt}
        displayName={msg?.Sender?.firstName}
        avatarDisp
      />
    );
  if (msg?.senderId === userSelector?.id && !msg?.receiverId)
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
    msg?.senderId === userSelector?.id &&
    msg?.receiverId &&
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
    msg?.senderId === userSelector?.id &&
    msg?.receiverId === userSelector?.id &&
    window.location.pathname.split(`/`)[1] !== `admin`
  )
    return (
      <MessageLeft
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
