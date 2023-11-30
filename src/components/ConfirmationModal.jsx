import { useTheme } from '@mui/material';
import { Button, Modal } from 'react-bootstrap';

export function ConfirmationModal({
  action,
  show,
  setShow,
  actionName,
  actionDescription,
  onCloseString,
}) {
  const theme = useTheme();
  const handleClose = () => setShow(onCloseString || '');
  return (
    <Modal show={show} onHide={handleClose} style={{ marginTop: '20vh' }}>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Modal.Title>Action Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        Are you sure want to {actionName}?
      </Modal.Body>
      {actionDescription ? <Modal.Body>{actionDescription}</Modal.Body> : null}
      <Modal.Footer
        style={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Button variant="secondary" onClick={action}>
          Yes
        </Button>
        <Button variant="light" onClick={handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
