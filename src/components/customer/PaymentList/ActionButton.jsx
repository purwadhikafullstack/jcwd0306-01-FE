import { Button, Link } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { ConfirmationModal } from '../../ConfirmationModal';
import { handleCancel } from '../OrderPayment/handleCancle';
import { setAlertActionCreator } from '../../../states/alert/action';
import api from '../../../constants/api';

export function ActionButton({
  order = {},
  setOrderDetail,
  setOpen,
  setOrders,
}) {
  const [hiddenCancle, setHiddenCancle] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [action, setAction] = useState({ fn: {}, name: '', desc: '' });
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.authUser);
  const unpaid = useSelector((state) => state.order);
  const nav = useNavigate();

  const receivePackage = async () => {
    try {
      await api.patch(`/order/${order.id}/status/receipt`);
      dispatch(setAlertActionCreator());
      window.location.reload();
    } catch (err) {
      dispatch(setAlertActionCreator({ err }));
    }
  };

  return (
    <>
      <ConfirmationModal
        show={showConfirmModal}
        setShow={setShowConfirmModal}
        action={action.fn}
        actionName={action.name}
        actionDescription={action.desc}
      />
      <div className="d-flex gap-2">
        <Button
          variant="outlined"
          onClick={() =>
            nav(
              `/chatroom?orderId=${order?.plain_id}&warehouseId=${order?.warehouseId}`
            )
          }
        >
          <div className="d-none d-md-block">Contact admin</div>
          <div className="d-md-none d-block">
            <EmailIcon />
          </div>
        </Button>
        <Button
          variant="contained"
          color="error"
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
              setOrders,
              unpaid
            );
          }}
          disabled={disableButton}
        >
          Cancel Transaction
        </Button>
        <Button
          variant="contained"
          sx={{ display: order?.status !== 'shipped' ? 'none' : 'block' }}
          onClick={async () => {
            await receivePackage();
          }}
        >
          Receive Package
        </Button>
        {order?.status === 'unpaid' ? (
          <Button variant="contained">
            <Link
              href={`/payment/${order.id}`}
              className="text-decoration-none"
              sx={{ color: 'white' }}
            >
              See Details
            </Link>
          </Button>
        ) : (
          <Button
            onClick={() => {
              setOrderDetail(order);
              setOpen(true);
            }}
          >
            See Details
          </Button>
        )}
      </div>
    </>
  );
}
