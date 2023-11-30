import { Col, Row } from 'react-bootstrap';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { DeleteRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import './Cart.css';
import { deleteFromCart } from '../../../states/cart/action';
import { ConfirmationModal } from '../../ConfirmationModal';
import { ProductNote } from './ProductNote';

function BottomTools({
  quantity,
  editQuantity,
  handleChangeQuantity,
  stock,
  product,
  cart,
  note,
  setNote,
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState('');
  const userSelector = useSelector((state) => state.authUser);

  return (
    <Row className="m-0 gap-2">
      <Col xs={12} md="auto" className="pr-0 flex-grow-1">
        <ProductNote product={product} note={note} setNote={setNote} />
      </Col>
      <Col className="d-flex justify-content-between p-0">
        <div />
        <div className="d-flex gap-5 align-items-center">
          <IconButton
            name="delete-item"
            onClick={() => setShow('DELETE')}
            sx={{ '&:hover': { color: 'error.main' } }}
          >
            <DeleteRounded />
          </IconButton>
          <ConfirmationModal
            action={async () => {
              await dispatch(
                deleteFromCart(cart, product.productId, userSelector?.id)
              );
              setShow(false);
            }}
            setShow={setShow}
            show={show}
            actionName="delete this item"
          />
          <span className="d-flex border border-secondary px-2 rounded">
            <button
              type="button"
              name="subtractQuantity"
              disabled={quantity < 2}
              style={{
                color: '#009BD2',
                ...(quantity < 2 && {
                  cursor: 'not-allowed',
                  color: 'gainsboro',
                }),
              }}
              className="p-0 m-0 bg-transparent border border-0"
              onClick={() => {
                editQuantity(-1);
              }}
            >
              <RemoveCircleOutlineIcon />
            </button>
            <input
              type="number"
              min={1}
              max={stock}
              style={{
                maxWidth: '50px',
                border: 'none',
                textAlign: 'center',
              }}
              value={quantity}
              onChange={handleChangeQuantity}
            />
            <button
              type="button"
              name="addQuantity"
              className="p-0 m-0 bg-transparent border border-0"
              disabled={quantity >= stock}
              style={{
                color: '#009BD2',
                ...(quantity >= stock && {
                  cursor: 'not-allowed',
                  color: 'gainsboro',
                }),
              }}
              onClick={() => editQuantity(1)}
            >
              <AddCircleOutlineIcon />
            </button>
          </span>
        </div>
      </Col>
    </Row>
  );
}

export default BottomTools;
