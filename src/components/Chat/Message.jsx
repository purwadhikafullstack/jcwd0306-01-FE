import { Avatar } from '@mui/material';
import './Message.css';

export function MessageLeft({ message, timestamp, photoURL, displayName }) {
  const date = new Date(timestamp);
  return (
    <div style={{ display: 'flex' }}>
      <Avatar
        alt={displayName}
        className="orange"
        src={
          photoURL ||
          'https://t3.ftcdn.net/jpg/06/03/30/74/360_F_603307418_jya3zntHWjXWn3WHn7FOpjFevXwnVP52.jpg'
        }
      />
      <div>
        <div className="displayName">{displayName}</div>
        <div className="messageBlue">
          <div>
            <p className="messageContent">{message || 'no message'}</p>
          </div>
          <div className="messageTimeStampRight" style={{ fontSize: '0.7em' }}>
            {`${date.toLocaleDateString(`id-ID`).slice(0, 5)} ${date
              .toTimeString(`id-ID`)
              .slice(0, 5)}`}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MessageRight({ message, timestamp }) {
  const date = new Date(timestamp);
  return (
    <div className="messageRowRight">
      <div className="messageOrange">
        <p className="messageContent">{message || 'no message'}</p>
        <div className="messageTimeStampRight" style={{ fontSize: '0.7em' }}>
          {`${date.toLocaleDateString(`id-ID`).slice(0, 5)} ${date
            .toTimeString(`id-ID`)
            .slice(0, 5)}`}
        </div>
      </div>
    </div>
  );
}
