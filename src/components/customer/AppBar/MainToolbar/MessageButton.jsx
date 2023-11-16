import { EmailOutlined } from '@mui/icons-material';
import { IconButton, Link } from '@mui/material';

function MessageButton() {
  return (
    <div
      className="position-relative"
      // onMouseEnter={() => setShow(true)}
      // onMouseLeave={() => setShow(false)}
    >
      <span
        className="text-light text-center position-absolute bg-danger z-2 text-decoration-none rounded-pill"
        style={{
          top: '1px',
          right: '0px',
          minWidth: '11px',
          height: '15px',
          fontSize: '11px',
          padding: '0 3px',
        }}
      >
        0
      </span>

      <Link href="/chatroom">
        <IconButton color="text">
          <EmailOutlined />
        </IconButton>
      </Link>
    </div>
  );
}

export default MessageButton;
