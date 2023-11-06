import { ImageList } from '@mui/material';
import AddressItem from './AddressItem';

function AddressList({
  addresses,
  fetchAddress,
  setOpen,
  setAddressToEdit,
  setIsDefaultUpdated,
  isDefaultUpdated,
  setChoosenAddress,
  chosenAddress,
}) {
  return (
    <ImageList
      cols={1}
      gap={12}
      variant="standard"
      sx={{
        p: 2,
        borderRadius: 0.5,
        boxShadow: 4,
      }}
    >
      {addresses && addresses.length > 0 ? (
        addresses.map((address, idx) => (
          <AddressItem
            key={address?.id}
            address={address}
            idx={idx}
            fetchAddress={fetchAddress}
            setOpen={setOpen}
            setAddressToEdit={setAddressToEdit}
            setIsDefaultUpdated={setIsDefaultUpdated}
            isDefaultUpdated={isDefaultUpdated}
            setChoosenAddress={setChoosenAddress}
            chosenAddress={chosenAddress}
          />
        ))
      ) : (
        <div>No Address Data</div>
      )}
    </ImageList>
  );
}

export default AddressList;
