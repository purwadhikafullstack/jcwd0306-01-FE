import { ImageList } from '@mui/material';
import { useSelector } from 'react-redux';
import AddressItem from './AddressItem';

function AddressList({ setOpen, setAddressToEdit }) {
  const globalAddress = useSelector((state) => state.userAddress);

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
      {globalAddress && globalAddress.length > 0 ? (
        globalAddress.map((address, idx) => (
          <AddressItem
            key={address?.id}
            address={address}
            idx={idx}
            setOpen={setOpen}
            setAddressToEdit={setAddressToEdit}
          />
        ))
      ) : (
        <div>No Address Data</div>
      )}
    </ImageList>
  );
}

export default AddressList;
