import { Avatar } from '@mui/material';
import './Message.css';
import { useSelector } from 'react-redux';

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

export function MessageRight({ message, timestamp, displayName, senderId }) {
  const userSelector = useSelector((state) => state.authUser);
  const date = new Date(timestamp);
  return (
    <div className="messageRowRight">
      {senderId && userSelector?.id !== senderId ? (
        <div
          className="d-flex"
          style={{ fontSize: '0.7em', paddingTop: '10px' }}
        >
          admin-{displayName}
        </div>
      ) : null}
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
