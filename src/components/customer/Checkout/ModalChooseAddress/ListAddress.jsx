import ListItemButton from '@mui/material/ListItemButton';
import { Button } from '@mui/material';

export function ListAddress({
  selectedIndex,
  handleListItemClick,
  index,
  destination,
  setAddressToEdit,
  setOpen,
}) {
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
        <div>
          {[
            destination?.detail,
            destination?.village,
            destination?.district,
            `${destination?.City?.name} ${destination?.postalCode}`,
            destination?.Province?.name,
          ].join(`, `)}
        </div>
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
            onClick={() => console.log(`click`)}
          >
            Set as Main Address
          </Button>
        </div>
      </div>
    </ListItemButton>
  );
}
