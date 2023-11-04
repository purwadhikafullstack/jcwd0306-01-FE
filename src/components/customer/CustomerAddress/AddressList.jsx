import { ImageList } from '@mui/material';
import AddressItem from './AddressItem';

function AddressList({ addresses, fetchAddress, setOpen, setAddressToEdit }) {
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
      {addresses?.map((address, idx) => (
        <AddressItem
          key={address?.id}
          address={address}
          idx={idx}
          fetchAddress={fetchAddress}
          setOpen={setOpen}
          setAddressToEdit={setAddressToEdit}
        />
      ))}
    </ImageList>
  );
}

export default AddressList;
