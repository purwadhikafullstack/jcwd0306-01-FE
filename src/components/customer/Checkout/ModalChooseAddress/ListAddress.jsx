import ListItemButton from '@mui/material/ListItemButton';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import api from '../../../../constants/api';
import { handleDelete, handleSetDefault } from './handleFunction';
import { fullAddressFormatter } from './fullAddressFormatter';

export function ListAddress({
  selectedIndex,
  handleListItemClick,
  index,
  destination,
  setAddressToEdit,
  setOpen,
  addresses,
  setAddresses,
}) {
  const dispatch = useDispatch();
  const userSelector = { id: 5 };
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
                destination,
                setOpen
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
            onClick={() =>
              handleDelete(
                dispatch,
                setAddresses,
                index,
                addresses,
                destination
              )
            }
          >
            Delete
          </Button>
        </div>
      </div>
    </ListItemButton>
  );
}
