import { Button, Link } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ConfirmationModal } from '../../ConfirmationModal';
import { handleCancel } from '../OrderPayment/handleCancle';

export function ActionButton({ order = {} }) {
  const [hiddenCancle, setHiddenCancle] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [action, setAction] = useState({ fn: {}, name: '', desc: '' });
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.authUser);
  const unpaid = useSelector((state) => state.order);
  

  return (
    <>
      <ConfirmationModal
        show={showConfirmModal}
        setShow={setShowConfirmModal}
        action={action.fn}
        actionName={action.name}
        actionDescription={action.desc}
      />
      <div>
        <Button
          className={
            hiddenCancle || order.status !== 'unpaid'
              ? 'd-none'
              : 'd-sm-inline d-none'
          }
          onClick={() => {
            handleCancel(
              setShowConfirmModal,
              setAction,
              null,
              dispatch,
              setDisableButton,
              userSelector,
              order,
              setHiddenCancle,
              unpaid
            );
          }}
          disabled={disableButton}
        >
          Cancel Transaction
        </Button>
        <Button>
          <Link href={`/payment/${order.id}`} className="text-decoration-none">
            See Details
          </Link>
        </Button>
      </div>
    </>
  );
}
