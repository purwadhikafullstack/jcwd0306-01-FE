import { useSelector } from 'react-redux';
import api from '../constants/api';

const authUser = useSelector((state) => state.authUser);

const handleAvatarChange = (event, setImage) => {
  const file = event.target.files[0];
  setImage(URL.createObjectURL(file));

  // Create a FormData object to send the file
  const formData = new FormData();
  formData.append('file', file);

  // Send the file to the backend
  api
    .patch(`/user/edit/${authUser?.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(async (response) => {
      console.log('File uploaded successfully:', response.data);
      //   setAvatar(response.data.data.image.data);
    })
    .catch((error) => {
      console.error('Error uploading file:', error);
    });
};

module.exports = handleAvatarChange;

/* COMING SOON */
