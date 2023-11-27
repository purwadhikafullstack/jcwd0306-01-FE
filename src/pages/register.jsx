import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import google from '../assets/google.png';
import line from '../assets/line 2.png';
import api from '../constants/api';
import { setAlertActionCreator } from '../states/alert/action';
import GadgetGalleryLogo from '../components/GadgetGalleryLogo';
import loginWithGoogle from '../lib/loginWithGoogle';
// import { setAlertActionCreator } from '../states/alert/action';
// import GGLogo from '../assets/GadgetGallery Logo 2.png';

function Register() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('invalid email format').required('required'),
    }),
    onSubmit: async () => {
      try {
        await api.post('/user/register', formik.values);

        dispatch(
          setAlertActionCreator({
            val: { status: 'success', message: 'Please Check your Email' },
          })
        );
      } catch (err) {
        dispatch(
          setAlertActionCreator({
            val: { status: 'error', message: err?.response.data.message },
          })
        );
      }
    },
  });

  function inputHandler(e, fieldName) {
    const { value } = e.target;
    formik.setFieldValue(fieldName, value);
  }

  return (
    <>
      <GadgetGalleryLogo
        sx={{ m: '3rem', fontSize: '3rem', textAlign: 'center' }}
      />

      <Box display="flex" justifyContent="space-evenly">
        {/* <Box>
          <img
            src={GGLogo}
            alt=""
            style={{ maxWidth: '100%', height: 'auto', width: '200px' }}
          />
          <Typography variant="h5">Jual Beli Gadget Terpercaya</Typography>
          <Typography>
            Gabung dan rasakan kemudahan bertransaksi di GadgetGallery!
          </Typography>
        </Box> */}
        <Box
          maxWidth="100%"
          height="auto"
          width="350px"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          p={3}
        >
          <Typography
            variant="h5"
            display="flex"
            justifyContent="center"
            fontWeight="700"
          >
            Daftar
          </Typography>
          <Typography
            display="flex"
            justifyContent="center"
            fontWeight="400"
            fontSize={12}
            mt={2}
            sx={{ '& a': { color: 'primary.main', textDecoration: 'none' } }}
          >
            sudah punya akun?&nbsp;&nbsp;
            <Link to="/login">Masuk</Link>
          </Typography>
          <Box
            display="flex"
            mt={2}
            alignItems="center"
            p={1}
            border="1px solid grey"
            borderRadius={3}
            sx={{ cursor: 'pointer' }}
            onClick={() => loginWithGoogle(dispatch, nav)}
          >
            <img
              src={google}
              alt=""
              style={{ maxWidth: '100%', height: 'auto', width: '30px' }}
            />
            <Typography flex={1} textAlign="center">
              Google
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <img
              src={line}
              alt=""
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: '80px',
                marginRight: '8px',
              }}
            />
            <span style={{ fontSize: '13px' }}>atau daftar dengan</span>
            <img
              src={line}
              alt=""
              style={{
                maxWidth: '100%',
                height: 'auto',
                width: '80px',
                marginLeft: '5px',
              }}
            />
          </Box>
          <TextField
            onChange={(e) => inputHandler(e, 'email')}
            id="outlined-basic"
            label="email"
            variant="outlined"
            size="small"
            sx={{
              marginTop: '10px',
              height: '40px',
              maxWidth: '100%',
              width: '500px',
            }}
          />
          <TextField
            onChange={(e) => inputHandler(e, 'firstName')}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            size="small"
            defaultValue=""
            sx={{
              marginTop: '10px',
              height: '40px',
              maxWidth: '100%',
              width: '500px',
              display: 'none',
            }}
          />

          <TextField
            onChange={(e) => inputHandler(e, 'lastName')}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            size="small"
            defaultValue=""
            sx={{
              marginTop: '10px',
              height: '40px',
              maxWidth: '100%',
              display: 'none',
              width: '500px',
            }}
          />

          <TextField
            onChange={(e) => inputHandler(e, 'password')}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            defaultValue=""
            sx={{
              marginTop: '10px',
              height: '40px',
              maxWidth: '100%',
              display: 'none',
              width: '500px',
            }}
          />
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={formik.handleSubmit}
            sx={{ mt: '10px' }}
          >
            Daftar
          </Button>
        </Box>
      </Box>
    </>
  );
}

export { Register };
