import ListItemButton from '@mui/material/ListItemButton';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { handleDelete, handleSetDefault } from './handleFunction';
import { fullAddressFormatter } from './fullAddressFormatter';
import { ConfirmationModal } from '../../../ConfirmationModal';

export function ListAddress({
  selectedIndex,
  handleListItemClick,
  index,
  destination,
  setAddressToEdit,
  setOpen,
  open,
  addresses,
  setAddresses,
}) {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.authUser);
  const deleteAddress = () =>
    handleDelete(
      dispatch,
      setAddresses,
      index,
      addresses,
      destination,
      userSelector?.id,
      setOpen(`CHOOSE_ADDRESS`)
    );
  return (
    <ListItemButton
      selected={selectedIndex === index}
      style={{
        fontSize: '0.8em',
        borderRadius: '20px',
        cursor: 'default',
      }}
      disableTouchRipple
    >
      <div className="d-flex flex-column position-relative w-100">
        <Button
          className="position-absolute"
          style={{
            right: 0,
            display: selectedIndex === index ? `none` : 'inline',
          }}
          variant="contained"
          onClick={(event) => handleListItemClick(event, index, destination)}
        >
          Choose
        </Button>
        <div>{destination?.addressName}</div>
        <div className="mt-1">
          <b>{destination?.receiverName}</b>
        </div>
        <div>{destination?.receiverPhone}</div>
        <div>{fullAddressFormatter(destination)}</div>
        <div className="mt-1">
          <Button
            style={{ fontSize: '0.8em' }}
            onClick={() => {
              const tempAddress = { ...destination };
              tempAddress.index = index;
              setAddressToEdit(tempAddress);
              setOpen('EDIT ADDRESS');
            }}
          >
            Edit
          </Button>
          <Button
            style={{
              fontSize: '0.8em',
              display: destination?.isDefault ? 'none' : 'inline',
            }}
            onClick={() =>
              handleSetDefault(
                dispatch,
                setAddresses,
                userSelector.id,
                addresses,
                destination
              )
            }
          >
            Set as Main Address
          </Button>
          <Button
            style={{
              fontSize: '0.8em',
              display: destination?.isDefault ? 'none' : 'inline',
            }}
            onClick={() => setOpen(`deleteAddress${destination?.id}`)}
          >
            Delete
          </Button>
          <ConfirmationModal
            action={deleteAddress}
            actionName="delete this address"
            show={open === `deleteAddress${destination?.id}` ? open : ''}
            setShow={setOpen}
            onCloseString="CHOOSE_ADDRESS"
            actionDescription={`The address: ${fullAddressFormatter(
              destination
            )}`}
          />
        </div>
      </div>
    </ListItemButton>
  );
}
