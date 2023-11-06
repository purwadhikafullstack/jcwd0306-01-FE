import { Button, Modal } from 'react-bootstrap';

export function ConfirmationModal({
  action,
  show,
  setShow,
  actionName,
  actionDescription,
  onCloseString,
}) {
  const handleClose = () => setShow(onCloseString || '');
  return (
    <Modal show={show} onHide={handleClose} style={{ marginTop: '20vh' }}>
      <Modal.Header closeButton>
        <Modal.Title>Action Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure want to {actionName}?</Modal.Body>
      {actionDescription ? <Modal.Body>{actionDescription}</Modal.Body> : null}
      <Modal.Footer>
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
