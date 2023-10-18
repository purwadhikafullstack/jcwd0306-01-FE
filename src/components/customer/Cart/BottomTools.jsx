import { Col, Row } from 'react-bootstrap';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { SvgTrash } from '../../SVG/SVG_trash';
import './Cart.css';
import { deleteFromCart } from '../../../states/cart/action';
import { ConfirmationModal } from '../../ConfirmationModal';

function BottomTools({
  quantity,
  editQuantity,
  handleChangeQuantity,
  stock,
  product,
  cart,
}) {
  const dispatch = useDispatch();
  const [show, setShow] = useState('');
  const userSelector = { id: 5 };

  return (
    <Row
      className="m-0"
      style={{
        display: window.location.pathname === '/cart' ? 'flex' : 'none',
      }}
    >
      <Col xs={12} md={5}>
        Write a note
      </Col>
      <Col className="d-flex justify-content-between">
        <div />
        <div className="d-flex gap-5 align-items-center">
          <button
            type="button"
            name="delete-item"
            className="bg-transparent border border-0"
            onClick={() => setShow('DELETE')}
          >
            <SvgTrash />
          </button>
          <ConfirmationModal
            action={async () => {
              await dispatch(
                deleteFromCart(cart, product.productId, userSelector.id)
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
